@echo off
title Anmol Verma Portfolio - Development Server
echo ========================================================
echo   ANMOL VERMA - CINEMATIC HYPER-ANIMATED PORTFOLIO
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

cd /d "%~dp0"

echo [1/2] Checking dependencies...
if not exist "node_modules\" (
    echo Installing packages...
    call npm install
)

echo [2/2] Launching Vite development server...
echo.
echo Opening website at http://localhost:5173 ...
call npm run dev -- --open

pause