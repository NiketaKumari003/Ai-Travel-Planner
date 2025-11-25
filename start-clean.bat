@echo off
echo Starting AI Traveler Fullstack Application (Clean Start)...
echo.

echo [1/4] Cleaning up existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8000"') do (
    echo Killing process %%a on port 8000
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173"') do (
    echo Killing process %%a on port 5173
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000"') do (
    echo Killing process %%a on port 3000
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5174"') do (
    echo Killing process %%a on port 5174
    taskkill /f /pid %%a >nul 2>&1
)

echo [2/4] Installing dependencies...
cd backend
python.exe -m pip install --user -r requirements.txt >nul 2>&1
cd ../frontend
call npm install >nul 2>&1
cd ..

echo [3/4] Starting backend server...
start "Backend Server" cmd /k "cd backend && python.exe main.py"

echo [4/4] Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend development server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo AI Traveler Application Started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5174
echo API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo Press any key to exit this window...
pause >nul
