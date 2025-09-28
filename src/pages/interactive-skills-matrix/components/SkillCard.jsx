import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillCard = ({ skill, onSkillClick, isSelected }) => {

  const getSkillColor = (skill) => {
    // Use category-based colors
    switch (skill?.category) {
      case 'Frontend':
        return 'bg-blue-500';
      case 'Backend':
        return 'bg-green-500';
      case 'DevOps':
        return 'bg-purple-500';
      case 'Hardware':
        return 'bg-red-500';
      case 'Design':
        return 'bg-pink-500';
      case 'System Admin':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSkillBorder = (skill) => {
    // Use category-based colors
    switch (skill?.category) {
      case 'Frontend':
        return 'border-blue-200';
      case 'Backend':
        return 'border-green-200';
      case 'DevOps':
        return 'border-purple-200';
      case 'Hardware':
        return 'border-red-200';
      case 'Design':
        return 'border-pink-200';
      case 'System Admin':
        return 'border-orange-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
        isSelected 
          ? `${getSkillBorder(skill)} bg-white shadow-lg scale-105` 
          : 'border-gray-200 bg-white hover:shadow-lg hover:scale-110 hover:border-gray-300'
      }`}
      onClick={() => onSkillClick(skill)}
    >
      {/* Skill Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${getSkillColor(skill)}`}>
            <Icon name={skill?.icon} size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{skill?.name}</h3>
            <p className="text-sm text-gray-500">{skill?.category}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSkillColor(skill)}`}>
          {skill?.proficiency}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Proficiency</span>
          <span className="text-sm font-medium text-gray-900">{skill?.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(skill)}`}
            style={{ width: `${skill?.percentage}%` }}
          ></div>
        </div>
      </div>
      {/* Experience Duration */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>{skill?.experience}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="FolderOpen" size={14} />
          <span>{skill?.projectCount} projects</span>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} color="white" />
        </div>
      )}
    </div>
  );
};

export default SkillCard;