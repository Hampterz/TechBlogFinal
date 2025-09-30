# TechBlog Portfolio

A modern, responsive technical portfolio showcasing projects, skills, and learning journey. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Design** - Clean, professional interface with smooth animations
- **Responsive Layout** - Optimized for all devices and screen sizes
- **Interactive Skills Matrix** - Visual representation of technical skills
- **Project Showcase** - Detailed project walkthroughs with code examples
- **Learning Timeline** - Documented learning journey and progress
- **Technical Knowledge Hub** - Comprehensive tutorial and resource library
- **Performance Optimized** - Fast loading with optimized assets
- **SEO Ready** - Meta tags and structured data for search engines
- **Security Focused** - Admin features disabled for public hosting

## 📋 Prerequisites

- **Node.js** (v18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **Azure Account** (for Azure deployment) - [Sign up here](https://azure.microsoft.com/free/)

## 🛠️ Local Development

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd techblog_portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
# or
npm start
```

### 4. Open in Browser
- Navigate to `http://localhost:4028`
- The development server supports hot reloading

### 5. Available Development Commands
```bash
npm run dev          # Start development server (port 4028)
npm run build        # Build for production
npm run preview      # Preview production build (port 3000)
npm run serve        # Serve production build locally
npm run deploy       # Build and serve (for testing)
```

## 📁 Project Structure

```
techblog_portfolio/
├── public/                    # Static assets
│   ├── assets/               # Images and media
│   ├── favicon.ico           # Site favicon
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # UI components (Button, Header, etc.)
│   │   └── admin/           # Admin components (disabled in production)
│   ├── pages/               # Page components
│   │   ├── homepage-technical-portfolio-showcase/
│   │   ├── project-deep-dive-raspberry-pi-nas-case-study/
│   │   ├── technical-knowledge-hub/
│   │   ├── interactive-skills-matrix/
│   │   └── tutorials/       # Tutorial pages
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles and Tailwind
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   ├── Routes.jsx           # Application routes
│   └── index.jsx            # Application entry point
├── build/                   # Production build output (generated)
├── package.json             # Project dependencies and scripts
├── vite.config.mjs          # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── jsconfig.json            # JavaScript configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `src/Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- **Forms plugin** - Enhanced form styling
- **Typography plugin** - Beautiful text styling
- **Aspect ratio plugin** - Responsive media elements
- **Container queries** - Component-specific responsive design
- **Fluid typography** - Responsive text scaling
- **Animation utilities** - Smooth transitions and animations
- **Custom color system** - Brand-consistent color palette

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints:
- **Mobile**: `sm:` (640px+)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)
- **Extra Large**: `2xl:` (1536px+)

## 🚀 Deployment

### Azure Static Web Apps (Recommended)

Azure Static Web Apps is the recommended deployment method for this React application.

#### Prerequisites
- Azure account with active subscription
- GitHub account
- Node.js installed locally

#### Method 1: Azure Portal (Easiest)

1. **Create Static Web App**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Search for "Static Web Apps" and create new
   - Choose "GitHub" as source
   - Connect your GitHub account
   - Select your repository and branch (usually `main`)

2. **Configure Build Settings**
   - **App location**: `/` (root directory)
   - **API location**: Leave empty (no API)
   - **Output location**: `build`

3. **Deploy**
   - Azure will automatically build and deploy your app
   - You'll get a URL like `https://your-app-name.azurestaticapps.net`

#### Method 2: Azure CLI

1. **Install Azure CLI**
   ```bash
   # Windows (using winget)
   winget install Microsoft.AzureCLI
   
   # Or download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
   ```

2. **Login to Azure**
   ```bash
   az login
   ```

3. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name your-app-name \
     --resource-group your-resource-group \
     --source https://github.com/yourusername/your-repo \
     --location "Central US" \
     --branch main \
     --app-location "/" \
     --output-location "build"
   ```

#### Method 3: GitHub Actions (Automatic)

1. **Create `.github/workflows/azure-static-web-apps.yml`**
   ```yaml
   name: Azure Static Web Apps CI/CD
   
   on:
     push:
       branches:
         - main
     pull_request:
       types: [opened, synchronize, reopened, closed]
       branches:
         - main
   
   jobs:
     build_and_deploy_job:
       if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
       runs-on: ubuntu-latest
       name: Build and Deploy Job
       steps:
         - uses: actions/checkout@v3
           with:
             submodules: true
         - name: Build And Deploy
           id: builddeploy
           uses: Azure/static-web-apps-deploy@v1
           with:
             azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
             repo_token: ${{ secrets.GITHUB_TOKEN }}
             action: "upload"
             app_location: "/"
             output_location: "build"
   
     close_pull_request_job:
       if: github.event_name == 'pull_request' && github.event.action == 'closed'
       runs-on: ubuntu-latest
       name: Close Pull Request Job
       steps:
         - name: Close Pull Request
           id: closepullrequest
           uses: Azure/static-web-apps-deploy@v1
           with:
             azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
             action: "close"
   ```

2. **Get Deployment Token**
   - Go to your Static Web App in Azure Portal
   - Click "Manage deployment token"
   - Copy the token

3. **Add GitHub Secret**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add new secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Paste the deployment token

### Alternative Deployment Options

#### Vercel (Quick & Easy)

1. **Connect GitHub Repository**
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

3. **Deploy**
   - Click "Deploy" and you're done!

#### Netlify

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [Netlify](https://netlify.com/)
   - Drag and drop the `build` folder
   - Or connect your GitHub repository for automatic deployments

#### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
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

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for local development:

```env
# Development settings
VITE_APP_TITLE=TechBlog Portfolio
VITE_APP_DESCRIPTION=A modern technical portfolio
VITE_APP_URL=http://localhost:4028
```

### Build Configuration

The project uses Vite with the following configuration:
- **Output Directory**: `build` (instead of default `dist`)
- **Development Port**: `4028`
- **Preview Port**: `3000`
- **Source Maps**: Enabled in development
- **Minification**: Enabled in production

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 4028
npx kill-port 4028

# Or use a different port
npm run dev -- --port 3000
```

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### Azure Deployment Issues
- Ensure your GitHub repository is public or you have proper permissions
- Check that the build output directory is set to `build`
- Verify the deployment token is correctly set in GitHub secrets

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build
```

### Performance Optimization

The project is already optimized with:
- **Code Splitting**: Automatic chunk splitting for vendor libraries
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Images and fonts are optimized
- **Lazy Loading**: Components load on demand

## 📊 Available Scripts

```bash
npm run dev          # Start development server (port 4028)
npm run build        # Build for production
npm run build:prod   # Build for production with production mode
npm run preview      # Preview production build (port 3000)
npm run serve        # Serve production build locally
npm run deploy       # Build and serve (for testing)
```

## 🔒 Security

This portfolio is configured for public hosting with:
- ✅ Admin features completely disabled in production
- ✅ No sensitive data exposed
- ✅ Production-optimized build
- ✅ Secure routing configuration
- ✅ No API keys or secrets in client-side code

## 📈 Performance

The application is optimized for performance:
- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React 18 and Vite
- Styled with Tailwind CSS
- Animated with Framer Motion
- Deployed on Azure Static Web Apps

Built with ❤️ for the developer community
