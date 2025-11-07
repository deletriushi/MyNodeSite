const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// File upload setup
const uploadFolder = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Admin credentials
const ADMIN = { username: "owner", password: "0215" };

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN.username && password === ADMIN.password) {
    return res.redirect("/admin.html");
  }
  return res.status(401).send("Invalid username or password.");
});

// Upload route (public, no password)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.send("✅ File uploaded successfully!");
});

// Get list of uploaded files
app.get("/files", (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) return res.status(500).send("Error reading files.");
    res.json(files);
  });
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
