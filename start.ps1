#!/usr/bin/env pwsh

Write-Host "Starting AI Traveler Fullstack Application..." -ForegroundColor Green
Write-Host ""

Write-Host "[1/3] Installing dependencies..." -ForegroundColor Yellow
Set-Location backend
python.exe -m pip install --user -r requirements.txt 2>$null
Set-Location ../frontend
npm install 2>$null
Set-Location ..

Write-Host "[2/3] Starting backend server..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/k", "cd backend && python.exe main.py" -WindowStyle Normal
Write-Host "Backend starting..." -ForegroundColor Cyan

Write-Host "[3/3] Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Starting frontend development server..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/k", "cd frontend && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "AI Traveler Application Started!" -ForegroundColor Green
Write-Host "Backend:   http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "API Docs:  http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Application is running in separate windows." -ForegroundColor Yellow
Write-Host "Close this window or press Ctrl+C to stop monitoring." -ForegroundColor Yellow

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 10
        Write-Host "Application still running... $(Get-Date)" -ForegroundColor Gray
    }
} catch {
    Write-Host "Stopping monitor..." -ForegroundColor Red
}
