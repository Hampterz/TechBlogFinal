import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';

// MagicBento card component for interactive effects
const MagicCard = ({ children, className = '', enableEffects = true }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (!enableEffects || !cardRef?.current) return;

    const element = cardRef?.current;

    const handleMouseMove = (e) => {
      const rect = element?.getBoundingClientRect();
      const x = e?.clientX - rect?.left;
      const y = e?.clientY - rect?.top;
      const centerX = rect?.width / 2;
      const centerY = rect?.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap?.to(element, {
        rotateX,
        rotateY,
        duration: 0.2,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      gsap?.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    element?.addEventListener('mousemove', handleMouseMove);
    element?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element?.removeEventListener('mousemove', handleMouseMove);
      element?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableEffects]);

  return (
    <div
      ref={cardRef}
      className={`${className} transition-all duration-300 hover:shadow-lg`}
    >
      {children}
    </div>
  );
};

const AdminProjectManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Raspberry Pi NAS Server',
      description: 'Building a home network attached storage solution using Raspberry Pi 4',
      status: 'completed',
      category: 'Hardware',
      tags: ['Raspberry Pi', 'Linux', 'Storage', 'Networking'],
      dateCreated: '2024-03-15',
      lastUpdated: '2024-09-15',
      visibility: 'public',
      featured: true,
      progress: 100
    }
  ]);

  const [skills, setSkills] = useState({
    'Frontend': [
      { name: 'HTML/CSS', level: 30 },
      { name: 'JavaScript', level: 25 },
      { name: 'React', level: 20 }
    ],
    'Backend': [
      { name: 'Python', level: 35 },
      { name: 'Node.js', level: 15 },
      { name: 'Databases', level: 10 }
    ],
    'Hardware': [
      { name: 'Raspberry Pi', level: 85 },
      { name: 'Arduino', level: 25 },
      { name: 'Electronics', level: 85 }
    ],
    'Tools': [
      { name: 'Git', level: 30 },
      { name: 'Linux', level: 35 },
      { name: 'VS Code', level: 45 }
    ],
    'Creative': [
      { name: 'Blender 3D', level: 40 },
      { name: '3D Modeling', level: 35 },
      { name: 'Animation', level: 30 }
    ]
  });

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Hardware',
    tags: '',
    status: 'in-progress',
    visibility: 'public',
    featured: false
  });

  const tabs = [
    { id: 'projects', label: 'Projects', icon: 'Code2' },
    { id: 'skills', label: 'Skills Matrix', icon: 'Target' },
    { id: 'content', label: 'Content Hub', icon: 'BookOpen' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveProject = () => {
    const newProject = {
      id: editingProject ? editingProject?.id : Date.now(),
      ...formData,
      tags: formData?.tags?.split(',')?.map(tag => tag?.trim()),
      dateCreated: editingProject ? editingProject?.dateCreated : new Date()?.toISOString()?.split('T')?.[0],
      lastUpdated: new Date()?.toISOString()?.split('T')?.[0],
      progress: formData?.status === 'completed' ? 100 : Math.floor(Math.random() * 80) + 20
    };

    if (editingProject) {
      setProjects(prev => prev?.map(p => p?.id === editingProject?.id ? newProject : p));
    } else {
      setProjects(prev => [...prev, newProject]);
    }

    setShowProjectModal(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      category: 'Hardware',
      tags: '',
      status: 'in-progress',
      visibility: 'public',
      featured: false
    });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project?.title,
      description: project?.description,
      category: project?.category,
      tags: project?.tags?.join(', '),
      status: project?.status,
      visibility: project?.visibility,
      featured: project?.featured
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev?.filter(p => p?.id !== projectId));
    }
  };

  const updateSkillLevel = (category, skillName, newLevel) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev?.[category]?.map(skill =>
        skill?.name === skillName ? { ...skill, level: newLevel } : skill
      )
    }));
  };

  useEffect(() => {
    document.title = "Admin Dashboard - My Tech Blog";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage your projects, skills, and content</p>
        </motion.div>

        {/* Navigation Tabs */}
        <MagicCard className="bg-white rounded-2xl p-6 mb-8 border border-slate-200">
          <div className="flex flex-wrap gap-2">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab?.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                {tab?.label}
              </button>
            ))}
          </div>
        </MagicCard>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Project Management</h2>
              <Button
                onClick={() => setShowProjectModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                iconName="Plus"
                iconPosition="left"
              >
                Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project) => (
                <MagicCard key={project?.id} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project?.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : project?.status === 'in-progress' ?'bg-blue-100 text-blue-800' :'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project?.status}
                      </span>
                      {project?.featured && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-1 text-slate-400 hover:text-blue-500"
                      >
                        <Icon name="Edit2" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project?.id)}
                        className="p-1 text-slate-400 hover:text-red-500"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{project?.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{project?.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Updated {project?.lastUpdated}</span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      {project?.visibility}
                    </span>
                  </div>
                </MagicCard>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Skills Matrix Management</h2>
            
            {Object.entries(skills)?.map(([category, skillList]) => (
              <MagicCard key={category} className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{category}</h3>
                
                <div className="space-y-4">
                  {skillList?.map((skill) => (
                    <div key={skill?.name} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-slate-900">{skill?.name}</span>
                          <span className="text-slate-600">{skill?.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill?.level}%` }}
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill?.level}
                        onChange={(e) => updateSkillLevel(category, skill?.name, parseInt(e?.target?.value))}
                        className="w-24"
                      />
                    </div>
                  ))}
                </div>
              </MagicCard>
            ))}
          </div>
        )}

        {/* Content Hub Tab */}
        {activeTab === 'content' && (
          <MagicCard className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Content Hub Management</h2>
            <p className="text-slate-600 mb-6">Manage blog posts, tutorials, and learning resources.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-xl">
                <Icon name="FileText" size={48} color="#64748b" className="mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Blog Posts</h3>
                <p className="text-slate-600 text-sm mb-4">Create and manage blog entries</p>
                <Button variant="outline" size="sm">Coming Soon</Button>
              </div>
              
              <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-xl">
                <Icon name="BookOpen" size={48} color="#64748b" className="mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Tutorials</h3>
                <p className="text-slate-600 text-sm mb-4">Write step-by-step guides</p>
                <Button variant="outline" size="sm">Coming Soon</Button>
              </div>
              
              <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-xl">
                <Icon name="Image" size={48} color="#64748b" className="mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Media Library</h3>
                <p className="text-slate-600 text-sm mb-4">Manage images and files</p>
                <Button variant="outline" size="sm">Coming Soon</Button>
              </div>
            </div>
          </MagicCard>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <MagicCard className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Analytics Overview</h2>
            <p className="text-slate-600 mb-6">Real visitor insights and engagement metrics.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={24} color="#2563eb" />
                  <div>
                    <p className="text-blue-600 font-medium">Visitors</p>
                    <p className="text-2xl font-bold text-blue-900">Real Data</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <Icon name="Eye" size={24} color="#059669" />
                  <div>
                    <p className="text-green-600 font-medium">Page Views</p>
                    <p className="text-2xl font-bold text-green-900">Authentic</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={24} color="#7c3aed" />
                  <div>
                    <p className="text-purple-600 font-medium">Avg. Session</p>
                    <p className="text-2xl font-bold text-purple-900">No Fakes</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3">
                  <Icon name="TrendingUp" size={24} color="#ea580c" />
                  <div>
                    <p className="text-orange-600 font-medium">Bounce Rate</p>
                    <p className="text-2xl font-bold text-orange-900">Real Only</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-xl">
              <p className="text-slate-600 text-center">
                📊 Analytics integration will show real visitor data once connected to your preferred analytics service.
              </p>
            </div>
          </MagicCard>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Site Settings</h2>
            
            <MagicCard className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h3>
              <div className="space-y-4">
                <Input label="Display Name" value="Student" />
                <Input label="Email" value="sreyas.rosh@gmail.com" />
                <Input label="GitHub Username" value="Hampterz" />
                <Input label="LinkedIn Profile" value="sreyas-rosh-58750a239" />
              </div>
            </MagicCard>

            <MagicCard className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Site Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Public Portfolio</p>
                    <p className="text-sm text-slate-600">Allow public access to your portfolio</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Contact Form</p>
                    <p className="text-sm text-slate-600">Enable contact form on the website</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">Show Learning Journey</p>
                    <p className="text-sm text-slate-600">Display skills progress publicly</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </MagicCard>
          </div>
        )}
      </div>
      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Project Title"
                name="title"
                value={formData?.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your project..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData?.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Web">Web Development</option>
                  <option value="Mobile">Mobile</option>
                  <option value="3D/Animation">3D/Animation</option>
                </select>
              </div>

              <Input
                label="Tags (comma separated)"
                name="tags"
                value={formData?.tags}
                onChange={handleInputChange}
                placeholder="React, JavaScript, Node.js"
              />

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData?.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData?.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-900">Featured Project</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData?.visibility === 'public'}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm font-medium text-slate-900">Public</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={formData?.visibility === 'private'}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm font-medium text-slate-900">Private</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowProjectModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProject}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectManagementDashboard;