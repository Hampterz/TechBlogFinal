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

- Node.js (v18.x or higher)
- npm or yarn

## 🛠️ Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd techblog-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:4028`

## 📁 Project Structure

```
techblog_portfolio/
├── public/                    # Static assets
│   ├── assets/               # Images and media
│   └── favicon.ico           # Site favicon
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
├── build/                   # Production build output
├── package.json             # Project dependencies and scripts
├── vite.config.mjs          # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vercel.json              # Vercel deployment config
├── netlify.toml             # Netlify deployment config
├── deploy.sh                # Linux/Mac deployment script
├── deploy.bat               # Windows deployment script
└── DEPLOYMENT.md            # Detailed deployment guide
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

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

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 🚀 Deployment

### Quick Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy using scripts**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   ./deploy.sh
   ```

### Hosting Platforms

- **Vercel** (Recommended): Connect GitHub repo, auto-deploy
- **Netlify**: Drag & drop the `build` folder
- **GitHub Pages**: Use the included configuration
- **AWS S3**: Upload `build` folder contents

### Security Features

- ✅ Admin system completely disabled
- ✅ No admin access points in production
- ✅ Optimized for public hosting
- ✅ Performance optimized

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run serve        # Serve production build locally
npm run deploy       # Build and serve (for testing)
```

## 🔒 Security

This portfolio is configured for public hosting with:
- Admin features completely disabled
- No sensitive data exposed
- Production-optimized build
- Secure routing configuration

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React 18 and Vite
- Styled with Tailwind CSS
- Animated with Framer Motion

Built with ❤️ for the developer community
