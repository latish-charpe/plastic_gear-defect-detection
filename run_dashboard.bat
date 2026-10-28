@echo off
TITLE Launch AI Plastic Defect Detection Dashboard
echo ============================================================
echo  Starting AI Plastic Defect Detection Dashboard
echo ============================================================
echo.

:: Launch Backend
echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Plastic Defect - Backend (FastAPI)" cmd /k "cd /d "%~dp0MDM plastic_defect_dashboard\backend" && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

:: Launch Frontend
echo [2/2] Starting React Frontend on http://localhost:5173 ...
start "Plastic Defect - Frontend (Vite)" cmd /k "cd /d "%~dp0MDM plastic_defect_dashboard\frontend" && npm run dev"

echo.
echo ============================================================
echo  Both services launched in separate windows!
echo  - Frontend UI:  http://localhost:5173
echo  - Backend API:  http://127.0.0.1:8000
echo  - API Docs:     http://127.0.0.1:8000/docs
echo ============================================================
echo.
timeout /t 3 >nul
start http://localhost:5173
