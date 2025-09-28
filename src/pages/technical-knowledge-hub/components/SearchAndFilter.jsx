import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilterChange, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'system-administration', label: 'System Administration' },
    { value: 'hardware-integration', label: 'Hardware Integration' },
    { value: 'full-stack-development', label: 'Full-Stack Development' },
    { value: 'devops-practices', label: 'DevOps Practices' },
    { value: 'troubleshooting', label: 'Troubleshooting' },
    { value: 'security', label: 'Security' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const technologyOptions = [
    { value: 'all', label: 'All Technologies' },
    { value: 'raspberry-pi', label: 'Raspberry Pi 5' },
    { value: 'linux', label: 'Linux' },
    { value: 'docker', label: 'Docker' },
    { value: 'react', label: 'React' },
    { value: 'node-js', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'networking', label: 'Networking' },
    { value: 'databases', label: 'Databases' }
  ];

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange({ category: value, difficulty: selectedDifficulty, technology: selectedTechnology });
  };

  const handleDifficultyChange = (value) => {
    setSelectedDifficulty(value);
    onFilterChange({ category: selectedCategory, difficulty: value, technology: selectedTechnology });
  };

  const handleTechnologyChange = (value) => {
    setSelectedTechnology(value);
    onFilterChange({ category: selectedCategory, difficulty: selectedDifficulty, technology: value });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedTechnology('all');
    onSearch('');
    onFilterChange({ category: 'all', difficulty: 'all', technology: 'all' });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
            <Icon name="Search" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Search & Filter</h2>
            <p className="text-sm text-text-secondary">Find the perfect tutorial for your needs</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={clearFilters}
          className="text-text-secondary hover:text-brand-primary"
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <Input
            type="search"
            placeholder="Search tutorials, guides, and resources..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Select category"
          />

          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            placeholder="Select difficulty"
          />

          <Select
            label="Technology"
            options={technologyOptions}
            value={selectedTechnology}
            onChange={handleTechnologyChange}
            placeholder="Select technology"
          />
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedTechnology !== 'all' || searchQuery) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm text-text-secondary">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-xl bg-brand-primary/10 text-brand-primary text-xs">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-xl bg-conversion-accent/10 text-conversion-accent text-xs">
                {categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}
              </span>
            )}
            {selectedDifficulty !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-xl bg-trust-builder/10 text-trust-builder text-xs">
                {difficultyOptions?.find(opt => opt?.value === selectedDifficulty)?.label}
              </span>
            )}
            {selectedTechnology !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-xl bg-warning/10 text-warning text-xs">
                {technologyOptions?.find(opt => opt?.value === selectedTechnology)?.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;