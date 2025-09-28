import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  // Default content structure
  const defaultContent = {
    projects: [
      {
        id: 1,
        title: "Raspberry Pi 5 NAS Server",
        description: "Complete network storage solution with web interface",
        tech: ["Python", "Linux", "Docker"],
        category: "Hardware",
        status: "completed",
        featured: true,
        image: "/assets/images/rasberrypimage.png?v=2",
        demoUrl: "/project-deep-dive-raspberry-pi-nas-case-study",
        githubUrl: "https://github.com",
        content: "Detailed project content here...",
        learningNote: "This project taught me so much about Linux systems and networking!",
        metrics: { stars: 5, forks: 2, views: 120 },
        createdAt: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      }
    ],
    skills: {
      Frontend: {
        icon: 'Monitor',
        color: 'blue',
        skills: [
          { name: 'HTML/CSS', level: 30, experience: '6 months', projects: 1, learning: 'Still figuring out flexbox!' },
          { name: 'JavaScript', level: 25, experience: '4 months', projects: 1, learning: 'Async/await is confusing but cool' },
          { name: 'React', level: 20, experience: '2 months', projects: 1, learning: 'Hooks are starting to make sense' }
        ]
      },
      Backend: {
        icon: 'Server',
        color: 'emerald',
        skills: [
          { name: 'Python', level: 35, experience: '8 months', projects: 1, learning: 'My favorite language so far!' },
          { name: 'Node.js', level: 15, experience: '1 month', projects: 0, learning: 'Just started learning this' },
          { name: 'Databases', level: 10, experience: '3 weeks', projects: 0, learning: 'SQL is like learning a new language' }
        ]
      },
      Hardware: {
        icon: 'Cpu',
        color: 'orange',
        skills: [
          { name: 'Raspberry Pi 5', level: 85, experience: '1 year', projects: 1, learning: 'My NAS project taught me a lot!' },
          { name: 'Arduino', level: 25, experience: '6 months', projects: 0, learning: 'Want to build an IoT project next' },
          { name: 'Electronics', level: 85, experience: '8 months', projects: 1, learning: 'Getting more confident with components' }
        ]
      },
      Tools: {
        icon: 'Settings',
        color: 'purple',
        skills: [
          { name: 'Git', level: 30, experience: '5 months', projects: 1, learning: 'Merge conflicts are my nemesis' },
          { name: 'Linux', level: 35, experience: '1 year', projects: 1, learning: 'Terminal commands are getting easier' },
          { name: 'VS Code', level: 45, experience: '1 year', projects: 1, learning: 'Love all the extensions!' }
        ]
      },
      'Design/Blender': {
        icon: 'Palette',
        color: 'pink',
        skills: [
          { name: 'Blender 3D', level: 75, experience: '8 months', projects: 2, learning: 'Animation is so satisfying to create!' },
          { name: '3D Modeling', level: 50, experience: '6 months', projects: 2, learning: 'Getting better at topology' },
          { name: 'Animation', level: 75, experience: '4 months', projects: 1, learning: 'Bringing models to life is amazing' }
        ]
      }
    },
    blogPosts: [
      {
        id: 1,
        title: "Building My First Raspberry Pi 5 NAS: A Learning Journey",
        content: `# Building My First Raspberry Pi NAS: A Learning Journey

Building a NAS (Network Attached Storage) server has been one of my most rewarding learning experiences. Here's how I did it and what I learned along the way.## The ChallengeI needed a reliable way to store and access my files across multiple devices, but commercial NAS solutions were expensive and didn't offer the learning opportunity I wanted.

## My Solution
Using a Raspberry Pi 5, I built a custom NAS server that handles file storage, media streaming, and automated backups.

### Key Technologies Used:
- **Raspberry Pi 5** - The heart of the system
- **Docker** - For containerized services
- **Samba** - For file sharing protocols
- **Nextcloud** - For cloud-like functionality

## What I Learned
1. **Linux Administration** - Managing users, permissions, and services
2. **Network Configuration** - Setting up static IPs and port forwarding
3. **Docker Management** - Creating and managing containers
4. **System Monitoring** - Keeping track of performance and health

This project taught me more about practical systems administration than any tutorial could. The best way to learn is by building!`,
        excerpt: "My journey building a custom NAS server with Raspberry Pi 5, Docker, and lots of learning along the way.",
        featuredImage: "/assets/images/rasberrypimage.png?v=2",
        tags: ["Raspberry Pi 5", "NAS", "Docker", "Linux", "Learning"],
        category: "Hardware Projects",
        status: "published",
        featured: true,
        author: "Sreyas",
        publishDate: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString(),
        readTime: 5
      }
    ],
    pages: {
      home: {
        heroTitle: "Hi, I'm Sreyas 👋",
        heroSubtitle: "High School Student & Aspiring Tech Enthusiast",
        heroDescription: "I'm passionate about technology and love building things that solve real problems. Currently exploring the world of software development, hardware projects, and everything in between during my journey through high school.",
        projectsTitle: "My Learning Project",
        projectsDescription: "Here\'s the main project I\'ve been working on during my studies. It\'s been an amazing learning experience and I\'m excited to share what I\'ve discovered!",
        skillsTitle: "My Learning Journey",
        skillsDescription: "I'm still learning and growing! Here's an honest look at where I am with different technologies. Every day is a chance to get a little bit better! 📚"
      },
      about: {
        title: "About Me",
        content: "I\'m a passionate high school student with a love for technology and problem-solving...",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      },
      contact: {
        title: "Get In Touch",
        description: "I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hello.",
        email: "hello@sreyas.dev",
        social: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com"
        }
      }
    },
    navigation: [
      { id: 'home', label: 'Home', path: '/', active: true },
      { id: 'projects', label: 'Projects', path: '/project-deep-dive-raspberry-pi-nas-case-study', active: true },
      { id: 'skills', label: 'Skills', path: '/interactive-skills-matrix', active: true },
      { id: 'blog', label: 'Blog', path: '/technical-knowledge-hub', active: true },
      { id: 'contact', label: 'Contact', path: '#contact', active: true }
    ],
    siteSettings: {
      siteName: "Sreyas Portfolio",
      tagline: "Computer Science Student & Tech Enthusiast",
      description: "Portfolio of Sreyas - Computer Science student passionate about technology, programming, and building innovative solutions.",
      primaryColor: "#8b5cf6",
      accentColor: "#06b6d4"
    }
  };

  // Load content from localStorage or use defaults
  const [content, setContent] = useState(() => {
    try {
      // Clear old cached content to force refresh
      localStorage.removeItem('portfolio-content');
      const savedContent = localStorage.getItem('portfolio-content');
      return savedContent ? { ...defaultContent, ...JSON.parse(savedContent) } : defaultContent;
    } catch (error) {
      console.error('Error loading saved content:', error);
      return defaultContent;
    }
  });

  // Save content to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-content', JSON.stringify(content));
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [content]);

  // Project management functions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };
    setContent(prev => ({
      ...prev,
      projects: [...(prev?.projects || []), newProject]
    }));
    return newProject;
  };

  const updateProject = (id, updates) => {
    setContent(prev => ({
      ...prev,
      projects: (prev?.projects || [])?.map(project =>
        project?.id === id ? { ...project, ...updates, updatedAt: new Date()?.toISOString() } : project
      )
    }));
  };

  const deleteProject = (id) => {
    setContent(prev => ({
      ...prev,
      projects: (prev?.projects || [])?.filter(project => project?.id !== id)
    }));
  };

  const reorderProjects = (reorderedProjects) => {
    setContent(prev => ({
      ...prev,
      projects: reorderedProjects
    }));
  };

  // Skills management functions
  const updateSkillCategory = (categoryName, categoryData) => {
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev?.skills,
        [categoryName]: categoryData
      }
    }));
  };

  const addSkillToCategory = (categoryName, skill) => {
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev?.skills,
        [categoryName]: {
          ...prev?.skills?.[categoryName],
          skills: [...(prev?.skills?.[categoryName]?.skills || []), skill]
        }
      }
    }));
  };

  const updateSkillInCategory = (categoryName, skillIndex, updates) => {
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev?.skills,
        [categoryName]: {
          ...prev?.skills?.[categoryName],
          skills: (prev?.skills?.[categoryName]?.skills || [])?.map((skill, index) =>
            index === skillIndex ? { ...skill, ...updates } : skill
          )
        }
      }
    }));
  };

  const deleteSkillFromCategory = (categoryName, skillIndex) => {
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev?.skills,
        [categoryName]: {
          ...prev?.skills?.[categoryName],
          skills: (prev?.skills?.[categoryName]?.skills || [])?.filter((_, index) => index !== skillIndex)
        }
      }
    }));
  };

  // Blog management functions
  const addBlogPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      publishDate: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };
    setContent(prev => ({
      ...prev,
      blogPosts: [...(prev?.blogPosts || []), newPost]
    }));
    return newPost;
  };

  const updateBlogPost = (id, updates) => {
    setContent(prev => ({
      ...prev,
      blogPosts: (prev?.blogPosts || [])?.map(post =>
        post?.id === id ? { ...post, ...updates, updatedAt: new Date()?.toISOString() } : post
      )
    }));
  };

  const deleteBlogPost = (id) => {
    setContent(prev => ({
      ...prev,
      blogPosts: (prev?.blogPosts || [])?.filter(post => post?.id !== id)
    }));
  };

  // Page content management functions
  const updatePageContent = (pageName, updates) => {
    setContent(prev => ({
      ...prev,
      pages: {
        ...prev?.pages,
        [pageName]: {
          ...prev?.pages?.[pageName],
          ...updates
        }
      }
    }));
  };

  // Navigation management functions
  const updateNavigation = (navigation) => {
    setContent(prev => ({
      ...prev,
      navigation
    }));
  };

  // Site settings management functions
  const updateSiteSettings = (settings) => {
    setContent(prev => ({
      ...prev,
      siteSettings: {
        ...prev?.siteSettings,
        ...settings
      }
    }));
  };

  // Reset all content to defaults
  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('portfolio-content');
  };

  // Export/Import functions
  const exportContent = () => {
    return JSON.stringify(content, null, 2);
  };

  const importContent = (contentJson) => {
    try {
      const importedContent = JSON.parse(contentJson);
      setContent({ ...defaultContent, ...importedContent });
      return true;
    } catch (error) {
      console.error('Error importing content:', error);
      return false;
    }
  };

  const contextValue = {
    // Content state
    content,
    
    // Project functions
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    
    // Skills functions
    updateSkillCategory,
    addSkillToCategory,
    updateSkillInCategory,
    deleteSkillFromCategory,
    
    // Blog functions
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    
    // Page functions
    updatePageContent,
    
    // Navigation functions
    updateNavigation,
    
    // Settings functions
    updateSiteSettings,
    
    // Utility functions
    resetContent,
    exportContent,
    importContent
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};