# Deployment Guide

## 🚀 Quick Deploy

This portfolio is ready for public hosting with admin features disabled for security.

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Deploy (build + serve)
npm run deploy
```

## 🌐 Hosting Platforms

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

2. **Deploy Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

4. **Deploy**
   - Click "Deploy" and you're live!

### Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Netlify will use the `netlify.toml` configuration

2. **Deploy Settings**
   - Build Command: `npm run build`
   - Publish Directory: `build`

3. **Deploy**
   - Click "Deploy site" and you're live!

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   - Upload the `build` folder contents to your S3 bucket
   - Enable static website hosting

3. **Configure CloudFront**
   - Create a CloudFront distribution
   - Set S3 bucket as origin
   - Configure custom error pages for SPA routing

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   server {
     listen 80;
     server_name localhost;
     root /usr/share/nginx/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

3. **Build and run**
   ```bash
   docker build -t techblog-portfolio .
   docker run -p 80:80 techblog-portfolio
   ```

## 🔒 Security Features

### Admin System Disabled
- All admin routes are commented out
- No admin access points in the public build
- Admin components are not imported in production

### Production Optimizations
- Source maps disabled in production
- Code minification enabled
- Chunk splitting for better caching
- Static asset optimization

## 📊 Performance Optimizations

### Build Optimizations
- **Code Splitting**: Automatic chunk splitting for vendor libraries
- **Tree Shaking**: Unused code elimination
- **Minification**: ESBuild minification for production
- **Asset Optimization**: Optimized static assets

### Caching Strategy
- **Static Assets**: 1 year cache for JS/CSS files
- **Images**: Long-term caching with versioning
- **HTML**: Short cache with revalidation

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer build
```

## 🌍 Environment Configuration

### Development
```bash
NODE_ENV=development
VITE_APP_TITLE=TechBlog Portfolio (Dev)
```

### Production
```bash
NODE_ENV=production
VITE_APP_TITLE=TechBlog Portfolio
```

## 📱 PWA Features (Optional)

To add PWA capabilities:

1. **Install PWA plugin**
   ```bash
   npm install vite-plugin-pwa
   ```

2. **Update vite.config.mjs**
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa'
   
   export default defineConfig({
     plugins: [
       // ... other plugins
       VitePWA({
         registerType: 'autoUpdate',
         workbox: {
           globPatterns: ['**/*.{js,css,html,ico,png,svg}']
         }
       })
     ]
   })
   ```

## 🔧 Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+ recommended)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Routing Issues**
- Ensure all routes redirect to index.html
- Check server configuration for SPA support

**Performance Issues**
- Analyze bundle size
- Check for large dependencies
- Optimize images

**Admin Access Attempts**
- Admin routes are completely disabled
- No admin functionality in production build
- All admin references removed

### Debug Commands

```bash
# Check build output
npm run build && ls -la build/

# Preview production build
npm run preview

# Check for errors
npm run build 2>&1 | grep -i error

# Analyze dependencies
npm ls --depth=0
```

## 📈 Monitoring

### Analytics Setup
1. **Google Analytics**
   - Add GA4 tracking code
   - Configure conversion tracking

2. **Performance Monitoring**
   - Use Vercel Analytics (if on Vercel)
   - Set up Core Web Vitals monitoring

3. **Error Tracking**
   - Sentry integration
   - Error boundary implementation

## 🚀 Go Live Checklist

- [ ] Admin routes disabled
- [ ] Production build successful
- [ ] All pages accessible
- [ ] Images loading correctly
- [ ] Responsive design working
- [ ] Performance optimized
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] SEO meta tags added
- [ ] Social media previews working

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review build logs
3. Test locally with `npm run preview`
4. Check hosting platform documentation

---

**Ready to deploy!** 🎉

Your portfolio is now secure and optimized for public hosting.
