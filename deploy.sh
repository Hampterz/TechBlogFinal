#!/bin/bash

# TechBlog Portfolio Deployment Script
echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building production bundle..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output: ./build/"
    echo ""
    echo "🌐 Ready for deployment!"
    echo ""
    echo "Deployment options:"
    echo "1. Vercel: vercel --prod"
    echo "2. Netlify: netlify deploy --prod --dir=build"
    echo "3. GitHub Pages: npm run deploy"
    echo "4. Manual: Upload ./build/ folder to your hosting provider"
    echo ""
    echo "🔒 Security: Admin features are disabled for public hosting"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
