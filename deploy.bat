@echo off
REM TechBlog Portfolio Deployment Script for Windows

echo 🚀 Starting deployment process...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Run build
echo 🔨 Building production bundle...
call npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📁 Build output: .\build\
    echo.
    echo 🌐 Ready for deployment!
    echo.
    echo Deployment options:
    echo 1. Vercel: vercel --prod
    echo 2. Netlify: netlify deploy --prod --dir=build
    echo 3. GitHub Pages: npm run deploy
    echo 4. Manual: Upload .\build\ folder to your hosting provider
    echo.
    echo 🔒 Security: Admin features are disabled for public hosting
) else (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

pause
