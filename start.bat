@echo off
echo Starting AI Traveler Fullstack Application...
echo.

echo [1/3] Installing dependencies...
cd backend
python.exe -m pip install --user -r requirements.txt >nul 2>&1
cd ../frontend
call npm install >nul 2>&1
cd ..

echo [2/3] Starting backend server...
start "Backend Server" cmd /k "cd backend && python.exe main.py"

echo [3/3] Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend development server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo AI Traveler Application Starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo Press any key to exit this window...
pause >nul
