@echo off

echo Iniciando sistema...

echo.
echo Iniciando BACKEND...
start cmd /k "cd backend && node server.js"

timeout /t 3 > nul

echo.
echo Iniciando FRONTEND...
start cmd /k "cd frontend && npm start"

echo.
echo Sistema iniciado!

pause
