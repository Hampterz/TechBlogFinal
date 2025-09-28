import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SkillCard from './components/SkillCard';
import CategoryFilter from './components/CategoryFilter';
import SkillTimeline from './components/SkillTimeline';
import LearningPathSuggestions from './components/LearningPathSuggestions';
import SkillDetailModal from './components/SkillDetailModal';
import SkillsMatrix from './components/SkillsMatrix';
import Galaxy from '../../components/ui/Galaxy';

const InteractiveSkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'matrix'
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);

  // Real skills data based on actual project experience
  const skillsData = [
    // Frontend Development (from portfolio project) - ORANGE THEME
    {
      id: 1,
      name: 'React.js',
      category: 'Frontend',
      proficiency: 'Intermediate',
      percentage: 70,
      experience: '6 months',
      projectCount: 1,
      icon: 'Code2',
      color: 'orange',
      recentProjects: [
        'TechBlog Portfolio'
      ],
      learningTimeline: 'Learning through building this portfolio website'
    },
    {
      id: 2,
      name: 'JavaScript',
      category: 'Frontend',
      proficiency: 'Intermediate',
      percentage: 60,
      experience: '8 months',
      projectCount: 1,
      icon: 'Zap',
      color: 'orange',
      recentProjects: [
        'Portfolio Website'
      ],
      learningTimeline: 'Learning through web development projects'
    },
    {
      id: 3,
      name: 'HTML/CSS',
      category: 'Frontend',
      proficiency: 'Intermediate',
      percentage: 80,
      experience: '1 year',
      projectCount: 1,
      icon: 'Layout',
      color: 'orange',
      recentProjects: [
        'Portfolio Website'
      ],
      learningTimeline: 'Web development fundamentals'
    },
    {
      id: 4,
      name: 'Tailwind CSS',
      category: 'Frontend',
      proficiency: 'Intermediate',
      percentage: 60,
      experience: '6 months',
      projectCount: 1,
      icon: 'Palette',
      color: 'orange',
      recentProjects: [
        'Portfolio Styling'
      ],
      learningTimeline: 'Learning modern CSS framework'
    },

    // Backend Systems (from NAS project) - ORANGE THEME
    {
      id: 5,
      name: 'Python',
      category: 'Backend',
      proficiency: 'Intermediate',
      percentage: 70,
      experience: '1 year',
      projectCount: 1,
      icon: 'Code',
      color: 'orange',
      recentProjects: [
        'Raspberry Pi NAS Scripts'
      ],
      learningTimeline: 'Learning through automation and monitoring scripts'
    },

    // DevOps & Infrastructure (from NAS project) - ORANGE THEME
    {
      id: 6,
      name: 'Docker',
      category: 'DevOps',
      proficiency: 'Beginner',
      percentage: 50,
      experience: '3 months',
      projectCount: 1,
      icon: 'Package',
      color: 'orange',
      recentProjects: [
        'Raspberry Pi NAS'
      ],
      learningTimeline: 'Learning containerization basics'
    },
    {
      id: 7,
      name: 'Linux',
      category: 'DevOps',
      proficiency: 'Intermediate',
      percentage: 60,
      experience: '1 year',
      projectCount: 1,
      icon: 'Terminal',
      color: 'orange',
      recentProjects: [
        'Raspberry Pi NAS Administration'
      ],
      learningTimeline: 'Learning through Raspberry Pi projects and system administration'
    },
    {
      id: 8,
      name: 'Git',
      category: 'DevOps',
      proficiency: 'Intermediate',
      percentage: 60,
      experience: '8 months',
      projectCount: 2,
      icon: 'GitBranch',
      color: 'orange',
      recentProjects: [
        'Portfolio Version Control',
        'NAS Project Management'
      ],
      learningTimeline: 'Learning version control through projects'
    },

    // Hardware Integration (from NAS project) - LIGHT RED THEME
    {
      id: 9,
      name: 'Raspberry Pi',
      category: 'Hardware',
      proficiency: 'Advanced',
      percentage: 80,
      experience: '1 year',
      projectCount: 1,
      icon: 'Cpu',
      color: 'red',
      recentProjects: [
        'NAS Server Build'
      ],
      learningTimeline: 'Hands-on learning through NAS project'
    },
    {
      id: 10,
      name: 'Electronics',
      category: 'Hardware',
      proficiency: 'Intermediate',
      percentage: 70,
      experience: '8 months',
      projectCount: 1,
      icon: 'Zap',
      color: 'red',
      recentProjects: [
        'NAS Hardware Assembly'
      ],
      learningTimeline: 'Learning through hardware projects'
    },

    // 3D Design & Animation (from Blender experience) - BLUE THEME
    {
      id: 11,
      name: 'Blender 3D',
      category: 'Design',
      proficiency: 'Advanced',
      percentage: 80,
      experience: '8 months',
      projectCount: 2,
      icon: 'Palette',
      color: 'blue',
      recentProjects: [
        '3D Modeling Projects',
        'Animation Work'
      ],
      learningTimeline: 'Self-taught 3D modeling and animation'
    },
    {
      id: 12,
      name: '3D Modeling',
      category: 'Design',
      proficiency: 'Intermediate',
      percentage: 60,
      experience: '6 months',
      projectCount: 2,
      icon: 'Box',
      color: 'blue',
      recentProjects: [
        'Character Models',
        'Environment Design'
      ],
      learningTimeline: 'Learning 3D modeling fundamentals'
    },
    {
      id: 13,
      name: '3D Animation',
      category: 'Design',
      proficiency: 'Advanced',
      percentage: 75,
      experience: '4 months',
      projectCount: 1,
      icon: 'Play',
      color: 'blue',
      recentProjects: [
        'Character Animation'
      ],
      learningTimeline: 'Learning animation principles and techniques'
    },

    // System Administration (from NAS project) - ORANGE THEME
    {
      id: 14,
      name: 'Samba',
      category: 'System Admin',
      proficiency: 'Beginner',
      percentage: 40,
      experience: '3 months',
      projectCount: 1,
      icon: 'Share2',
      color: 'orange',
      recentProjects: [
        'File Sharing Setup'
      ],
      learningTimeline: 'Learning network file sharing protocols'
    },
    {
      id: 15,
      name: 'RAID Management',
      category: 'System Admin',
      proficiency: 'Intermediate',
      percentage: 65,
      experience: '3 months',
      projectCount: 1,
      icon: 'HardDrive',
      color: 'orange',
      recentProjects: [
        'RAID 1 Configuration'
      ],
      learningTimeline: 'Learning storage redundancy and management'
    },
    {
      id: 16,
      name: 'System Monitoring',
      category: 'System Admin',
      proficiency: 'Beginner',
      percentage: 50,
      experience: '2 months',
      projectCount: 1,
      icon: 'Activity',
      color: 'orange',
      recentProjects: [
        'NAS Performance Monitoring'
      ],
      learningTimeline: 'Learning system health monitoring'
    }
  ];

  // Real timeline data based on actual learning journey
  const timelineData = {
    2019: {
      skillsLearned: 0,
      skills: [],
      milestones: [
        'Started high school',
        'First exposure to technology'
      ]
    },
    2020: {
      skillsLearned: 0,
      skills: [],
      milestones: [
        'Remote learning period',
        'Increased computer usage'
      ]
    },
    2021: {
      skillsLearned: 0,
      skills: [],
      milestones: [
        'Explored different interests',
        'Discovered programming'
      ]
    },
    2022: {
      skillsLearned: 0,
      skills: [],
      milestones: [
        'Prepared for college',
        'Researching career paths'
      ]
    },
    2023: {
      skillsLearned: 4,
      skills: [
        { name: 'HTML/CSS', proficiency: 'Beginner', icon: 'Layout', context: 'Web Development Fundamentals' },
        { name: 'JavaScript', proficiency: 'Beginner', icon: 'Zap', context: 'Learning programming basics' },
        { name: 'Python', proficiency: 'Beginner', icon: 'Code', context: 'First programming language' },
        { name: 'Blender 3D', proficiency: 'Beginner', icon: 'Palette', context: '3D modeling exploration' }
      ],
      milestones: [
        'Started learning programming',
        'Discovered interest in 3D design',
        'Built first simple websites'
      ]
    },
    2024: {
      skillsLearned: 12,
      skills: [
        { name: 'React.js', proficiency: 'Intermediate', icon: 'Code2', context: 'Portfolio website development' },
        { name: 'Tailwind CSS', proficiency: 'Intermediate', icon: 'Palette', context: 'Modern CSS framework' },
        { name: 'Git', proficiency: 'Intermediate', icon: 'GitBranch', context: 'Version control learning' },
        { name: 'Linux', proficiency: 'Intermediate', icon: 'Terminal', context: 'Raspberry Pi projects' },
        { name: 'Raspberry Pi', proficiency: 'Advanced', icon: 'Cpu', context: 'NAS server project' },
        { name: 'Docker', proficiency: 'Beginner', icon: 'Package', context: 'Containerization basics' },
        { name: 'Samba', proficiency: 'Intermediate', icon: 'Share2', context: 'File sharing setup' },
        { name: 'RAID Management', proficiency: 'Intermediate', icon: 'HardDrive', context: 'Storage redundancy' },
        { name: 'System Monitoring', proficiency: 'Beginner', icon: 'Activity', context: 'Performance tracking' },
        { name: 'Electronics', proficiency: 'Intermediate', icon: 'Zap', context: 'Hardware assembly' },
        { name: '3D Modeling', proficiency: 'Intermediate', icon: 'Box', context: 'Advanced Blender work' },
        { name: '3D Animation', proficiency: 'Advanced', icon: 'Play', context: 'Character animation' }
      ],
      milestones: [
        'Built Raspberry Pi NAS server',
        'Created portfolio website',
        'Advanced 3D modeling skills',
        'Learned system administration'
      ]
    },
    2025: {
      skillsLearned: 0,
      skills: [],
      milestones: [
        'Future learning goals',
        'Advanced project planning'
      ]
    }
  };

  const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Hardware', 'Design', 'System Admin'];

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'skills', label: 'Skills', icon: 'Code2' },
    { id: 'learning-paths', label: 'Learning Paths', icon: 'Route' }
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);

      // Update active section based on scroll position
      const sections = navigationSections.map(section => section.id);
      let currentSection = 'overview';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track hero section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the hero section is visible
        rootMargin: '0px 0px -50px 0px' // Add some margin to unload earlier
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  const handlePathSelect = (path) => {
    console.log('Selected learning path:', path);
    // Here you could navigate to a detailed learning path page
  };

  const getSkillStats = () => {
    const filteredSkills = selectedCategory === 'All' 
      ? skillsData 
      : skillsData?.filter(skill => skill?.category === selectedCategory);

    const expertSkills = filteredSkills?.filter(skill => skill?.proficiency === 'Expert')?.length;
    const advancedSkills = filteredSkills?.filter(skill => skill?.proficiency === 'Advanced')?.length;
    const totalProjects = filteredSkills?.reduce((sum, skill) => sum + skill?.projectCount, 0);
    const avgProficiency = Math.round(
      filteredSkills?.reduce((sum, skill) => sum + skill?.percentage, 0) / filteredSkills?.length
    );

    return { expertSkills, advancedSkills, totalProjects, avgProficiency, totalSkills: filteredSkills?.length };
  };

  const stats = getSkillStats();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden">
        {/* Galaxy Background - Only render when hero is visible */}
        {isHeroVisible && (
          <div className="absolute inset-0 z-0" style={{ width: '100%', height: '700px' }}>
            <Galaxy 
              focal={[0.5, 0.5]}
              rotation={[1.0, 0.0]}
              starSpeed={0.3}
              density={0.6}
              hueShift={0}
              disableAnimation={false}
              speed={0.5}
              mouseInteraction={false}
              glowIntensity={0.1}
              saturation={0.0}
              mouseRepulsion={false}
              twinkleIntensity={0.0}
              rotationSpeed={0.05}
              repulsionStrength={1.5}
              autoCenterRepulsion={0}
              transparent={false}
            />
          </div>
        )}
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-reveal drop-shadow-lg">
              Technical Skills
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto text-reveal stagger-1">
              Interactive visualization of my technical competencies and learning journey
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-reveal stagger-2">
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => scrollToSection('overview')}
                className="backdrop-blur-sm shadow-lg border-white/20 text-white hover:bg-white/10"
              >
                Explore Skills
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-3">
              <div className="text-3xl font-bold text-white mb-2">{skillsData?.length}</div>
              <div className="text-white/80 text-sm">Total Skills</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-4">
              <div className="text-3xl font-bold text-white mb-2">{categories?.length - 1}</div>
              <div className="text-white/80 text-sm">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-5">
              <div className="text-3xl font-bold text-white mb-2">70%</div>
              <div className="text-white/80 text-sm">Avg Proficiency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className={`sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${
        isScrolled ? 'shadow-brand' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 py-4 overflow-x-auto">
            {navigationSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeSection === section?.id
                    ? 'bg-brand-primary text-white shadow-brand'
                    : 'text-text-secondary hover:text-brand-primary hover:bg-surface'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Overview Section */}
          <div id="overview" className="scroll-mt-32">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Skills Overview</h2>
                <p className="text-gray-600">Interactive visualization of technical competencies</p>
              </div>
            
            <div className="flex items-center bg-white rounded-2xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'cards' ?'bg-brand-primary text-white shadow-sm' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="LayoutGrid" size={16} />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'matrix' ?'bg-brand-primary text-white shadow-sm' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
                <span>Matrix</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Skills Display */}
          <div id="skills" className="scroll-mt-32">
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {(selectedCategory === 'All' ? skillsData : skillsData?.filter(skill => skill?.category === selectedCategory))?.map((skill) => (
                  <SkillCard
                    key={skill?.id}
                    skill={skill}
                    onSkillClick={handleSkillClick}
                    isSelected={selectedSkill?.id === skill?.id}
                  />
                ))}
              </div>
            ) : (
              <div className="mb-12">
                <SkillsMatrix
                  skills={skillsData}
                  selectedCategory={selectedCategory}
                  onSkillClick={handleSkillClick}
                />
              </div>
            )}
          </div>

          </div>

          {/* Timeline Section */}
          <div id="timeline" className="scroll-mt-32">
            <SkillTimeline
              timelineData={timelineData}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>

          {/* Learning Path Suggestions */}
          <div id="learning-paths" className="scroll-mt-32">
            <LearningPathSuggestions
              currentSkills={skillsData}
              onPathSelect={handlePathSelect}
            />
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-brand">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-conversion-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" size={32} color="white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Let's Discuss Your Project
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Interested in collaborating or learning more about my technical expertise? 
              I'm always excited to discuss new opportunities and share knowledge with fellow developers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Mail"
                iconPosition="left"
                className="bg-brand-primary hover:bg-brand-primary/90"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Github"
                iconPosition="left"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                View GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Skill Detail Modal */}
      <SkillDetailModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center">
                  <Icon name="Code2" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">TechBlog Portfolio</h3>
                  <p className="text-gray-400 text-sm">Building Tomorrow, Documenting Today</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Showcasing technical projects and sharing knowledge with the developer community. 
                Every project tells a story of learning, problem-solving, and innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/homepage-technical-portfolio-showcase" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="/project-deep-dive-raspberry-pi-nas-case-study" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="/interactive-skills-matrix" className="hover:text-white transition-colors">Skills</a></li>
                <li><a href="/technical-knowledge-hub" className="hover:text-white transition-colors">Knowledge Hub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date()?.getFullYear()} TechBlog Portfolio. Built with React and passion for learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InteractiveSkillsMatrix;