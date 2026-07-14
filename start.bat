@echo off
echo Starting Shaqyrtu development servers...
echo.

REM Start FastAPI backend
echo [1/2] Starting FastAPI backend on port 8000...
cd apps\api
start cmd /k "pip install -r requirements.txt && python -m uvicorn app.main:app --reload --port 8000"
cd ..\..

REM Start Next.js frontend
echo [2/2] Starting Next.js frontend on port 3000...
cd apps\web
start cmd /k "npm install && npm run dev"
cd ..\..

echo.
echo Development servers starting:
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:3000
echo   API Docs: http://localhost:8000/api/docs
echo.
pause
