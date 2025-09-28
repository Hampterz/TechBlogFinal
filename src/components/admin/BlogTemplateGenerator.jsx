import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const BlogTemplateGenerator = ({ onApplyTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('raspberry-pi');
  const [customization, setCustomization] = useState({
    projectName: '',
    technologies: [],
    duration: '',
    difficulty: 'intermediate',
    category: 'hardware'
  });

  const templates = [
    {
      id: 'raspberry-pi',
      name: 'Raspberry Pi Project',
      description: 'Complete project walkthrough with hardware setup, code examples, and lessons learned',
      icon: 'Cpu',
      color: 'green',
      sections: [
        'hero',
        'overview',
        'steps',
        'code',
        'gallery',
        'lessons',
        'troubleshooting',
        'metrics',
        'github'
      ]
    },
    {
      id: 'web-development',
      name: 'Web Development Tutorial',
      description: 'Step-by-step tutorial with code examples, best practices, and deployment guide',
      icon: 'Code2',
      color: 'blue',
      sections: [
        'hero',
        'overview',
        'steps',
        'code',
        'gallery',
        'lessons',
        'github'
      ]
    },
    {
      id: 'learning-journey',
      name: 'Learning Journey',
      description: 'Document your learning process with challenges, solutions, and progress tracking',
      icon: 'BookOpen',
      color: 'purple',
      sections: [
        'hero',
        'overview',
        'steps',
        'lessons',
        'metrics'
      ]
    },
    {
      id: 'hardware-build',
      name: 'Hardware Build',
      description: 'Complete hardware project documentation with assembly, testing, and optimization',
      icon: 'Wrench',
      color: 'orange',
      sections: [
        'hero',
        'overview',
        'steps',
        'gallery',
        'troubleshooting',
        'metrics'
      ]
    },
    {
      id: 'software-tutorial',
      name: 'Software Tutorial',
      description: 'Comprehensive software tutorial with installation, configuration, and usage examples',
      icon: 'Terminal',
      color: 'indigo',
      sections: [
        'hero',
        'overview',
        'steps',
        'code',
        'troubleshooting',
        'github'
      ]
    }
  ];

  const generateTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return null;

    const baseTemplate = {
      title: customization.projectName || `${template.name} Project`,
      excerpt: `A comprehensive guide to ${customization.projectName || 'this project'} with step-by-step instructions, code examples, and lessons learned.`,
      content: `# ${customization.projectName || template.name} Project

## Overview

This project demonstrates [brief description of what the project does and why it's valuable].

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

${customization.technologies.map(tech => `- ${tech}`).join('\n')}

## Project Timeline

- **Duration**: ${customization.duration || '2-4 weeks'}
- **Difficulty**: ${customization.difficulty}
- **Category**: ${customization.category}

---

## Getting Started

[Introduction to the project and prerequisites]

## Step-by-Step Guide

[Detailed walkthrough of the project]

## Code Examples

[Relevant code snippets and explanations]

## Results & Lessons Learned

[What worked well, what didn't, and key takeaways]

## Conclusion

[Summary and next steps]`,
      featuredImage: '',
      tags: customization.technologies.join(', '),
      category: customization.category,
      status: 'draft',
      featured: false,
      customStyles: {
        heroBackground: 'galaxy',
        heroColor: '#8b5cf6',
        heroGradient: 'from-purple-600 to-indigo-600',
        textColor: '#1f2937',
        accentColor: '#8b5cf6',
        fontFamily: 'inter',
        fontSize: 'base',
        lineHeight: 'relaxed',
        maxWidth: '4xl',
        spacing: 'normal',
        borderRadius: 'lg',
        shadow: 'lg',
        animation: 'fade',
        codeTheme: 'dark',
        imageStyle: 'rounded',
        buttonStyle: 'modern',
        cardStyle: 'elevated'
      },
      sections: template.sections.map(sectionId => {
        const sectionConfigs = {
          hero: {
            id: 'hero',
            type: 'hero',
            enabled: true,
            content: {
              title: customization.projectName || template.name,
              subtitle: `A comprehensive guide to building ${customization.projectName || 'this project'}`,
              backgroundImage: '',
              overlay: true,
              overlayOpacity: 0.7
            }
          },
          overview: {
            id: 'overview',
            type: 'overview',
            enabled: true,
            content: {
              title: 'Project Overview',
              items: [
                {
                  id: 'duration',
                  type: 'overview',
                  title: 'Project Duration',
                  value: customization.duration || '2-4 weeks',
                  icon: 'Clock',
                  description: 'Total time from planning to completion',
                  color: 'brand-primary'
                },
                {
                  id: 'technologies',
                  type: 'overview',
                  title: 'Technologies Used',
                  value: customization.technologies.length.toString(),
                  icon: 'Cpu',
                  description: customization.technologies.join(', '),
                  color: 'brand-secondary'
                },
                {
                  id: 'difficulty',
                  type: 'overview',
                  title: 'Difficulty Level',
                  value: customization.difficulty,
                  icon: 'Target',
                  description: 'Recommended skill level for this project',
                  color: 'success'
                }
              ]
            }
          },
          steps: {
            id: 'steps',
            type: 'steps',
            enabled: true,
            content: {
              title: 'Step-by-Step Guide',
              steps: [
                {
                  id: 'step-1',
                  type: 'step',
                  title: 'Planning & Preparation',
                  duration: '1-2 hours',
                  description: 'Research, gather materials, and plan your approach',
                  commands: '',
                  image: ''
                },
                {
                  id: 'step-2',
                  type: 'step',
                  title: 'Initial Setup',
                  duration: '2-3 hours',
                  description: 'Set up the basic foundation and environment',
                  commands: '',
                  image: ''
                },
                {
                  id: 'step-3',
                  type: 'step',
                  title: 'Core Implementation',
                  duration: '4-6 hours',
                  description: 'Build the main functionality',
                  commands: '',
                  image: ''
                },
                {
                  id: 'step-4',
                  type: 'step',
                  title: 'Testing & Optimization',
                  duration: '2-3 hours',
                  description: 'Test functionality and optimize performance',
                  commands: '',
                  image: ''
                }
              ]
            }
          },
          code: {
            id: 'code',
            type: 'code',
            enabled: true,
            content: {
              title: 'Code Examples',
              blocks: [
                {
                  id: 'code-1',
                  type: 'code',
                  language: 'javascript',
                  title: 'Basic Setup',
                  code: '// Basic setup code\nconsole.log("Hello, World!");',
                  description: 'Initial setup and configuration'
                }
              ]
            }
          },
          gallery: {
            id: 'gallery',
            type: 'gallery',
            enabled: true,
            content: {
              title: 'Project Gallery',
              images: [
                {
                  id: 'img-1',
                  type: 'gallery',
                  src: '',
                  alt: 'Project overview',
                  caption: 'Project overview and setup',
                  type: 'image'
                }
              ]
            }
          },
          lessons: {
            id: 'lessons',
            type: 'lessons',
            enabled: true,
            content: {
              title: 'Lessons Learned',
              items: [
                {
                  id: 'lesson-1',
                  type: 'lesson',
                  title: 'Key Insight 1',
                  description: 'What you learned from this aspect of the project',
                  category: 'success'
                },
                {
                  id: 'lesson-2',
                  type: 'lesson',
                  title: 'Challenge Overcome',
                  description: 'A challenge you faced and how you solved it',
                  category: 'warning'
                }
              ]
            }
          },
          troubleshooting: {
            id: 'troubleshooting',
            type: 'troubleshooting',
            enabled: true,
            content: {
              title: 'Troubleshooting Guide',
              items: [
                {
                  id: 'trouble-1',
                  type: 'troubleshooting',
                  problem: 'Common Issue 1',
                  solution: 'How to solve this issue',
                  category: 'error'
                }
              ]
            }
          },
          metrics: {
            id: 'metrics',
            type: 'metrics',
            enabled: true,
            content: {
              title: 'Performance Metrics',
              items: [
                {
                  id: 'metric-1',
                  type: 'metric',
                  title: 'Performance Score',
                  value: '95',
                  unit: '%',
                  description: 'Overall project performance',
                  trend: 'up'
                }
              ]
            }
          },
          github: {
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
        };

        return sectionConfigs[sectionId] || {
          id: sectionId,
          type: sectionId,
          enabled: true,
          content: {
            title: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
            items: []
          }
        };
      })
    };

    return baseTemplate;
  };

  const handleApplyTemplate = () => {
    const template = generateTemplate(selectedTemplate);
    if (template) {
      onApplyTemplate(template);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Template Generator</h2>
            <p className="text-gray-600">Choose a template and customize it for your blog post</p>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Template Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
              <div className="space-y-3">
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${template.color}-100`}>
                        <Icon name={template.icon} size={20} color={`#${template.color === 'green' ? '10b981' : template.color === 'blue' ? '3b82f6' : template.color === 'purple' ? '8b5cf6' : template.color === 'orange' ? 'f97316' : '6366f1'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize Template</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={customization.projectName}
                    onChange={(e) => setCustomization(prev => ({ ...prev, projectName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Raspberry Pi NAS Server"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={customization.technologies.join(', ')}
                    onChange={(e) => setCustomization(prev => ({ 
                      ...prev, 
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={customization.duration}
                      onChange={(e) => setCustomization(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., 2 weeks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={customization.difficulty}
                      onChange={(e) => setCustomization(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={customization.category}
                    onChange={(e) => setCustomization(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile">Mobile</option>
                    <option value="ai-ml">AI/ML</option>
                    <option value="devops">DevOps</option>
                    <option value="design">Design</option>
                    <option value="learning">Learning</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Preview</h3>
            <div className="text-sm text-gray-600">
              <p><strong>Title:</strong> {customization.projectName || templates.find(t => t.id === selectedTemplate)?.name} Project</p>
              <p><strong>Technologies:</strong> {customization.technologies.join(', ') || 'None specified'}</p>
              <p><strong>Duration:</strong> {customization.duration || 'Not specified'}</p>
              <p><strong>Difficulty:</strong> {customization.difficulty}</p>
              <p><strong>Category:</strong> {customization.category}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyTemplate}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
              <Icon name="Zap" size={18} />
              Apply Template
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogTemplateGenerator;
