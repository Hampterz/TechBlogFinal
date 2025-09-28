import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SkillTimeline = ({ timelineData, selectedYear, onYearChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const years = Object.keys(timelineData)?.sort((a, b) => parseInt(a) - parseInt(b));
  const currentYear = new Date()?.getFullYear();

  const getYearStatus = (year) => {
    const yearNum = parseInt(year);
    if (yearNum < currentYear) return 'completed';
    if (yearNum === currentYear) return 'current';
    return 'future';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500 border-emerald-500';
      case 'current':
        return 'bg-blue-500 border-blue-500 animate-pulse';
      case 'future':
        return 'bg-gray-300 border-gray-300';
      default:
        return 'bg-gray-300 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center">
          <Icon name="TrendingUp" size={20} color="white" />
        </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Learning Timeline</h3>
            <p className="text-sm text-gray-600">Track skill development over time</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors duration-200"
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
        </button>
      </div>
      {/* Timeline Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Year: {selectedYear}</span>
          <span className="text-sm text-gray-500">
            {timelineData?.[selectedYear]?.skillsLearned || 0} skills learned
          </span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min={Math.min(...years?.map(y => parseInt(y)))}
            max={Math.max(...years?.map(y => parseInt(y)))}
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e?.target?.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((selectedYear - Math.min(...years?.map(y => parseInt(y)))) / (Math.max(...years?.map(y => parseInt(y))) - Math.min(...years?.map(y => parseInt(y))))) * 100}%, #E5E7EB ${((selectedYear - Math.min(...years?.map(y => parseInt(y)))) / (Math.max(...years?.map(y => parseInt(y))) - Math.min(...years?.map(y => parseInt(y))))) * 100}%, #E5E7EB 100%)`
            }}
          />
          
          {/* Year markers */}
          <div className="flex justify-between mt-2">
            {years?.map((year) => (
              <div key={year} className="flex flex-col items-center">
                <div 
                  className={`w-3 h-3 rounded-full border-2 ${getStatusColor(getYearStatus(year))} ${
                    parseInt(year) === selectedYear ? 'scale-125' : ''
                  } transition-all duration-200`}
                ></div>
                <span className={`text-xs mt-1 ${
                  parseInt(year) === selectedYear ? 'font-semibold text-brand-primary' : 'text-gray-500'
                }`}>
                  {year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Expanded Timeline Details */}
      {isExpanded && (
        <div className="space-y-4">
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Skills Acquired in {selectedYear}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timelineData?.[selectedYear]?.skills?.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    skill?.proficiency === 'Expert' ? 'bg-emerald-500' :
                    skill?.proficiency === 'Advanced' ? 'bg-blue-500' :
                    skill?.proficiency === 'Intermediate' ? 'bg-amber-500' : 'bg-red-400'
                  }`}>
                    <Icon name={skill?.icon} size={14} color="white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{skill?.name}</p>
                    <p className="text-sm text-gray-600">{skill?.context}</p>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 col-span-2">No skills data available for this year.</p>
              )}
            </div>
          </div>

          {/* Learning Milestones */}
          {timelineData?.[selectedYear]?.milestones && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Key Milestones</h4>
              <div className="space-y-2">
                {timelineData?.[selectedYear]?.milestones?.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                    <p className="text-gray-700">{milestone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillTimeline;