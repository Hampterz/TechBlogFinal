import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import RichTextEditor from './RichTextEditor';
import BlogTemplateGenerator from './BlogTemplateGenerator';

const AdvancedBlogEditor = ({ 
  blogPost, 
  onSave, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: '',
    category: 'Technology',
    status: 'draft',
    featured: false,
    // Advanced customization options
    customStyles: {
      heroBackground: 'galaxy', // galaxy, gradient, solid, image
      heroColor: '#8b5cf6',
      heroGradient: 'from-purple-600 to-indigo-600',
      textColor: '#1f2937',
      accentColor: '#8b5cf6',
      fontFamily: 'inter', // inter, roboto, open-sans, system
      fontSize: 'base', // sm, base, lg, xl
      lineHeight: 'relaxed', // tight, normal, relaxed, loose
      maxWidth: '4xl', // sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
      spacing: 'normal', // tight, normal, relaxed, loose
      borderRadius: 'lg', // none, sm, md, lg, xl, 2xl, 3xl
      shadow: 'lg', // none, sm, md, lg, xl, 2xl
      animation: 'fade', // none, fade, slide, scale, bounce
      codeTheme: 'dark', // light, dark, auto
      imageStyle: 'rounded', // none, rounded, circle, square
      buttonStyle: 'modern', // classic, modern, minimal, bold
      cardStyle: 'elevated', // flat, elevated, outlined, filled
    },
    // Content sections
    sections: [
      {
        id: 'hero',
        type: 'hero',
        enabled: true,
        content: {
          title: '',
          subtitle: '',
          backgroundImage: '',
          overlay: true,
          overlayOpacity: 0.7
        }
      },
      {
        id: 'overview',
        type: 'overview',
        enabled: true,
        content: {
          title: 'Project Overview',
          items: []
        }
      },
      {
        id: 'steps',
        type: 'steps',
        enabled: true,
        content: {
          title: 'Step-by-Step Guide',
          steps: []
        }
      },
      {
        id: 'code',
        type: 'code',
        enabled: true,
        content: {
          title: 'Code Examples',
          blocks: []
        }
      },
      {
        id: 'gallery',
        type: 'gallery',
        enabled: true,
        content: {
          title: 'Project Gallery',
          images: []
        }
      },
      {
        id: 'lessons',
        type: 'lessons',
        enabled: true,
        content: {
          title: 'Lessons Learned',
          items: []
        }
      },
      {
        id: 'troubleshooting',
        type: 'troubleshooting',
        enabled: true,
        content: {
          title: 'Troubleshooting Guide',
          items: []
        }
      },
      {
        id: 'metrics',
        type: 'metrics',
        enabled: true,
        content: {
          title: 'Performance Metrics',
          items: []
        }
      },
      {
        id: 'github',
        type: 'github',
        enabled: true,
        content: {
          title: 'GitHub Integration',
          repository: '',
          showStats: true,
          showFiles: true
        }
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false);
  const editorRef = useRef(null);

  // Initialize form data when editing
  useEffect(() => {
    if (isEditing && blogPost) {
      setFormData({
        ...formData,
        ...blogPost,
        customStyles: {
          ...formData.customStyles,
          ...blogPost.customStyles
        },
        sections: blogPost.sections || formData.sections
      });
    }
  }, [isEditing, blogPost]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStyleChange = (styleField, value) => {
    setFormData(prev => ({
      ...prev,
      customStyles: {
        ...prev.customStyles,
        [styleField]: value
      }
    }));
  };

  const handleSectionChange = (sectionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, [field]: value }
          : section
      )
    }));
  };

  const handleSectionContentChange = (sectionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, [field]: value } }
          : section
      )
    }));
  };

  const addSectionItem = (sectionId, itemType) => {
    const newItem = {
      id: `item-${Date.now()}`,
      type: itemType,
      content: '',
      ...(itemType === 'overview' && {
        title: '',
        value: '',
        icon: 'Info',
        description: '',
        color: 'brand-primary'
      }),
      ...(itemType === 'step' && {
        title: '',
        duration: '',
        description: '',
        commands: '',
        image: ''
      }),
      ...(itemType === 'code' && {
        language: 'javascript',
        title: '',
        code: '',
        description: ''
      }),
      ...(itemType === 'gallery' && {
        src: '',
        alt: '',
        caption: '',
        type: 'image'
      }),
      ...(itemType === 'lesson' && {
        title: '',
        description: '',
        category: 'success'
      }),
      ...(itemType === 'troubleshooting' && {
        problem: '',
        solution: '',
        category: 'error'
      }),
      ...(itemType === 'metric' && {
        title: '',
        value: '',
        unit: '',
        description: '',
        trend: 'up'
      })
    };

    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                items: [...(section.content.items || []), newItem]
              }
            }
          : section
      )
    }));
  };

  const removeSectionItem = (sectionId, itemId) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                items: (section.content.items || []).filter(item => item.id !== itemId)
              }
            }
          : section
      )
    }));
  };

  const updateSectionItem = (sectionId, itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                items: (section.content.items || []).map(item =>
                  item.id === itemId ? { ...item, [field]: value } : item
                )
              }
            }
          : section
      )
    }));
  };

  const toggleSection = (sectionId) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      )
    }));
  };

  const moveSection = (sectionId, direction) => {
    setFormData(prev => {
      const sections = [...prev.sections];
      const index = sections.findIndex(s => s.id === sectionId);
      
      if (direction === 'up' && index > 0) {
        [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
      } else if (direction === 'down' && index < sections.length - 1) {
        [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
      }
      
      return { ...prev, sections };
    });
  };

  const handleSave = () => {
    const blogData = {
      ...formData,
      id: isEditing ? blogPost.id : `blog-${Date.now()}`,
      author: "Sreyas",
      readTime: Math.ceil(formData.content.length / 1000) || 1,
      createdAt: isEditing ? blogPost.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave(blogData);
  };

  const handleApplyTemplate = (template) => {
    setFormData(template);
    setShowTemplateGenerator(false);
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'sections', label: 'Sections', icon: 'Layout' },
    { id: 'styles', label: 'Styles', icon: 'Palette' },
    { id: 'preview', label: 'Preview', icon: 'Eye' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <p className="text-gray-600">
              Advanced blog editor with full customization options
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplateGenerator(true)}
                iconName="Zap"
              >
                Templates
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              iconName={previewMode ? "Edit" : "Eye"}
            >
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
              <Icon name="Save" size={18} />
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name={tab.icon} size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'content' && (
            <div className="h-full flex">
              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Post Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your amazing blog post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Learning">Learning</option>
                        <option value="Project">Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Brief description of your post..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="React, Tutorial, Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Content *
                    </label>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => handleInputChange('content', value)}
                      placeholder="# Your Post Title

Write your blog post content here...

## Section Header

Your content with **bold** and *italic* text.

### Key Points
- Point 1
- Point 2
- Point 3

```javascript
// Code example
console.log('Hello World');
```

[Link example](https://example.com)"
                      minHeight={400}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-gray-200 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                      Feature this post
                    </label>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Post Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Word Count:</span>
                        <span className="font-medium">{formData.content.split(' ').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Read Time:</span>
                        <span className="font-medium">{Math.ceil(formData.content.length / 1000)} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Characters:</span>
                        <span className="font-medium">{formData.content.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="h-full p-6 overflow-y-auto">
              <div className="space-y-4">
                {formData.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`border rounded-xl p-4 ${
                      section.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={section.enabled}
                          onChange={() => toggleSection(section.id)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <h3 className="font-semibold text-gray-900">{section.content.title || section.type}</h3>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {section.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <Icon name="ChevronUp" size={16} />
                        </button>
                        <button
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={index === formData.sections.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <Icon name="ChevronDown" size={16} />
                        </button>
                        <button
                          onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Icon name="Settings" size={16} />
                        </button>
                      </div>
                    </div>

                    {selectedSection === section.id && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={section.content.title}
                            onChange={(e) => handleSectionContentChange(section.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        {/* Section-specific content based on type */}
                        {section.type === 'overview' && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">Overview Items</label>
                              <Button
                                size="sm"
                                onClick={() => addSectionItem(section.id, 'overview')}
                                className="bg-green-600 text-white"
                              >
                                <Icon name="Plus" size={14} />
                                Add Item
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {(section.content.items || []).map((item, itemIndex) => (
                                <div key={item.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border">
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateSectionItem(section.id, item.id, 'title', e.target.value)}
                                    placeholder="Title"
                                    className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                                  />
                                  <input
                                    type="text"
                                    value={item.value}
                                    onChange={(e) => updateSectionItem(section.id, item.id, 'value', e.target.value)}
                                    placeholder="Value"
                                    className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                                  />
                                  <button
                                    onClick={() => removeSectionItem(section.id, item.id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.type === 'steps' && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">Steps</label>
                              <Button
                                size="sm"
                                onClick={() => addSectionItem(section.id, 'step')}
                                className="bg-green-600 text-white"
                              >
                                <Icon name="Plus" size={14} />
                                Add Step
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {(section.content.steps || []).map((step, stepIndex) => (
                                <div key={step.id} className="p-3 bg-white rounded-lg border">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Step {stepIndex + 1}</span>
                                    <button
                                      onClick={() => removeSectionItem(section.id, step.id)}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={step.title}
                                    onChange={(e) => updateSectionItem(section.id, step.id, 'title', e.target.value)}
                                    placeholder="Step title"
                                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm mb-2"
                                  />
                                  <textarea
                                    value={step.description}
                                    onChange={(e) => updateSectionItem(section.id, step.id, 'description', e.target.value)}
                                    placeholder="Step description"
                                    rows={2}
                                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Add more section types as needed */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'styles' && (
            <div className="h-full p-6 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Layout Styles */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Layout & Typography</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                    <select
                      value={formData.customStyles.fontFamily}
                      onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="inter">Inter</option>
                      <option value="roboto">Roboto</option>
                      <option value="open-sans">Open Sans</option>
                      <option value="system">System Font</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                    <select
                      value={formData.customStyles.fontSize}
                      onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="sm">Small</option>
                      <option value="base">Base</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Line Height</label>
                    <select
                      value={formData.customStyles.lineHeight}
                      onChange={(e) => handleStyleChange('lineHeight', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="tight">Tight</option>
                      <option value="normal">Normal</option>
                      <option value="relaxed">Relaxed</option>
                      <option value="loose">Loose</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Width</label>
                    <select
                      value={formData.customStyles.maxWidth}
                      onChange={(e) => handleStyleChange('maxWidth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                      <option value="2xl">2X Large</option>
                      <option value="3xl">3X Large</option>
                      <option value="4xl">4X Large</option>
                      <option value="5xl">5X Large</option>
                      <option value="6xl">6X Large</option>
                      <option value="7xl">7X Large</option>
                    </select>
                  </div>
                </div>

                {/* Color & Theme */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Colors & Theme</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <input
                      type="color"
                      value={formData.customStyles.heroColor}
                      onChange={(e) => handleStyleChange('heroColor', e.target.value)}
                      className="w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                    <input
                      type="color"
                      value={formData.customStyles.accentColor}
                      onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                      className="w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <input
                      type="color"
                      value={formData.customStyles.textColor}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      className="w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background</label>
                    <select
                      value={formData.customStyles.heroBackground}
                      onChange={(e) => handleStyleChange('heroBackground', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="galaxy">Galaxy</option>
                      <option value="gradient">Gradient</option>
                      <option value="solid">Solid Color</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                </div>

                {/* Component Styles */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Component Styles</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
                    <select
                      value={formData.customStyles.borderRadius}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                      <option value="2xl">2X Large</option>
                      <option value="3xl">3X Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
                    <select
                      value={formData.customStyles.shadow}
                      onChange={(e) => handleStyleChange('shadow', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                      <option value="2xl">2X Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
                    <select
                      value={formData.customStyles.animation}
                      onChange={(e) => handleStyleChange('animation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="fade">Fade</option>
                      <option value="slide">Slide</option>
                      <option value="scale">Scale</option>
                      <option value="bounce">Bounce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code Theme</label>
                    <select
                      value={formData.customStyles.codeTheme}
                      onChange={(e) => handleStyleChange('codeTheme', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Style Preview</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div 
                      className="bg-white rounded-lg p-4 shadow-lg"
                      style={{
                        fontFamily: formData.customStyles.fontFamily === 'inter' ? 'Inter, sans-serif' : 
                                   formData.customStyles.fontFamily === 'roboto' ? 'Roboto, sans-serif' :
                                   formData.customStyles.fontFamily === 'open-sans' ? 'Open Sans, sans-serif' : 'system-ui, sans-serif',
                        fontSize: formData.customStyles.fontSize === 'sm' ? '14px' :
                                 formData.customStyles.fontSize === 'base' ? '16px' :
                                 formData.customStyles.fontSize === 'lg' ? '18px' : '20px',
                        lineHeight: formData.customStyles.lineHeight === 'tight' ? '1.25' :
                                   formData.customStyles.lineHeight === 'normal' ? '1.5' :
                                   formData.customStyles.lineHeight === 'relaxed' ? '1.75' : '2',
                        color: formData.customStyles.textColor,
                        maxWidth: formData.customStyles.maxWidth === 'sm' ? '640px' :
                                 formData.customStyles.maxWidth === 'md' ? '768px' :
                                 formData.customStyles.maxWidth === 'lg' ? '1024px' :
                                 formData.customStyles.maxWidth === 'xl' ? '1280px' :
                                 formData.customStyles.maxWidth === '2xl' ? '1536px' :
                                 formData.customStyles.maxWidth === '3xl' ? '1728px' :
                                 formData.customStyles.maxWidth === '4xl' ? '1920px' :
                                 formData.customStyles.maxWidth === '5xl' ? '2048px' :
                                 formData.customStyles.maxWidth === '6xl' ? '2304px' : '2560px',
                        borderRadius: formData.customStyles.borderRadius === 'none' ? '0' :
                                    formData.customStyles.borderRadius === 'sm' ? '4px' :
                                    formData.customStyles.borderRadius === 'md' ? '6px' :
                                    formData.customStyles.borderRadius === 'lg' ? '8px' :
                                    formData.customStyles.borderRadius === 'xl' ? '12px' :
                                    formData.customStyles.borderRadius === '2xl' ? '16px' : '24px'
                      }}
                    >
                      <h2 style={{ color: formData.customStyles.accentColor }} className="text-xl font-bold mb-2">
                        Sample Blog Post
                      </h2>
                      <p className="mb-4">
                        This is a preview of how your blog post will look with the selected styles.
                      </p>
                      <div className="bg-gray-100 rounded p-3 mb-4">
                        <code className="text-sm">Code block preview</code>
                      </div>
                      <button 
                        className="px-4 py-2 rounded text-white"
                        style={{ backgroundColor: formData.customStyles.accentColor }}
                      >
                        Sample Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full overflow-y-auto">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl font-bold mb-4">{formData.title || 'Untitled Post'}</h1>
                  <p className="text-xl text-gray-600 mb-8">{formData.excerpt}</p>
                  
                  {formData.featuredImage && (
                    <div className="mb-8">
                      <img 
                        src={formData.featuredImage} 
                        alt={formData.title}
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                  )}
                  
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Template Generator Modal */}
        {showTemplateGenerator && (
          <BlogTemplateGenerator
            onApplyTemplate={handleApplyTemplate}
            onClose={() => setShowTemplateGenerator(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default AdvancedBlogEditor;
