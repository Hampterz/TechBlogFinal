import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectOverviewCard = ({ title, value, icon, description, color = "brand-primary" }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-${color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
          <Icon name={icon} size={20} color="white" strokeWidth={2.5} />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
};

export default ProjectOverviewCard;