import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PopularResources = ({ onDownloadResource }) => {
  const resources = [
    {
      id: 1,
      title: 'Complete Linux Command Reference',
      description: 'Comprehensive cheat sheet with 200+ essential Linux commands, examples, and use cases',
      type: 'PDF Guide',
      size: '2.4 MB',
      downloads: 15420,
      category: 'System Administration',
      icon: 'FileText',
      color: 'from-blue-500 to-blue-600',
      tags: ['Linux', 'Commands', 'Reference', 'Cheat Sheet']
    },
    {
      id: 2,
      title: 'Docker Configuration Templates',
      description: 'Ready-to-use Docker Compose files for common development environments and services',
      type: 'ZIP Archive',
      size: '1.8 MB',
      downloads: 12350,
      category: 'DevOps',
      icon: 'Package',
      color: 'from-orange-500 to-orange-600',
      tags: ['Docker', 'Templates', 'DevOps', 'Configuration']
    },
    {
      id: 3,
      title: 'React Component Library',
      description: 'Reusable React components with TypeScript, Storybook documentation, and unit tests',
      type: 'GitHub Repo',
      size: '5.2 MB',
      downloads: 8940,
      category: 'Frontend',
      icon: 'Code2',
      color: 'from-purple-500 to-purple-600',
      tags: ['React', 'TypeScript', 'Components', 'Library']
    },
    {
      id: 4,
      title: 'Raspberry Pi Setup Scripts',
      description: 'Automated installation scripts for common Raspberry Pi projects and configurations',
      type: 'Shell Scripts',
      size: '850 KB',
      downloads: 7680,
      category: 'Hardware',
      icon: 'Terminal',
      color: 'from-green-500 to-green-600',
      tags: ['Raspberry Pi', 'Scripts', 'Automation', 'Setup']
    },
    {
      id: 5,
      title: 'API Security Checklist',
      description: 'Complete security audit checklist for REST APIs with testing tools and examples',
      type: 'Interactive Guide',
      size: '1.2 MB',
      downloads: 6230,
      category: 'Security',
      icon: 'Shield',
      color: 'from-indigo-500 to-indigo-600',
      tags: ['Security', 'API', 'Checklist', 'Testing']
    },
    {
      id: 6,
      title: 'Database Schema Templates',
      description: 'Common database schemas for e-commerce, blogs, and SaaS applications with migrations',
      type: 'SQL Files',
      size: '3.1 MB',
      downloads: 5890,
      category: 'Backend',
      icon: 'Database',
      color: 'from-teal-500 to-teal-600',
      tags: ['Database', 'SQL', 'Schema', 'Templates']
    }
  ];

  const formatDownloads = (count) => {
    if (count >= 10000) {
      return `${(count / 1000)?.toFixed(1)}k`;
    }
    return count?.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Popular Resources</h2>
          <p className="text-text-secondary">
            Download code templates, configuration files, and reference materials
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          View All Resources
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((resource) => (
          <div
            key={resource?.id}
            className="bg-card rounded-xl border border-border p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${resource?.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <Icon name={resource?.icon} size={24} color="white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">{resource?.type}</div>
                <div className="text-xs text-text-secondary">{resource?.size}</div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
                {resource?.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {resource?.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-secondary">Category:</span>
                <span className="text-xs font-medium text-brand-primary">
                  {resource?.category}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {resource?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-surface text-text-primary text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats and Action */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={14} />
                  <span>{formatDownloads(resource?.downloads)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} />
                  <span>4.8</span>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => onDownloadResource(resource)}
                className="bg-brand-primary hover:bg-brand-secondary"
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Download Stats */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold mb-1">150+</div>
            <div className="text-white/80 text-sm">Resources Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">50k+</div>
            <div className="text-white/80 text-sm">Total Downloads</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">4.9</div>
            <div className="text-white/80 text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">Weekly</div>
            <div className="text-white/80 text-sm">New Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularResources;