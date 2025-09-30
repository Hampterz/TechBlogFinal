@echo off
REM Azure Static Web Apps Deployment Script for Windows
REM This script builds and prepares the application for Azure deployment

setlocal enabledelayedexpansion

echo 🚀 Starting Azure Static Web Apps deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18.x or higher.
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1 delims=." %%i in ('node --version') do set NODE_VERSION=%%i
set NODE_VERSION=%NODE_VERSION:v=%
if %NODE_VERSION% lss 18 (
    echo [ERROR] Node.js version 18.x or higher is required. Current version: 
    node --version
    exit /b 1
)

echo [SUCCESS] Node.js version check passed: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm.
    exit /b 1
)

echo [SUCCESS] npm version: 
npm --version

REM Clean previous builds
echo [INFO] Cleaning previous builds...
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo [SUCCESS] Clean completed

REM Install dependencies
echo [INFO] Installing dependencies...
call npm ci --silent
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo [SUCCESS] Dependencies installed

REM Run linting (optional)
where eslint >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Running ESLint...
    call npm run lint
    if %errorlevel% neq 0 (
        echo [WARNING] ESLint found issues, but continuing...
    )
) else (
    echo [WARNING] ESLint not found, skipping linting
)

REM Build the application
echo [INFO] Building application for production...
call npm run build:prod
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    exit /b 1
)
echo [SUCCESS] Build completed

REM Check if build was successful
if not exist build (
    echo [ERROR] Build failed - build directory not found
    exit /b 1
)

REM Check build size
for /f %%i in ('dir build /-c ^| find "File(s)"') do set BUILD_SIZE=%%i
echo [SUCCESS] Build size: %BUILD_SIZE% bytes

REM List build contents
echo [INFO] Build contents:
dir build

REM Check for required files
set REQUIRED_FILES=index.html assets favicon.ico
for %%f in (%REQUIRED_FILES%) do (
    if not exist "build\%%f" (
        echo [ERROR] Required file not found: build\%%f
        exit /b 1
    )
)

echo [SUCCESS] All required files present

REM Check for Azure Static Web Apps config
if exist staticwebapp.config.json (
    echo [SUCCESS] Azure Static Web Apps configuration found
) else (
    echo [WARNING] staticwebapp.config.json not found - using default configuration
)

REM Create deployment summary
echo Deployment Information > build\DEPLOYMENT_INFO.txt
echo ===================== >> build\DEPLOYMENT_INFO.txt
echo Build Date: %date% %time% >> build\DEPLOYMENT_INFO.txt
echo Node Version: >> build\DEPLOYMENT_INFO.txt
node --version >> build\DEPLOYMENT_INFO.txt
echo NPM Version: >> build\DEPLOYMENT_INFO.txt
npm --version >> build\DEPLOYMENT_INFO.txt
echo Build Size: %BUILD_SIZE% bytes >> build\DEPLOYMENT_INFO.txt
echo Environment: Production >> build\DEPLOYMENT_INFO.txt
echo Platform: Azure Static Web Apps >> build\DEPLOYMENT_INFO.txt
echo. >> build\DEPLOYMENT_INFO.txt
echo Next Steps: >> build\DEPLOYMENT_INFO.txt
echo 1. Upload the contents of the 'build' folder to your Azure Static Web App >> build\DEPLOYMENT_INFO.txt
echo 2. Or use Azure CLI: az staticwebapp deploy >> build\DEPLOYMENT_INFO.txt
echo 3. Or connect your GitHub repository to Azure for automatic deployment >> build\DEPLOYMENT_INFO.txt
echo. >> build\DEPLOYMENT_INFO.txt
echo For more information, see the README.md file. >> build\DEPLOYMENT_INFO.txt

echo [SUCCESS] Deployment preparation completed!
echo [INFO] Build files are ready in the 'build' directory
echo [INFO] Deployment info saved to build\DEPLOYMENT_INFO.txt

echo.
echo 🎉 Ready for Azure Static Web Apps deployment!
echo.
echo To deploy:
echo 1. Go to Azure Portal → Static Web Apps
echo 2. Select your app
echo 3. Upload the contents of the 'build' folder
echo 4. Or use: az staticwebapp deploy --source build --name your-app-name
echo.

pause
