import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MagicBento from '../../components/MagicBento';
import RichTextEditor from '../../components/admin/RichTextEditor';
import AdvancedBlogEditor from '../../components/admin/AdvancedBlogEditor';
import { useContent } from '../../contexts/ContentContext';

const SecretAdminProjectEditor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingBlogPost, setEditingBlogPost] = useState(null);
  const [editingPage, setEditingPage] = useState(null);
  const [showAdvancedBlogEditor, setShowAdvancedBlogEditor] = useState(false);
  const [advancedBlogPost, setAdvancedBlogPost] = useState(null);

  const {
    content,
    addProject,
    updateProject,
    deleteProject,
    updateSkillCategory,
    addSkillToCategory,
    updateSkillInCategory,
    deleteSkillFromCategory,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updatePageContent,
    updateNavigation,
    updateSiteSettings,
    exportContent,
    importContent,
    resetContent
  } = useContent();

  const SECRET_PASSWORD = "admin123";

  // Project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    category: 'Technical',
    status: 'in-progress',
    featured: false,
    image: '',
    demoUrl: '',
    githubUrl: '',
    content: '',
    learningNote: ''
  });

  // Skill form state
  const [newSkill, setNewSkill] = useState({
    category: 'Frontend',
    name: '',
    level: 50,
    experience: '',
    projects: 0,
    learning: ''
  });

  // Blog post form state
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    tags: '',
    category: 'Technology',
    status: 'draft',
    featured: false
  });

  // Page editing state
  const [pageEdits, setPageEdits] = useState({});

  const handleLogin = (e) => {
    e?.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setPassword('');
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const timeout = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Project functions
  const handleCreateProject = () => {
    const project = {
      ...newProject,
      tech: newProject?.tech?.split(',')?.map(t => t?.trim())?.filter(t => t),
      metrics: { stars: 0, forks: 0, views: 0 }
    };
    addProject(project);
    setNewProject({
      title: '',
      description: '',
      tech: '',
      category: 'Technical',
      status: 'in-progress',
      featured: false,
      image: '',
      demoUrl: '',
      githubUrl: '',
      content: '',
      learningNote: ''
    });
    setActiveTab('projects');
  };

  const handleEditProject = (project) => {
    setEditingProject({
      ...project,
      tech: project?.tech?.join(', ')
    });
  };

  const handleUpdateProject = () => {
    const updatedProject = {
      ...editingProject,
      tech: editingProject?.tech?.split(',')?.map(t => t?.trim())?.filter(t => t)
    };
    updateProject(editingProject?.id, updatedProject);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  // Skills functions
  const handleCreateSkill = () => {
    addSkillToCategory(newSkill?.category, {
      name: newSkill?.name,
      level: newSkill?.level,
      experience: newSkill?.experience,
      projects: newSkill?.projects,
      learning: newSkill?.learning
    });
    setNewSkill({
      category: 'Frontend',
      name: '',
      level: 50,
      experience: '',
      projects: 0,
      learning: ''
    });
  };

  const handleUpdateSkill = (categoryName, skillIndex, updates) => {
    updateSkillInCategory(categoryName, skillIndex, updates);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (categoryName, skillIndex) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteSkillFromCategory(categoryName, skillIndex);
    }
  };

  // Blog functions
  const handleCreateBlogPost = () => {
    const post = {
      ...newBlogPost,
      tags: newBlogPost?.tags?.split(',')?.map(t => t?.trim())?.filter(t => t),
      author: "Sreyas",
      readTime: Math.ceil(newBlogPost?.content?.length / 1000) || 1
    };
    addBlogPost(post);
    setNewBlogPost({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      tags: '',
      category: 'Technology',
      status: 'draft',
      featured: false
    });
    setActiveTab('blog');
  };

  const handleUpdateBlogPost = () => {
    const updatedPost = {
      ...editingBlogPost,
      tags: editingBlogPost?.tags?.split(',')?.map(t => t?.trim())?.filter(t => t),
      readTime: Math.ceil(editingBlogPost?.content?.length / 1000) || 1
    };
    updateBlogPost(editingBlogPost?.id, updatedPost);
    setEditingBlogPost(null);
  };

  const handleDeleteBlogPost = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
    }
  };

  // Advanced blog editor functions
  const handleCreateAdvancedBlog = () => {
    setAdvancedBlogPost(null);
    setShowAdvancedBlogEditor(true);
  };

  const handleEditAdvancedBlog = (post) => {
    setAdvancedBlogPost(post);
    setShowAdvancedBlogEditor(true);
  };

  const handleSaveAdvancedBlog = (blogData) => {
    if (advancedBlogPost) {
      updateBlogPost(advancedBlogPost.id, blogData);
    } else {
      addBlogPost(blogData);
    }
    setShowAdvancedBlogEditor(false);
    setAdvancedBlogPost(null);
  };

  const handleCancelAdvancedBlog = () => {
    setShowAdvancedBlogEditor(false);
    setAdvancedBlogPost(null);
  };

  // Page functions
  const handleUpdatePageContent = (pageName) => {
    updatePageContent(pageName, pageEdits?.[pageName] || {});
    setPageEdits(prev => ({ ...prev, [pageName]: {} }));
    setEditingPage(null);
  };

  const handlePageEditChange = (pageName, field, value) => {
    setPageEdits(prev => ({
      ...prev,
      [pageName]: {
        ...prev?.[pageName],
        [field]: value
      }
    }));
  };

  // Data management functions
  const handleExportData = () => {
    const dataStr = exportContent();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `portfolio-backup-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  const handleImportData = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = importContent(e?.target?.result);
        if (result) {
          alert('Content imported successfully!');
          window.location?.reload();
        } else {
          alert('Failed to import content. Please check the file format.');
        }
      };
      reader?.readAsText(file);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetContent();
      alert('All data has been reset to defaults.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20"
        >
          <div className="text-center mb-6">
            <Icon name="Lock" size={48} color="#8b5cf6" className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Admin Access Required</h2>
            <p className="text-gray-300">Enter password to access the CMS dashboard</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-3 font-semibold"
            >
              Access CMS Dashboard
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Settings" size={24} color="#8b5cf6" />
              <h1 className="text-xl font-bold text-gray-900">Portfolio CMS</h1>
              <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                Complete Content Management System
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Session Active</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 flex-wrap">
            {[
              { id: 'projects', label: 'Projects', icon: 'FolderOpen', count: content?.projects?.length },
              { id: 'skills', label: 'Skills', icon: 'Target', count: Object.values(content?.skills || {})?.reduce((acc, cat) => acc + cat?.skills?.length, 0) },
              { id: 'blog', label: 'Blog', icon: 'BookOpen', count: content?.blogPosts?.length },
              { id: 'pages', label: 'Pages', icon: 'Layout', count: Object.keys(content?.pages || {})?.length },
              { id: 'navigation', label: 'Navigation', icon: 'Menu' },
              { id: 'settings', label: 'Settings', icon: 'Settings' }
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab?.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                {tab?.label}
                {tab?.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab?.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Management */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
                <p className="text-gray-600">Manage your projects - changes automatically sync to Home and Projects pages</p>
              </div>
              <Button
                onClick={() => setActiveTab('create-project')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl"
              >
                <Icon name="Plus" size={18} />
                Add Project
              </Button>
            </div>

            <div className="relative">
              <MagicBento
                enableSpotlight={true}
                enableStars={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={true}
                glowColor="132, 0, 255"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.projects?.map((project) => (
                <motion.div
                  key={project?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{project?.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project?.description}</p>
                    </div>
                    {project?.featured && (
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project?.tech?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      project?.status === 'completed' 
                        ? 'bg-green-100 text-green-700'
                        : project?.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {project?.status?.replace('-', ' ')}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project?.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Create Project */}
        {activeTab === 'create-project' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProject?.title}
                    onChange={(e) => setNewProject({...newProject, title: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="Amazing Project Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newProject?.description}
                    onChange={(e) => setNewProject({...newProject, description: e?.target?.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white/60 backdrop-blur-sm"
                    placeholder="Brief description of what this project does..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProject?.tech}
                    onChange={(e) => setNewProject({...newProject, tech: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="React, Node.js, MongoDB, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newProject?.category}
                      onChange={(e) => setNewProject({...newProject, category: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Creative">Creative</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newProject?.status}
                      onChange={(e) => setNewProject({...newProject, status: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Image URL
                  </label>
                  <input
                    type="url"
                    value={newProject?.image}
                    onChange={(e) => setNewProject({...newProject, image: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Demo URL
                    </label>
                    <input
                      type="url"
                      value={newProject?.demoUrl}
                      onChange={(e) => setNewProject({...newProject, demoUrl: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                      placeholder="/project-page or https://demo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={newProject?.githubUrl}
                      onChange={(e) => setNewProject({...newProject, githubUrl: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Note
                  </label>
                  <input
                    type="text"
                    value={newProject?.learningNote}
                    onChange={(e) => setNewProject({...newProject, learningNote: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="What did you learn from this project?"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProject?.featured}
                    onChange={(e) => setNewProject({...newProject, featured: e?.target?.checked})}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Feature this project on homepage
                  </label>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Content
                  </label>
                  <RichTextEditor
                    value={newProject?.content}
                    onChange={(value) => setNewProject({...newProject, content: value})}
                    placeholder="## Project Overview

Detailed information about your project...

### Key Features
- Feature 1
- Feature 2

### Challenges & Solutions
Describe what you learned..."
                    minHeight={300}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleCreateProject}
                    disabled={!newProject?.title || !newProject?.description}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl flex-1 py-3 disabled:opacity-50"
                  >
                    <Icon name="Plus" size={18} />
                    Create Project
                  </Button>
                  <Button
                    onClick={() => setActiveTab('projects')}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Edit Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Project: {editingProject?.title}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={editingProject?.title}
                      onChange={(e) => setEditingProject({...editingProject, title: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={editingProject?.description}
                      onChange={(e) => setEditingProject({...editingProject, description: e?.target?.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technologies
                    </label>
                    <input
                      type="text"
                      value={editingProject?.tech}
                      onChange={(e) => setEditingProject({...editingProject, tech: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={editingProject?.category}
                        onChange={(e) => setEditingProject({...editingProject, category: e?.target?.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Technical">Technical</option>
                        <option value="Creative">Creative</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Design">Design</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={editingProject?.status}
                        onChange={(e) => setEditingProject({...editingProject, status: e?.target?.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="planning">Planning</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={editingProject?.image}
                      onChange={(e) => setEditingProject({...editingProject, image: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Demo URL
                      </label>
                      <input
                        type="url"
                        value={editingProject?.demoUrl}
                        onChange={(e) => setEditingProject({...editingProject, demoUrl: e?.target?.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={editingProject?.githubUrl}
                        onChange={(e) => setEditingProject({...editingProject, githubUrl: e?.target?.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Note
                    </label>
                    <input
                      type="text"
                      value={editingProject?.learningNote}
                      onChange={(e) => setEditingProject({...editingProject, learningNote: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="editFeatured"
                      checked={editingProject?.featured}
                      onChange={(e) => setEditingProject({...editingProject, featured: e?.target?.checked})}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="editFeatured" className="text-sm font-medium text-gray-700">
                      Feature this project on homepage
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Content
                  </label>
                  <RichTextEditor
                    value={editingProject?.content}
                    onChange={(value) => setEditingProject({...editingProject, content: value})}
                    minHeight={400}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handleUpdateProject}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl flex-1 py-3"
                >
                  <Icon name="Save" size={18} />
                  Update Project
                </Button>
                <Button
                  onClick={() => setEditingProject(null)}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Skills Management */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Skills Management</h2>
                <p className="text-gray-600">Manage your skills - changes automatically sync to Home and Skills pages</p>
              </div>
              <Button
                onClick={() => setActiveTab('create-skill')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
              >
                <Icon name="Plus" size={18} />
                Add Skill
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(content?.skills || {})?.map(([categoryName, categoryData]) => (
                <div key={categoryName} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${categoryData?.color || 'blue'}-100`}>
                      <Icon name={categoryData?.icon || 'Settings'} size={20} color={`#${categoryData?.color || 'blue'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{categoryName}</h3>
                      <p className="text-sm text-gray-600">{categoryData?.skills?.length || 0} skills</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {categoryData?.skills?.map((skill, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{skill?.name}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingSkill({ categoryName, skillIndex: index, ...skill })}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Icon name="Edit" size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(categoryName, index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Icon name="Trash2" size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 rounded-full bg-${categoryData?.color || 'blue'}-500`}
                            style={{ width: `${skill?.level || 0}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{skill?.experience}</span>
                          <span>{skill?.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Create Skill */}
        {activeTab === 'create-skill' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Skill</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newSkill?.category}
                  onChange={(e) => setNewSkill({...newSkill, category: e?.target?.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                >
                  {Object.keys(content?.skills || {})?.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={newSkill?.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e?.target?.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                  placeholder="e.g., React, Python, Blender"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level: {newSkill?.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill?.level}
                  onChange={(e) => setNewSkill({...newSkill, level: parseInt(e?.target?.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Duration
                </label>
                <input
                  type="text"
                  value={newSkill?.experience}
                  onChange={(e) => setNewSkill({...newSkill, experience: e?.target?.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                  placeholder="e.g., 6 months, 2 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Projects
                </label>
                <input
                  type="number"
                  min="0"
                  value={newSkill?.projects}
                  onChange={(e) => setNewSkill({...newSkill, projects: parseInt(e?.target?.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                  placeholder="Number of projects using this skill"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Note
                </label>
                <input
                  type="text"
                  value={newSkill?.learning}
                  onChange={(e) => setNewSkill({...newSkill, learning: e?.target?.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                  placeholder="Your thoughts or experience with this skill"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleCreateSkill}
                  disabled={!newSkill?.name}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl flex-1 py-3 disabled:opacity-50"
                >
                  <Icon name="Plus" size={18} />
                  Add Skill
                </Button>
                <Button
                  onClick={() => setActiveTab('skills')}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Edit Skill Modal */}
        {editingSkill && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Skill: {editingSkill?.name}</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={editingSkill?.name}
                    onChange={(e) => setEditingSkill({...editingSkill, name: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level: {editingSkill?.level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingSkill?.level}
                    onChange={(e) => setEditingSkill({...editingSkill, level: parseInt(e?.target?.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Duration
                  </label>
                  <input
                    type="text"
                    value={editingSkill?.experience}
                    onChange={(e) => setEditingSkill({...editingSkill, experience: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Projects
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingSkill?.projects}
                    onChange={(e) => setEditingSkill({...editingSkill, projects: parseInt(e?.target?.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Note
                  </label>
                  <input
                    type="text"
                    value={editingSkill?.learning}
                    onChange={(e) => setEditingSkill({...editingSkill, learning: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleUpdateSkill(editingSkill?.categoryName, editingSkill?.skillIndex, {
                      name: editingSkill?.name,
                      level: editingSkill?.level,
                      experience: editingSkill?.experience,
                      projects: editingSkill?.projects,
                      learning: editingSkill?.learning
                    })}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl flex-1 py-3"
                  >
                    <Icon name="Save" size={18} />
                    Update Skill
                  </Button>
                  <Button
                    onClick={() => setEditingSkill(null)}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Blog Management */}
        {activeTab === 'blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                <p className="text-gray-600">Manage your blog posts - changes automatically sync to Blog page and Home highlights</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateAdvancedBlog}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl"
                >
                  <Icon name="Zap" size={18} />
                  Advanced Editor
                </Button>
                <Button
                  onClick={() => setActiveTab('create-blog')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl"
                >
                  <Icon name="Plus" size={18} />
                  Simple Editor
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.blogPosts?.map((post) => (
                <motion.div
                  key={post?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40"
                >
                  {post?.featuredImage && (
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={post?.featuredImage} 
                        alt={post?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post?.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post?.excerpt}</p>
                    </div>
                    {post?.featured && (
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-medium ml-2">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post?.tags?.slice(0, 3)?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{post?.category}</span>
                    <span>{post?.readTime} min read</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      post?.status === 'published' ?'bg-green-100 text-green-700' :'bg-orange-100 text-orange-700'
                    }`}>
                      {post?.status}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAdvancedBlog(post)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Advanced Editor"
                      >
                        <Icon name="Zap" size={16} />
                      </button>
                      <button
                        onClick={() => setEditingBlogPost({
                          ...post,
                          tags: post?.tags?.join(', ')
                        })}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Simple Editor"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(post?.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Post"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Create Blog Post */}
        {activeTab === 'create-blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog Post</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    value={newBlogPost?.title}
                    onChange={(e) => setNewBlogPost({...newBlogPost, title: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="Your amazing blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content *
                  </label>
                  <RichTextEditor
                    value={newBlogPost?.content}
                    onChange={(value) => setNewBlogPost({...newBlogPost, content: value})}
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

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={newBlogPost?.excerpt}
                    onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e?.target?.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white/60 backdrop-blur-sm"
                    placeholder="Brief description of your post..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={newBlogPost?.featuredImage}
                    onChange={(e) => setNewBlogPost({...newBlogPost, featuredImage: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newBlogPost?.tags}
                    onChange={(e) => setNewBlogPost({...newBlogPost, tags: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                    placeholder="React, Tutorial, Web Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newBlogPost?.category}
                    onChange={(e) => setNewBlogPost({...newBlogPost, category: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Learning">Learning</option>
                    <option value="Project">Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newBlogPost?.status}
                    onChange={(e) => setNewBlogPost({...newBlogPost, status: e?.target?.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60 backdrop-blur-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="blogFeatured"
                    checked={newBlogPost?.featured}
                    onChange={(e) => setNewBlogPost({...newBlogPost, featured: e?.target?.checked})}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="blogFeatured" className="text-sm font-medium text-gray-700">
                    Feature this post
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleCreateBlogPost}
                    disabled={!newBlogPost?.title || !newBlogPost?.content}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl flex-1 py-3 disabled:opacity-50"
                  >
                    <Icon name="Plus" size={18} />
                    Create Post
                  </Button>
                  <Button
                    onClick={() => setActiveTab('blog')}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Edit Blog Post Modal */}
        {editingBlogPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog Post: {editingBlogPost?.title}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Post Title *
                    </label>
                    <input
                      type="text"
                      value={editingBlogPost?.title}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, title: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Post Content *
                    </label>
                    <RichTextEditor
                      value={editingBlogPost?.content}
                      onChange={(value) => setEditingBlogPost({...editingBlogPost, content: value})}
                      minHeight={400}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={editingBlogPost?.excerpt}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, excerpt: e?.target?.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={editingBlogPost?.featuredImage}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, featuredImage: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={editingBlogPost?.tags}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, tags: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={editingBlogPost?.category}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, category: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Learning">Learning</option>
                      <option value="Project">Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={editingBlogPost?.status}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, status: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="editBlogFeatured"
                      checked={editingBlogPost?.featured}
                      onChange={(e) => setEditingBlogPost({...editingBlogPost, featured: e?.target?.checked})}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="editBlogFeatured" className="text-sm font-medium text-gray-700">
                      Feature this post
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handleUpdateBlogPost}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl flex-1 py-3"
                >
                  <Icon name="Save" size={18} />
                  Update Post
                </Button>
                <Button
                  onClick={() => setEditingBlogPost(null)}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Pages Management */}
        {activeTab === 'pages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pages Management</h2>
              <p className="text-gray-600">Edit page content - changes automatically sync across all pages</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(content?.pages || {})?.map(([pageName, pageData]) => (
                <div key={pageName} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-100">
                      <Icon name="Layout" size={20} color="#6366f1" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 capitalize">{pageName} Page</h3>
                      <p className="text-sm text-gray-600">{Object.keys(pageData)?.length} sections</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {Object.keys(pageData)?.map(key => (
                      <div key={key} className="text-sm text-gray-600 capitalize">
                        • {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setEditingPage(pageName)}
                    className="w-full bg-indigo-600 text-white rounded-xl"
                  >
                    <Icon name="Edit" size={16} />
                    Edit Page
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Edit Page Modal */}
        {editingPage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit {editingPage} Page</h2>
              
              <div className="space-y-6">
                {Object.entries(content?.pages?.[editingPage] || {})?.map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </label>
                    {key === 'content' || key?.includes('Description') ? (
                      <RichTextEditor
                        value={pageEdits?.[editingPage]?.[key] ?? value}
                        onChange={(newValue) => handlePageEditChange(editingPage, key, newValue)}
                        minHeight={150}
                      />
                    ) : (
                      <input
                        type={key === 'email' ? 'email' : key?.includes('Url') ? 'url' : 'text'}
                        value={pageEdits?.[editingPage]?.[key] ?? value}
                        onChange={(e) => handlePageEditChange(editingPage, key, e?.target?.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleUpdatePageContent(editingPage)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex-1 py-3"
                  >
                    <Icon name="Save" size={18} />
                    Update Page
                  </Button>
                  <Button
                    onClick={() => setEditingPage(null)}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Navigation Management */}
        {activeTab === 'navigation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40 max-w-4xl mx-auto"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Navigation Management</h2>
              <p className="text-gray-600">Manage navigation links - changes automatically sync to header across all pages</p>
            </div>

            <div className="space-y-4">
              {content?.navigation?.map((item, index) => (
                <div key={item?.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                      <input
                        type="text"
                        value={item?.label}
                        onChange={(e) => {
                          const updated = content?.navigation?.map((nav, i) => 
                            i === index ? {...nav, label: e?.target?.value} : nav
                          );
                          updateNavigation(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Path</label>
                      <input
                        type="text"
                        value={item?.path}
                        onChange={(e) => {
                          const updated = content?.navigation?.map((nav, i) => 
                            i === index ? {...nav, path: e?.target?.value} : nav
                          );
                          updateNavigation(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item?.active}
                          onChange={(e) => {
                            const updated = content?.navigation?.map((nav, i) => 
                              i === index ? {...nav, active: e?.target?.checked} : nav
                            );
                            updateNavigation(updated);
                          }}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Active</span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const updated = content?.navigation?.filter((_, i) => i !== index);
                      updateNavigation(updated);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                const newNavItem = {
                  id: `nav-${Date.now()}`,
                  label: 'New Link',
                  path: '/new-page',
                  active: true
                };
                updateNavigation([...content?.navigation, newNavItem]);
              }}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-3"
            >
              <Icon name="Plus" size={18} />
              Add Navigation Link
            </Button>
          </motion.div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">CMS Settings</h2>
              <p className="text-gray-600">Manage global site settings and data operations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Site Settings */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Site Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={content?.siteSettings?.siteName}
                      onChange={(e) => updateSiteSettings({siteName: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={content?.siteSettings?.tagline}
                      onChange={(e) => updateSiteSettings({tagline: e?.target?.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={content?.siteSettings?.description}
                      onChange={(e) => updateSiteSettings({description: e?.target?.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white/60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <input
                        type="color"
                        value={content?.siteSettings?.primaryColor}
                        onChange={(e) => updateSiteSettings({primaryColor: e?.target?.value})}
                        className="w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <input
                        type="color"
                        value={content?.siteSettings?.accentColor}
                        onChange={(e) => updateSiteSettings({accentColor: e?.target?.value})}
                        className="w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Data Management</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Export Data</h4>
                    <p className="text-blue-700 text-sm mb-3">
                      Download a backup of all your content including projects, skills, blog posts, and settings.
                    </p>
                    <Button
                      onClick={handleExportData}
                      className="bg-blue-600 text-white rounded-lg w-full"
                    >
                      <Icon name="Download" size={16} />
                      Export All Data
                    </Button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Import Data</h4>
                    <p className="text-green-700 text-sm mb-3">
                      Upload a previously exported backup file to restore your content.
                    </p>
                    <label className="block">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                      <Button
                        as="span"
                        className="bg-green-600 text-white rounded-lg w-full cursor-pointer"
                      >
                        <Icon name="Upload" size={16} />
                        Import Data File
                      </Button>
                    </label>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold text-red-900 mb-2">Reset Data</h4>
                    <p className="text-red-700 text-sm mb-3">
                      Reset all content to default values. This action cannot be undone.
                    </p>
                    <Button
                      onClick={handleResetData}
                      className="bg-red-600 text-white rounded-lg w-full"
                    >
                      <Icon name="RotateCcw" size={16} />
                      Reset to Defaults
                    </Button>
                  </div>

                  {/* Statistics */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Content Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projects:</span>
                        <span className="font-medium">{content?.projects?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Skills:</span>
                        <span className="font-medium">
                          {Object.values(content?.skills || {})?.reduce((acc, cat) => acc + (cat?.skills?.length || 0), 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blog Posts:</span>
                        <span className="font-medium">{content?.blogPosts?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pages:</span>
                        <span className="font-medium">{Object.keys(content?.pages || {})?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Advanced Blog Editor Modal */}
        {showAdvancedBlogEditor && (
          <AdvancedBlogEditor
            blogPost={advancedBlogPost}
            onSave={handleSaveAdvancedBlog}
            onCancel={handleCancelAdvancedBlog}
            isEditing={!!advancedBlogPost}
          />
        )}
      </div>
    </div>
  );
};

export default SecretAdminProjectEditor;