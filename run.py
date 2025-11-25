#!/usr/bin/env python3
import subprocess
import sys
import time
import os
from pathlib import Path

def run_command(cmd, cwd, shell=True):
    """Run a command and return the process"""
    try:
        if shell:
            process = subprocess.Popen(cmd, shell=True, cwd=cwd)
        else:
            process = subprocess.Popen(cmd, cwd=cwd)
        return process
    except Exception as e:
        print(f"Error running command {cmd}: {e}")
        return None

def main():
    print("🚀 Starting AI Traveler Fullstack Application...")
    print("=" * 50)
    
    project_root = Path(__file__).parent
    backend_dir = project_root / "backend"
    frontend_dir = project_root / "frontend"
    
    # Check if directories exist
    if not backend_dir.exists():
        print(f"❌ Backend directory not found: {backend_dir}")
        return 1
    
    if not frontend_dir.exists():
        print(f"❌ Frontend directory not found: {frontend_dir}")
        return 1
    
    print("📦 Installing dependencies...")
    
    # Install backend dependencies
    print("  • Installing Python dependencies...")
    backend_deps = run_command(
        f'"{sys.executable}" -m pip install --user -r requirements.txt',
        backend_dir
    )
    if backend_deps:
        backend_deps.wait()
    
    # Install frontend dependencies
    print("  • Installing Node.js dependencies...")
    frontend_deps = run_command("npm install", frontend_dir)
    if frontend_deps:
        frontend_deps.wait()
    
    print("\n🔧 Starting services...")
    
    # Start backend
    print("  • Starting backend server...")
    backend_process = run_command(
        f'"{sys.executable}" main.py',
        backend_dir
    )
    
    if not backend_process:
        print("❌ Failed to start backend")
        return 1
    
    # Wait for backend to start
    print("  ⏳ Waiting for backend to initialize...")
    time.sleep(3)
    
    # Start frontend
    print("  • Starting frontend development server...")
    frontend_process = run_command("npm run dev", frontend_dir)
    
    if not frontend_process:
        print("❌ Failed to start frontend")
        if backend_process:
            backend_process.terminate()
        return 1
    
    print("\n" + "=" * 50)
    print("🎉 AI Traveler Application Started Successfully!")
    print("📍 Backend API:   http://localhost:8000")
    print("🌐 Frontend App:  http://localhost:5173")
    print("📚 API Docs:     http://localhost:8000/docs")
    print("=" * 50)
    print("\n💡 Press Ctrl+C to stop all services")
    
    try:
        # Keep running until interrupted
        while True:
            time.sleep(1)
            # Check if processes are still running
            if backend_process.poll() is not None:
                print("❌ Backend process stopped unexpectedly")
                break
            if frontend_process.poll() is not None:
                print("❌ Frontend process stopped unexpectedly")
                break
    except KeyboardInterrupt:
        print("\n🛑 Stopping services...")
        if backend_process:
            backend_process.terminate()
        if frontend_process:
            frontend_process.terminate()
        print("✅ All services stopped")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
