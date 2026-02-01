@echo off
title Palugada Launcher

echo ==========================================
echo   Palugada - Image to Text App Launcher
echo ==========================================
echo.

:: 1. Setup Backend
echo [1/4] Checking Backend...
cd server
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing/Updating backend dependencies...
pip install -r requirements.txt > nul
echo Backend ready.
cd ..

:: 2. Setup Frontend
echo.
echo [2/4] Checking Frontend...
cd client
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)
cd ..

:: 3. Start Servers
echo.
echo [3/4] Starting Services...
echo.
echo Starting Backend on port 5000...
start "Palugada Backend" cmd /k "cd server && venv\Scripts\activate && uvicorn main:app --reload --port 5000"

echo Starting Frontend on port 3000...
start "Palugada Frontend" cmd /k "cd client && npm run dev"

:: 4. Finish
echo.
echo [4/4] Done!
echo Application should be opening at http://localhost:3000
echo.
pause