import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourcesSection = ({ resources }) => {
  const getIconByType = (type) => {
    switch (type) {
      case 'download':
        return 'Download';
      case 'github':
        return 'Github';
      case 'external':
        return 'ExternalLink';
      case 'documentation':
        return 'FileText';
      case 'video':
        return 'Play';
      default:
        return 'Link';
    }
  };

  const getColorByType = (type) => {
    switch (type) {
      case 'download':
        return 'success';
      case 'github':
        return 'secondary';
      case 'external':
        return 'outline';
      case 'documentation':
        return 'default';
      case 'video':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      {resources?.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
              <Icon name={category?.icon} size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{category?.title}</h3>
              <p className="text-sm text-muted-foreground">{category?.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category?.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-300 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors duration-200">
                      <Icon name={getIconByType(item?.type)} size={16} color="var(--color-brand-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{item?.name}</h4>
                      {item?.size && (
                        <p className="text-xs text-muted-foreground">{item?.size}</p>
                      )}
                    </div>
                  </div>
                  {item?.isNew && (
                    <span className="px-2 py-1 text-xs font-medium bg-success/20 text-success rounded-full">
                      New
                    </span>
                  )}
                </div>

                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {item?.description}
                </p>

                {item?.features && (
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {item?.features?.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-xs text-text-secondary">
                          <Icon name="Check" size={12} color="var(--color-success)" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    variant={getColorByType(item?.type)}
                    size="sm"
                    iconName={getIconByType(item?.type)}
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => window.open(item?.url, '_blank')}
                    className="flex-1 mr-2"
                  >
                    {item?.type === 'download' ? 'Download' : 
                     item?.type === 'github' ? 'View Code' : 
                     item?.type === 'video' ? 'Watch' : 'View'}
                  </Button>
                  
                  {item?.stars && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Star" size={12} color="var(--color-warning)" />
                      <span>{item?.stars}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Next Projects Section */}
      <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
            <Icon name="Rocket" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Suggested Next Projects</h3>
            <p className="text-sm text-muted-foreground">Build upon this foundation with these advanced projects</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Docker Container Management",
              description: "Set up Docker containers for various services on your NAS",
              difficulty: "Intermediate",
              estimatedTime: "4-6 hours"
            },
            {
              title: "Automated Backup System",
              description: "Implement automated backups with cloud synchronization",
              difficulty: "Advanced",
              estimatedTime: "6-8 hours"
            },
            {
              title: "Media Server Setup",
              description: "Configure Plex or Jellyfin for streaming media content",
              difficulty: "Beginner",
              estimatedTime: "2-3 hours"
            },
            {
              title: "VPN Server Configuration",
              description: "Set up a VPN server for secure remote access",
              difficulty: "Advanced",
              estimatedTime: "8-10 hours"
            }
          ]?.map((project, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-300">
              <h4 className="font-medium text-foreground mb-2">{project?.title}</h4>
              <p className="text-sm text-text-secondary mb-3">{project?.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  project?.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
                  project?.difficulty === 'Intermediate'? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'
                }`}>
                  {project?.difficulty}
                </span>
                <span className="text-muted-foreground">{project?.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;