# Deployment Guide

This guide provides detailed instructions for deploying the TechBlog Portfolio to various platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- Git
- GitHub account
- Target platform account (Azure, Vercel, Netlify, etc.)

### Build the Application
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

The built files will be in the `build/` directory.

## 🌐 Azure Static Web Apps (Recommended)

Azure Static Web Apps is the recommended deployment method for this React application.

### Method 1: Azure Portal (Easiest)

1. **Prepare Your Repository**
   - Ensure your code is pushed to GitHub
   - Make sure the repository is public or you have proper access

2. **Create Static Web App**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Click "Create a resource"
   - Search for "Static Web Apps" and select it
   - Click "Create"

3. **Configure the Static Web App**
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or select existing
   - **Name**: Choose a unique name (e.g., `yourname-techblog-portfolio`)
   - **Plan type**: Free (for personal projects)
   - **Region**: Choose closest to your users
   - **Source**: GitHub
   - **GitHub account**: Sign in and authorize
   - **Organization**: Select your GitHub username
   - **Repository**: Select your repository
   - **Branch**: `main` (or your default branch)

4. **Build Configuration**
   - **App location**: `/` (root directory)
   - **API location**: Leave empty (no API)
   - **Output location**: `build`

5. **Review and Create**
   - Review your settings
   - Click "Review + create"
   - Click "Create"

6. **Deploy**
   - Azure will automatically build and deploy your app
   - Wait for the deployment to complete (5-10 minutes)
   - You'll get a URL like `https://your-app-name.azurestaticapps.net`

### Method 2: Azure CLI

1. **Install Azure CLI**
   ```bash
   # Windows (using winget)
   winget install Microsoft.AzureCLI
   
   # macOS (using Homebrew)
   brew install azure-cli
   
   # Linux
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

2. **Login to Azure**
   ```bash
   az login
   ```

3. **Create Resource Group (if needed)**
   ```bash
   az group create --name myResourceGroup --location "Central US"
   ```

4. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name your-app-name \
     --resource-group myResourceGroup \
     --source https://github.com/yourusername/your-repo \
     --location "Central US" \
     --branch main \
     --app-location "/" \
     --output-location "build"
   ```

### Method 3: GitHub Actions (Automatic)

1. **Create the Workflow File**
   - Create `.github/workflows/azure-static-web-apps.yml` in your repository
   - Use the provided workflow file in this repository

2. **Get Deployment Token**
   - Go to your Static Web App in Azure Portal
   - Click "Manage deployment token"
   - Copy the token

3. **Add GitHub Secret**
   - Go to your GitHub repository
   - Click "Settings" → "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: Paste the deployment token
   - Click "Add secret"

4. **Deploy**
   - Push changes to your main branch
   - GitHub Actions will automatically build and deploy

## 🚀 Alternative Deployment Options

### Vercel

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com/)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - You'll get a URL like `https://your-project.vercel.app`

### Netlify

1. **Method 1: Drag & Drop**
   - Build your project: `npm run build`
   - Go to [Netlify](https://netlify.com/)
   - Drag and drop the `build` folder
   - Your site will be deployed instantly

2. **Method 2: Git Integration**
   - Go to [Netlify](https://netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
   - Click "Deploy site"

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Click "Save"

### AWS S3 + CloudFront

1. **Create S3 Bucket**
   - Go to AWS S3 Console
   - Create a new bucket
   - Enable static website hosting
   - Set index document to `index.html`

2. **Upload Files**
   - Upload all files from the `build` folder
   - Make sure to upload to the root of the bucket

3. **Configure CloudFront (Optional)**
   - Create a CloudFront distribution
   - Set origin to your S3 bucket
   - Configure custom domain if needed

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```env
# Development settings
VITE_APP_TITLE=TechBlog Portfolio
VITE_APP_DESCRIPTION=A modern technical portfolio
VITE_APP_URL=http://localhost:4028

# Production settings (set in your hosting platform)
VITE_APP_URL=https://your-domain.com
```

### Build Configuration

The project is configured with:
- **Output Directory**: `build` (instead of default `dist`)
- **Development Port**: `4028`
- **Preview Port**: `3000`
- **Source Maps**: Enabled in development
- **Minification**: Enabled in production

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### Port Already in Use
```bash
# Kill process on port 4028
npx kill-port 4028

# Or use different port
npm run dev -- --port 3000
```

#### Azure Deployment Issues
- Ensure GitHub repository is public or you have proper permissions
- Check that build output directory is set to `build`
- Verify deployment token is correctly set in GitHub secrets
- Check Azure Static Web Apps logs in the Azure Portal

#### Vercel Deployment Issues
- Ensure build command is `npm run build`
- Check that output directory is set to `build`
- Verify all dependencies are in `package.json`

#### Netlify Deployment Issues
- Check build command and publish directory
- Ensure all files are uploaded to the root of the site
- Check Netlify build logs for errors

### Performance Optimization

The project is already optimized with:
- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Images and fonts optimized
- **Lazy Loading**: Components load on demand

### Security Considerations

- Admin features are disabled in production
- No sensitive data in client-side code
- All API calls are made to public endpoints
- Environment variables are properly configured

## 📊 Monitoring

### Azure Static Web Apps
- Monitor in Azure Portal
- Check deployment logs
- Set up custom domain if needed

### Vercel
- Monitor in Vercel dashboard
- Check function logs
- Set up custom domain

### Netlify
- Monitor in Netlify dashboard
- Check build logs
- Set up custom domain

## 🔄 Continuous Deployment

All platforms support automatic deployment when you push to your main branch:

1. **Azure**: Uses GitHub Actions workflow
2. **Vercel**: Automatic deployment on push
3. **Netlify**: Automatic deployment on push
4. **GitHub Pages**: Manual deployment with `npm run deploy`

## 📈 Performance Monitoring

- Use browser dev tools to check performance
- Run Lighthouse audits
- Monitor Core Web Vitals
- Check for accessibility issues

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check GitHub Issues for similar problems
4. Create a new issue with detailed error information

## 📝 Notes

- Always test your build locally before deploying
- Keep your dependencies updated
- Monitor your deployment for any issues
- Consider setting up monitoring and alerts
