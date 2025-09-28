import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentUpdates = ({ onViewUpdate }) => {
  const updates = [
    {
      id: 1,
      type: 'tutorial',
      title: 'Setting up a Raspberry Pi 5 NAS with Docker',
      description: 'Complete guide updated with new security configurations and performance optimizations',
      category: 'Hardware Integration',
      author: 'TechBlog Team',
      date: '2025-01-18',
      timeAgo: '2 days ago',
      icon: 'BookOpen',
      color: 'from-green-500 to-green-600',
      changes: ['Added security section', 'Updated Docker configurations', 'New troubleshooting tips'],
      difficulty: 'Intermediate',
      readTime: '15 min'
    },
    {
      id: 2,
      type: 'resource',
      title: 'React Hooks Cheat Sheet v2.0',
      description: 'Updated with React 18 features, new hooks, and best practices for modern development',
      category: 'Frontend Development',
      author: 'TechBlog Team',
      date: '2025-01-17',
      timeAgo: '3 days ago',
      icon: 'FileText',
      color: 'from-purple-500 to-purple-600',
      changes: ['React 18 compatibility', 'New hook examples', 'Performance tips'],
      difficulty: 'All Levels',
      readTime: '8 min'
    },
    {
      id: 3,
      type: 'guide',
      title: 'Docker Security Best Practices',
      description: 'Comprehensive security guide with latest vulnerability patches and hardening techniques',
      category: 'DevOps Practices',
      author: 'TechBlog Team',
      date: '2025-01-16',
      timeAgo: '4 days ago',
      icon: 'Shield',
      color: 'from-orange-500 to-orange-600',
      changes: ['CVE updates', 'New scanning tools', 'Container hardening'],
      difficulty: 'Advanced',
      readTime: '22 min'
    },
    {
      id: 4,
      type: 'tutorial',
      title: 'Linux System Monitoring with Prometheus',
      description: 'Step-by-step tutorial for setting up comprehensive system monitoring and alerting',
      category: 'System Administration',
      author: 'TechBlog Team',
      date: '2025-01-15',
      timeAgo: '5 days ago',
      icon: 'Activity',
      color: 'from-blue-500 to-blue-600',
      changes: ['Grafana dashboard updates', 'New alert rules', 'Performance metrics'],
      difficulty: 'Intermediate',
      readTime: '18 min'
    },
    {
      id: 5,
      type: 'resource',
      title: 'API Testing Automation Scripts',
      description: 'Collection of Postman and Newman scripts for automated API testing workflows',
      category: 'Testing & QA',
      author: 'TechBlog Team',
      date: '2025-01-14',
      timeAgo: '6 days ago',
      icon: 'Zap',
      color: 'from-yellow-500 to-yellow-600',
      changes: ['Newman integration', 'CI/CD examples', 'Error handling'],
      difficulty: 'Intermediate',
      readTime: '12 min'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tutorial':
        return 'BookOpen';
      case 'resource':
        return 'Download';
      case 'guide':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'tutorial':
        return 'bg-conversion-accent/10 text-conversion-accent border-conversion-accent/20';
      case 'resource':
        return 'bg-trust-builder/10 text-trust-builder border-trust-builder/20';
      case 'guide':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-conversion-accent';
      case 'Intermediate':
        return 'text-warning';
      case 'Advanced':
        return 'text-destructive';
      default:
        return 'text-trust-builder';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Recent Updates</h2>
          <p className="text-text-secondary">
            Stay current with the latest improvements and new content additions
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Bell"
          iconPosition="left"
          onClick={() => alert('Newsletter subscription feature coming soon!')}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          Subscribe to Updates
        </Button>
      </div>
      <div className="space-y-4">
        {updates?.map((update) => (
          <div
            key={update?.id}
            className="bg-card rounded-xl border border-border p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-br ${update?.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                <Icon name={update?.icon} size={20} color="white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(update?.type)}`}>
                      <Icon name={getTypeIcon(update?.type)} size={12} className="mr-1" />
                      {update?.type?.charAt(0)?.toUpperCase() + update?.type?.slice(1)}
                    </span>
                    <span className="text-xs text-text-secondary">{update?.category}</span>
                  </div>
                  <div className="text-right text-xs text-text-secondary">
                    <div>{update?.timeAgo}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={getDifficultyColor(update?.difficulty)}>{update?.difficulty}</span>
                      <span>•</span>
                      <span>{update?.readTime}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {update?.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  {update?.description}
                </p>

                {/* Changes */}
                <div className="mb-4">
                  <p className="text-xs text-text-secondary mb-2">What's new:</p>
                  <div className="flex flex-wrap gap-2">
                    {update?.changes?.map((change, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-surface text-text-primary text-xs"
                      >
                        <Icon name="Plus" size={10} className="mr-1 text-conversion-accent" />
                        {change}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="User" size={12} />
                    <span>{update?.author}</span>
                    <span>•</span>
                    <span>{update?.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Bookmark"
                      iconPosition="left"
                      onClick={() => alert(`Bookmarked: ${update.title}`)}
                      className="text-text-secondary hover:text-brand-primary"
                    >
                      Save
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={() => onViewUpdate(update)}
                      className="bg-brand-primary hover:bg-brand-secondary"
                    >
                      View Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          size="lg"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={() => alert('Loading more updates...')}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          Load More Updates
        </Button>
      </div>
    </div>
  );
};

export default RecentUpdates;