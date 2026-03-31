@echo off

echo ============================
echo ==SINCRONIZANDO COM GITHUB==
echo ============================

:: Inicializa git se não existir
git init

:: Garante que está na branch main
git branch -M main

:: Adiciona remote (ou atualiza se já existir)
git remote remove origin 2>nul
git remote add origin https://github.com/esc5050/PJBL-Inventario-App.git

:: Adiciona tudo
git add .

:: Commit (mesmo se já existir)
git commit -m "Commit feito por sync_github.bat" 2>nul

:: Força envio (sobrescreve tudo no GitHub)
git push -u origin main --force

echo ============================
echo =========FINALIZADO=========
echo ============================

pause
