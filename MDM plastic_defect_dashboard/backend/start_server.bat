@echo off
TITLE AI Plastic Defect Detection — FastAPI Backend

echo ============================================================
echo  AI Plastic Defect Detection Backend
echo  FastAPI + YOLO11m + Grad-CAM + Expert System
echo ============================================================
echo.

:: Check Python is available
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not found on PATH.
    echo         Please install Python 3.9+ and try again.
    pause
    exit /b 1
)

:: Change to backend directory
cd /d "%~dp0"

:: Install requirements if not already installed
echo [Setup] Checking / installing dependencies...
pip install -r requirements.txt --quiet
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] pip install failed. Check your Python/pip installation.
    pause
    exit /b 1
)

echo.
echo [Server] Starting FastAPI on http://127.0.0.1:8000 ...
echo          Press Ctrl+C to stop.
echo.

python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

pause
