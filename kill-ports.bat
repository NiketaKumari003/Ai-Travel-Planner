@echo off
echo Killing processes on ports 5173 and 3000...
echo.

for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173"') do (
    echo Killing process %%a on port 5173
    taskkill /f /pid %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000"') do (
    echo Killing process %%a on port 3000
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo Port cleanup complete!
echo.
pause
