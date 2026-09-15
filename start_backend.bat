@echo off
echo Starting FastAPI Backend for Packaged Commodity Compliance Checker...
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause
