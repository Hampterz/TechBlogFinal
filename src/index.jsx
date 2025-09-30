import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

// Performance optimization: Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // Add performance monitoring
  window.addEventListener('load', () => {
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      const navigation = window.performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
      }
    }
  });

  // Add error handling for unhandled errors
  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    // In production, you might want to send this to an error reporting service
  });

  // Add error handling for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, you might want to send this to an error reporting service
  });
}

// Get the root element
const container = document.getElementById("root");

if (!container) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in your HTML.');
}

// Create root and render app
const root = createRoot(container);

// Render with error boundary
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
