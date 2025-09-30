import React, { useState, useEffect } from 'react';
import { useEnvironment } from '../hooks/useEnvironment';

const HealthCheck = ({ showDetails = false }) => {
  const [healthStatus, setHealthStatus] = useState({
    isHealthy: true,
    checks: {},
    timestamp: new Date().toISOString()
  });
  
  const env = useEnvironment();

  useEffect(() => {
    const performHealthChecks = async () => {
      const checks = {};
      let isHealthy = true;

      // Check 1: Browser compatibility
      checks.browserCompatibility = {
        name: 'Browser Compatibility',
        status: 'pass',
        details: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine
        }
      };

      // Check 2: Local storage availability
      try {
        const testKey = '__health_check_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        checks.localStorage = {
          name: 'Local Storage',
          status: 'pass',
          details: { available: true }
        };
      } catch (error) {
        checks.localStorage = {
          name: 'Local Storage',
          status: 'fail',
          details: { available: false, error: error.message }
        };
        isHealthy = false;
      }

      // Check 3: Performance API availability
      checks.performanceAPI = {
        name: 'Performance API',
        status: 'performance' in window ? 'pass' : 'warn',
        details: {
          available: 'performance' in window,
          timing: 'performance' in window ? !!window.performance.timing : false,
          navigation: 'performance' in window ? !!window.performance.getEntriesByType : false
        }
      };

      // Check 4: Intersection Observer support
      checks.intersectionObserver = {
        name: 'Intersection Observer',
        status: 'IntersectionObserver' in window ? 'pass' : 'warn',
        details: { available: 'IntersectionObserver' in window }
      };

      // Check 5: WebGL support
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        checks.webgl = {
          name: 'WebGL Support',
          status: gl ? 'pass' : 'warn',
          details: { available: !!gl }
        };
      } catch (error) {
        checks.webgl = {
          name: 'WebGL Support',
          status: 'warn',
          details: { available: false, error: error.message }
        };
      }

      // Check 6: Network connectivity
      checks.network = {
        name: 'Network Connectivity',
        status: navigator.onLine ? 'pass' : 'fail',
        details: {
          online: navigator.onLine,
          connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown'
        }
      };

      if (!navigator.onLine) {
        isHealthy = false;
      }

      // Check 7: Memory usage (if available)
      if ('memory' in performance) {
        const memory = performance.memory;
        const memoryUsagePercent = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
        checks.memory = {
          name: 'Memory Usage',
          status: memoryUsagePercent < 80 ? 'pass' : 'warn',
          details: {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB',
            usagePercent: Math.round(memoryUsagePercent) + '%'
          }
        };
      }

      // Check 8: Environment configuration
      checks.environment = {
        name: 'Environment',
        status: 'pass',
        details: {
          mode: env.isDevelopment ? 'development' : 'production',
          platform: env.isAzure ? 'Azure' : env.isVercel ? 'Vercel' : env.isNetlify ? 'Netlify' : 'Unknown',
          hostname: window.location.hostname,
          protocol: window.location.protocol
        }
      };

      setHealthStatus({
        isHealthy,
        checks,
        timestamp: new Date().toISOString()
      });
    };

    performHealthChecks();
  }, [env]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-100';
      case 'warn': return 'text-yellow-600 bg-yellow-100';
      case 'fail': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return '✓';
      case 'warn': return '⚠';
      case 'fail': return '✗';
      default: return '?';
    }
  };

  if (!showDetails) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`px-3 py-2 rounded-lg shadow-lg text-sm font-medium ${
          healthStatus.isHealthy ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {healthStatus.isHealthy ? '✓ System Healthy' : '✗ System Issues'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">System Health Check</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          healthStatus.isHealthy ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {healthStatus.isHealthy ? 'All Systems Operational' : 'Issues Detected'}
        </div>
      </div>

      <div className="grid gap-4">
        {Object.entries(healthStatus.checks).map(([key, check]) => (
          <div key={key} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">{check.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                {getStatusIcon(check.status)} {check.status.toUpperCase()}
              </span>
            </div>
            
            {Object.entries(check.details).map(([detailKey, detailValue]) => (
              <div key={detailKey} className="text-sm text-gray-600">
                <span className="font-medium capitalize">{detailKey.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
                <span className="font-mono">
                  {typeof detailValue === 'object' ? JSON.stringify(detailValue) : String(detailValue)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t text-sm text-gray-500">
        Last checked: {new Date(healthStatus.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default HealthCheck;
