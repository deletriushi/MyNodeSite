@echo off
title Start My Node Website
echo ================================
echo   Starting Node.js Website...
echo ================================

:: Navigate to the Node folder
cd /d "C:\MyNodeSite\node"

:: Install dependencies (only needed once)
echo Installing dependencies (this may take a moment)...
call npm install

:: Start the Node server
echo.
echo Launching the website...
node server.js

:: Keep window open after server stops
pause
