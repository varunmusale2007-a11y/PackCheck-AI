@echo off
echo =========================================================================
echo   Packaged Commodity Compliance Checker (SIH 2026 - PS SIH26034)
echo =========================================================================
echo.
echo Launching Backend (FastAPI on Port 8000)...
start "Compliance Backend" cmd /k "cd backend && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo Launching Frontend (Next.js on Port 3000)...
start "Compliance Frontend" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo Services launched!
echo - Frontend: http://localhost:3000
echo - Backend Docs: http://localhost:8000/docs
echo =========================================================================
