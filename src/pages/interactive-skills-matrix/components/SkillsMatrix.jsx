import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsMatrix = ({ skills, selectedCategory, onSkillClick }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'matrix'
  const [sortBy, setSortBy] = useState('proficiency'); // 'proficiency', 'name', 'experience'

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills?.filter(skill => skill?.category === selectedCategory);

  const sortedSkills = [...filteredSkills]?.sort((a, b) => {
    switch (sortBy) {
      case 'proficiency':
        const proficiencyOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
        return proficiencyOrder?.[b?.proficiency] - proficiencyOrder?.[a?.proficiency];
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'experience':
        const getExperienceValue = (exp) => {
          const match = exp?.match(/(\d+)/);
          return match ? parseInt(match?.[1]) : 0;
        };
        return getExperienceValue(b?.experience) - getExperienceValue(a?.experience);
      default:
        return 0;
    }
  });

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-500';
      case 'Advanced':
        return 'bg-blue-500';
      case 'Intermediate':
        return 'bg-amber-500';
      case 'Beginner':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getProficiencySize = (level) => {
    switch (level) {
      case 'Expert':
        return 'w-16 h-16';
      case 'Advanced':
        return 'w-14 h-14';
      case 'Intermediate':
        return 'w-12 h-12';
      case 'Beginner':
        return 'w-10 h-10';
      default:
        return 'w-8 h-8';
    }
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Skills Matrix</h3>
          <p className="text-sm text-gray-600">
            {filteredSkills?.length} skills {selectedCategory !== 'All' && `in ${selectedCategory}`}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            >
              <option value="proficiency">Proficiency</option>
              <option value="name">Name</option>
              <option value="experience">Experience</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-white text-brand-primary shadow-sm' :'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name="Grid3X3" size={14} />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'matrix' ?'bg-white text-brand-primary shadow-sm' :'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name="LayoutGrid" size={14} />
              <span>Matrix</span>
            </button>
          </div>
        </div>
      </div>
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedSkills?.map((skill) => (
            <div
              key={skill?.id}
              onClick={() => onSkillClick(skill)}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-brand-primary/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getProficiencyColor(skill?.proficiency)} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={skill?.icon} size={18} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{skill?.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{skill?.category}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Proficiency</span>
                  <span className="text-xs font-medium text-gray-900">{skill?.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${getProficiencyColor(skill?.proficiency)}`}
                    style={{ width: `${skill?.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{skill?.experience}</span>
                  <span>{skill?.projectCount} projects</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Matrix View */}
      {viewMode === 'matrix' && (
        <div className="space-y-8">
          {categories?.map((category) => {
            const categorySkills = sortedSkills?.filter(skill => skill?.category === category);
            if (categorySkills?.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {categorySkills?.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                  {categorySkills?.map((skill) => (
                    <div
                      key={skill?.id}
                      onClick={() => onSkillClick(skill)}
                      className="relative group cursor-pointer"
                      title={`${skill?.name} - ${skill?.proficiency} (${skill?.percentage}%)`}
                    >
                      <div className={`${getProficiencySize(skill?.proficiency)} ${getProficiencyColor(skill?.proficiency)} rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110`}>
                        <Icon name={skill?.icon} size={skill?.proficiency === 'Expert' ? 24 : skill?.proficiency === 'Advanced' ? 20 : 16} color="white" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        <div className="font-medium">{skill?.name}</div>
                        <div className="text-gray-300">{skill?.proficiency} • {skill?.percentage}%</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Proficiency Levels</h4>
        <div className="flex flex-wrap gap-4">
          {['Expert', 'Advanced', 'Intermediate', 'Beginner']?.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${getProficiencyColor(level)}`}></div>
              <span className="text-sm text-gray-600">{level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;