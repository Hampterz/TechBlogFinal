import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All':
        return 'Grid3X3';
      case 'Frontend':
        return 'Monitor';
      case 'Backend':
        return 'Server';
      case 'DevOps':
        return 'Cloud';
      case 'Hardware':
        return 'Cpu';
      case 'Design':
        return 'Box';
      case 'System Admin':
        return 'Settings';
      case 'Database':
        return 'Database';
      case 'Mobile':
        return 'Smartphone';
      default:
        return 'Code';
    }
  };

  const getCategoryColor = (category, isSelected) => {
    if (isSelected) {
      return 'bg-brand-primary text-white border-brand-primary';
    }
    
    switch (category) {
      case 'All':
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
      case 'Frontend':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      case 'Backend':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      case 'DevOps':
        return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
      case 'Hardware':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case 'Design':
        return 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100';
      case 'System Admin':
        return 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100';
      case 'Database':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100';
      case 'Mobile':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories?.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-2xl border-2 transition-all duration-300 font-medium ${getCategoryColor(category, selectedCategory === category)}`}
        >
          <Icon 
            name={getCategoryIcon(category)} 
            size={16} 
            color={selectedCategory === category ? 'white' : 'currentColor'} 
          />
          <span>{category}</span>
          {category !== 'All' && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedCategory === category 
                ? 'bg-white/20 text-white' :'bg-gray-200 text-gray-600'
            }`}>
              {category === 'Frontend' ? '4' : 
               category === 'Backend' ? '1' : 
               category === 'DevOps' ? '3' : 
               category === 'Hardware' ? '2' : 
               category === 'Design' ? '3' : 
               category === 'System Admin' ? '3' : 
               category === 'Database' ? '4' : '3'}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;