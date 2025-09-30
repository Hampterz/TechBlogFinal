#!/bin/bash

# Azure Static Web Apps Deployment Script
# This script builds and prepares the application for Azure deployment

set -e  # Exit on any error

echo "🚀 Starting Azure Static Web Apps deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18.x or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18.x or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf build dist node_modules/.vite
print_success "Clean completed"

# Install dependencies
print_status "Installing dependencies..."
npm ci --silent
print_success "Dependencies installed"

# Run linting (optional)
if command -v eslint &> /dev/null; then
    print_status "Running ESLint..."
    npm run lint || print_warning "ESLint found issues, but continuing..."
else
    print_warning "ESLint not found, skipping linting"
fi

# Build the application
print_status "Building application for production..."
npm run build:prod
print_success "Build completed"

# Check if build was successful
if [ ! -d "build" ]; then
    print_error "Build failed - build directory not found"
    exit 1
fi

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_success "Build size: $BUILD_SIZE"

# List build contents
print_status "Build contents:"
ls -la build/

# Check for required files
REQUIRED_FILES=("index.html" "assets" "favicon.ico")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -e "build/$file" ]; then
        print_error "Required file not found: build/$file"
        exit 1
    fi
done

print_success "All required files present"

# Check for Azure Static Web Apps config
if [ -f "staticwebapp.config.json" ]; then
    print_success "Azure Static Web Apps configuration found"
else
    print_warning "staticwebapp.config.json not found - using default configuration"
fi

# Create deployment summary
cat > build/DEPLOYMENT_INFO.txt << EOF
Deployment Information
=====================
Build Date: $(date)
Node Version: $(node -v)
NPM Version: $(npm -v)
Build Size: $BUILD_SIZE
Environment: Production
Platform: Azure Static Web Apps

Next Steps:
1. Upload the contents of the 'build' folder to your Azure Static Web App
2. Or use Azure CLI: az staticwebapp deploy
3. Or connect your GitHub repository to Azure for automatic deployment

For more information, see the README.md file.
EOF

print_success "Deployment preparation completed!"
print_status "Build files are ready in the 'build' directory"
print_status "Deployment info saved to build/DEPLOYMENT_INFO.txt"

echo ""
echo "🎉 Ready for Azure Static Web Apps deployment!"
echo ""
echo "To deploy:"
echo "1. Go to Azure Portal → Static Web Apps"
echo "2. Select your app"
echo "3. Upload the contents of the 'build' folder"
echo "4. Or use: az staticwebapp deploy --source build --name your-app-name"
echo ""
