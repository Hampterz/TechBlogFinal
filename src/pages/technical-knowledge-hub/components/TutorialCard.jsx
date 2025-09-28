import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TutorialCard = ({ tutorial, onViewTutorial }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-conversion-accent/10 text-conversion-accent border-conversion-accent/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'system-admin':
        return 'Server';
      case 'hardware':
        return 'Cpu';
      case 'frontend':
        return 'Code2';
      case 'devops':
        return 'GitBranch';
      case 'design':
        return 'Palette';
      case 'troubleshooting':
        return 'AlertTriangle';
      case 'security':
        return 'Shield';
      default:
        return 'BookOpen';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Icon name={getCategoryIcon(tutorial?.category)} size={18} color="white" />
          </div>
          <div>
            <span className={`inline-flex items-center px-2 py-1 rounded-xl text-xs font-medium border ${getDifficultyColor(tutorial?.difficulty)}`}>
              {tutorial?.difficulty?.charAt(0)?.toUpperCase() + tutorial?.difficulty?.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Clock" size={14} />
          <span className="text-sm">{formatDuration(tutorial?.duration)}</span>
        </div>
      </div>
      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
          {tutorial?.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-3">
          {tutorial?.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tutorial?.technologies?.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-xl bg-surface text-text-primary text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Prerequisites */}
        {tutorial?.prerequisites && tutorial?.prerequisites?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-text-secondary mb-1">Prerequisites:</p>
            <div className="flex flex-wrap gap-1">
              {tutorial?.prerequisites?.map((prereq, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-xl bg-muted text-muted-foreground text-xs"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between mb-4 pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={14} />
            <span>{tutorial?.views?.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={14} />
            <span>{tutorial?.comments}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={14} />
            <span>{tutorial?.likes}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm text-conversion-accent">
          <Icon name="CheckCircle" size={14} />
          <span>{tutorial?.completionRate}% completion</span>
        </div>
      </div>
      {/* Learning Outcomes */}
      <div className="mb-4">
        <p className="text-xs text-text-secondary mb-2">You'll learn:</p>
        <ul className="space-y-1">
          {tutorial?.learningOutcomes?.slice(0, 3)?.map((outcome, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-text-primary">
              <Icon name="Check" size={12} className="text-conversion-accent mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
          {tutorial?.learningOutcomes?.length > 3 && (
            <li className="text-xs text-text-secondary pl-4">
              +{tutorial?.learningOutcomes?.length - 3} more outcomes
            </li>
          )}
        </ul>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-text-secondary">Updated:</span>
          <span className="text-xs text-text-primary">{tutorial?.lastUpdated}</span>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onViewTutorial(tutorial)}
          className="bg-brand-primary hover:bg-brand-secondary"
        >
          Start Tutorial
        </Button>
      </div>
    </div>
  );
};

export default TutorialCard;