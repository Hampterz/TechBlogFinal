import { useState, useEffect } from 'react';

/**
 * Custom hook for environment configuration and detection
 * @returns {Object} Environment configuration and utilities
 */
export const useEnvironment = () => {
  const [env, setEnv] = useState({
    isDevelopment: false,
    isProduction: false,
    isLocalhost: false,
    isAzure: false,
    isVercel: false,
    isNetlify: false,
    baseUrl: '',
    apiUrl: '',
    version: '1.0.0',
    buildTime: new Date().toISOString()
  });

  useEffect(() => {
    const detectEnvironment = () => {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      const port = window.location.port;
      
      const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
      const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
      const isAzure = hostname.includes('azurestaticapps.net') || hostname.includes('azurewebsites.net');
      const isVercel = hostname.includes('vercel.app') || hostname.includes('vercel.com');
      const isNetlify = hostname.includes('netlify.app') || hostname.includes('netlify.com');
      
      const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
      
      // Get environment variables with fallbacks
      const appTitle = import.meta.env.VITE_APP_TITLE || 'TechBlog Portfolio';
      const appDescription = import.meta.env.VITE_APP_DESCRIPTION || 'A modern technical portfolio';
      const appUrl = import.meta.env.VITE_APP_URL || baseUrl;
      const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';
      const devMode = import.meta.env.VITE_DEV_MODE === 'true' || isDevelopment;
      const debugMode = import.meta.env.VITE_DEBUG === 'true' || isDevelopment;
      
      setEnv({
        isDevelopment,
        isProduction,
        isLocalhost,
        isAzure,
        isVercel,
        isNetlify,
        baseUrl,
        apiUrl: import.meta.env.VITE_API_BASE_URL || '',
        appTitle,
        appDescription,
        appUrl,
        version: appVersion,
        buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
        devMode,
        debugMode,
        // Analytics
        gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
        hotjarId: import.meta.env.VITE_HOTJAR_ID || '',
        // API Keys
        apiKey: import.meta.env.VITE_API_KEY || ''
      });
    };

    detectEnvironment();
  }, []);

  /**
   * Check if current environment matches any of the provided environments
   * @param {string|Array} environments - Environment(s) to check
   * @returns {boolean} True if current environment matches
   */
  const isEnvironment = (environments) => {
    const envArray = Array.isArray(environments) ? environments : [environments];
    return envArray.some(envName => {
      switch (envName.toLowerCase()) {
        case 'development':
        case 'dev':
          return env.isDevelopment;
        case 'production':
        case 'prod':
          return env.isProduction;
        case 'localhost':
        case 'local':
          return env.isLocalhost;
        case 'azure':
          return env.isAzure;
        case 'vercel':
          return env.isVercel;
        case 'netlify':
          return env.isNetlify;
        default:
          return false;
      }
    });
  };

  /**
   * Get environment-specific configuration
   * @param {Object} configs - Configuration object with environment keys
   * @returns {*} Environment-specific configuration
   */
  const getConfig = (configs) => {
    if (env.isDevelopment) return configs.development || configs.default;
    if (env.isProduction) return configs.production || configs.default;
    return configs.default;
  };

  /**
   * Log message only in development or debug mode
   * @param {string} message - Message to log
   * @param {*} data - Additional data to log
   */
  const debugLog = (message, data = null) => {
    if (env.debugMode) {
      console.log(`[DEBUG] ${message}`, data);
    }
  };

  /**
   * Log error with environment context
   * @param {string} message - Error message
   * @param {Error} error - Error object
   * @param {Object} context - Additional context
   */
  const logError = (message, error = null, context = {}) => {
    const errorContext = {
      environment: env.isDevelopment ? 'development' : 'production',
      hostname: window.location.hostname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ...context
    };

    console.error(`[ERROR] ${message}`, {
      error,
      context: errorContext
    });

    // In production, you might want to send this to an error reporting service
    if (env.isProduction && window.gtag) {
      window.gtag('event', 'exception', {
        description: message,
        fatal: false,
        custom_map: errorContext
      });
    }
  };

  return {
    ...env,
    isEnvironment,
    getConfig,
    debugLog,
    logError
  };
};

export default useEnvironment;
