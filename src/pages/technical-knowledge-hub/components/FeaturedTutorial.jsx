import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FeaturedTutorial = ({ tutorial, onViewTutorial }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-conversion-accent text-white';
      case 'intermediate':
        return 'bg-warning text-white';
      case 'advanced':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
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
    <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-8 text-white shadow-brand-lg overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Icon name="Star" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Featured Tutorial</h2>
              <p className="text-white/80 text-sm">Editor's Pick - Most Popular This Week</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial?.difficulty)}`}>
            {tutorial?.difficulty?.charAt(0)?.toUpperCase() + tutorial?.difficulty?.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold mb-4 leading-tight">
              {tutorial?.title}
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              {tutorial?.description}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="white" />
                <span className="text-sm">{formatDuration(tutorial?.duration)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} color="white" />
                <span className="text-sm">{tutorial?.views?.toLocaleString()} {tutorial?.views === 1 ? 'view' : 'views'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} color="white" />
                <span className="text-sm">{tutorial?.completionRate}% completed</span>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <p className="text-white/80 text-sm mb-2">Technologies covered:</p>
              <div className="flex flex-wrap gap-2">
                {tutorial?.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Learning Points */}
            <div className="mb-8">
              <p className="text-white/80 text-sm mb-3">What you'll master:</p>
              <ul className="space-y-2">
                {tutorial?.learningOutcomes?.slice(0, 4)?.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-conversion-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/90">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => onViewTutorial(tutorial)}
                className="bg-white text-brand-primary hover:bg-white/90 font-semibold"
              >
                Start Learning Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                iconName="Bookmark"
                iconPosition="left"
                className="text-white hover:bg-white/10 border-white/20"
              >
                Save for Later
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop"
                alt={tutorial?.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon name="Play" size={14} color="white" />
                    </div>
                    <span className="text-white text-sm font-medium">Interactive Tutorial</span>
                  </div>
                  <span className="text-white/80 text-sm">{tutorial?.steps} steps</span>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-conversion-accent rounded-xl p-3 shadow-brand">
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {tutorial?.rating > 0 ? tutorial?.rating : '—'}
                </div>
                <div className="text-xs text-white/90">
                  {tutorial?.rating > 0 ? '★★★★★' : 'No ratings yet'}
                </div>
                <div className="text-xs text-white/80">
                  {tutorial?.reviews} {tutorial?.reviews === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTutorial;