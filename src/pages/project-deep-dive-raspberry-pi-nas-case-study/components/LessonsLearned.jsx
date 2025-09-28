import React from 'react';
import Icon from '../../../components/AppIcon';

const LessonsLearned = ({ lessons }) => {
  const getIconByType = (type) => {
    switch (type) {
      case 'challenge':
        return { icon: 'AlertTriangle', color: 'var(--color-warning)' };
      case 'solution':
        return { icon: 'Lightbulb', color: 'var(--color-success)' };
      case 'skill':
        return { icon: 'Target', color: 'var(--color-brand-primary)' };
      default:
        return { icon: 'BookOpen', color: 'var(--color-text-secondary)' };
    }
  };

  const getBgByType = (type) => {
    switch (type) {
      case 'challenge':
        return 'bg-warning/10 border-warning/20';
      case 'solution':
        return 'bg-success/10 border-success/20';
      case 'skill':
        return 'bg-brand-primary/10 border-brand-primary/20';
      default:
        return 'bg-surface border-border';
    }
  };

  return (
    <div className="space-y-6">
      {lessons?.map((lesson, index) => {
        const iconData = getIconByType(lesson?.type);
        const bgClass = getBgByType(lesson?.type);
        
        return (
          <div key={index} className={`border rounded-lg p-6 ${bgClass} transition-all duration-300 hover:shadow-brand`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center">
                  <Icon name={iconData?.icon} size={20} color={iconData?.color} strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-foreground">{lesson?.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    lesson?.type === 'challenge' ? 'bg-warning/20 text-warning' :
                    lesson?.type === 'solution' ? 'bg-success/20 text-success' :
                    lesson?.type === 'skill'? 'bg-brand-primary/20 text-brand-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {lesson?.type}
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">{lesson?.description}</p>
                
                {lesson?.details && (
                  <div className="space-y-2">
                    {lesson?.details?.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} color="var(--color-text-secondary)" className="mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {lesson?.impact && (
                  <div className="mt-4 p-3 bg-card/50 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                      <span className="text-sm font-medium text-foreground">Impact</span>
                    </div>
                    <p className="text-sm text-text-secondary">{lesson?.impact}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LessonsLearned;