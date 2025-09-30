// Performance optimization utilities

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

/**
 * Throttle function to limit the rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load images with intersection observer
 * @param {string} selector - CSS selector for images
 * @param {Object} options - Intersection observer options
 */
export const lazyLoadImages = (selector = 'img[data-src]', options = {}) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
    return;
  }

  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  }, defaultOptions);

  const images = document.querySelectorAll(selector);
  images.forEach(img => imageObserver.observe(img));
};

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource URLs to preload
 */
export const preloadResources = (resources = []) => {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    link.as = resource.type || 'image';
    if (resource.crossOrigin) {
      link.crossOrigin = resource.crossOrigin;
    }
    document.head.appendChild(link);
  });
};

/**
 * Measure performance metrics
 * @param {string} name - Name of the measurement
 * @param {Function} fn - Function to measure
 * @returns {Promise} Promise that resolves with the result
 */
export const measurePerformance = async (name, fn) => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return await fn();
  }

  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  
  // Store performance data
  if (window.performanceData) {
    window.performanceData[name] = end - start;
  } else {
    window.performanceData = { [name]: end - start };
  }
  
  return result;
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Optimize animations based on user preferences and device capabilities
 * @param {Object} animationConfig - Animation configuration object
 * @returns {Object} Optimized animation configuration
 */
export const optimizeAnimations = (animationConfig) => {
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  const prefersReduced = prefersReducedMotion();
  
  if (prefersReduced || isLowEndDevice) {
    return {
      ...animationConfig,
      duration: 0,
      delay: 0,
      ease: 'none'
    };
  }
  
  return animationConfig;
};

/**
 * Create a performance-optimized resize observer
 * @param {Function} callback - Callback function for resize events
 * @param {number} debounceMs - Debounce delay in milliseconds
 * @returns {Function} Cleanup function
 */
export const createResizeObserver = (callback, debounceMs = 100) => {
  if (typeof window === 'undefined' || !('ResizeObserver' in window)) {
    // Fallback for browsers without ResizeObserver
    const debouncedCallback = debounce(callback, debounceMs);
    window.addEventListener('resize', debouncedCallback);
    return () => window.removeEventListener('resize', debouncedCallback);
  }

  const debouncedCallback = debounce(callback, debounceMs);
  const resizeObserver = new ResizeObserver(debouncedCallback);
  
  return (element) => {
    if (element) {
      resizeObserver.observe(element);
    }
    return () => resizeObserver.disconnect();
  };
};

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} True if element is in viewport
 */
export const isInViewport = (element, threshold = 0.1) => {
  if (typeof window === 'undefined' || !element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold &&
    rect.left <= windowWidth &&
    rect.right >= 0
  );
};

/**
 * Get device information for performance optimization
 * @returns {Object} Device information
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return { isMobile: false, isLowEnd: false, connection: 'unknown' };
  }

  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 4;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  return {
    isMobile,
    isLowEnd,
    connection: connection ? connection.effectiveType : 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency || 1,
    deviceMemory: navigator.deviceMemory || 4
  };
};
