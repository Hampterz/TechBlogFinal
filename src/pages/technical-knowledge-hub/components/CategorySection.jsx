import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySection = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'system-admin',
      name: 'System Administration',
      description: 'Server management, Linux administration, and system optimization techniques',
      icon: 'Server',
      color: 'from-blue-500 to-blue-600',
      tutorialCount: 1,
      difficulty: 'Intermediate',
      topics: ['Linux Commands', 'Server Setup', 'Performance Tuning', 'Security Hardening']
    },
    {
      id: 'hardware',
      name: 'Hardware Integration',
      description: 'Raspberry Pi projects, IoT devices, and embedded systems development',
      icon: 'Cpu',
      color: 'from-green-500 to-green-600',
      tutorialCount: 1,
      difficulty: 'Intermediate',
      topics: ['Raspberry Pi', 'Arduino', 'Sensors', 'GPIO Programming']
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'Modern web development with React, JavaScript, and CSS frameworks',
      icon: 'Code2',
      color: 'from-purple-500 to-purple-600',
      tutorialCount: 1,
      difficulty: 'Intermediate',
      topics: ['React', 'JavaScript', 'Tailwind CSS', 'Vite']
    },
    {
      id: 'devops',
      name: 'DevOps Practices',
      description: 'CI/CD pipelines, containerization, and deployment automation',
      icon: 'GitBranch',
      color: 'from-orange-500 to-orange-600',
      tutorialCount: 1,
      difficulty: 'Beginner',
      topics: ['Docker', 'CI/CD', 'Kubernetes', 'Monitoring']
    },
    {
      id: 'design',
      name: '3D Design & Animation',
      description: '3D modeling, animation, and creative design using Blender',
      icon: 'Palette',
      color: 'from-pink-500 to-pink-600',
      tutorialCount: 1,
      difficulty: 'Advanced',
      topics: ['Blender', '3D Modeling', 'Animation', 'Rendering']
    }
  ];

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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Explore by Category</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Dive deep into specific technology areas with our comprehensive tutorial collections. 
          Each category offers structured learning paths from basics to advanced concepts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <div
            key={category?.id}
            className="bg-card rounded-xl border border-border p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 group cursor-pointer"
            onClick={() => onCategorySelect(category?.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${category?.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <Icon name={category?.icon} size={24} color="white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">{category?.tutorialCount}</div>
                <div className="text-xs text-text-secondary">tutorials</div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
                {category?.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {category?.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-secondary">Difficulty Level:</span>
                <span className={`text-xs font-medium ${getDifficultyColor(category?.difficulty)}`}>
                  {category?.difficulty}
                </span>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <p className="text-xs text-text-secondary mb-2">Popular Topics:</p>
              <div className="flex flex-wrap gap-1">
                {category?.topics?.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-surface text-text-primary text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              fullWidth
              className="text-brand-primary hover:text-white hover:bg-brand-primary group-hover:bg-brand-primary group-hover:text-white"
            >
              Explore Category
            </Button>
          </div>
        ))}
      </div>
      {/* View All Categories */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          size="lg"
          iconName="Grid3X3"
          iconPosition="left"
          onClick={() => onCategorySelect('all')}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          View All Categories
        </Button>
      </div>
    </div>
  );
};

export default CategorySection;