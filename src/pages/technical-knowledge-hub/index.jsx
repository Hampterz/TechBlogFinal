import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchAndFilter from './components/SearchAndFilter';
import FeaturedTutorial from './components/FeaturedTutorial';
import TutorialCard from './components/TutorialCard';
import CategorySection from './components/CategorySection';
import PopularResources from './components/PopularResources';
import RecentUpdates from './components/RecentUpdates';
import Galaxy from '../../components/ui/Galaxy';
import { useContent } from '../../contexts/ContentContext';

const TechnicalKnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    technology: 'all'
  });
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);
  
  const { content } = useContent();

  // Memoized Galaxy component to prevent unnecessary re-renders
  const MemoizedGalaxy = useMemo(() => {
    if (!isHeroVisible) return null;
    
    return (
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '600px' }}>
        <Galaxy 
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
          starSpeed={0.1}
          density={0.4}
          hueShift={0}
          disableAnimation={false}
          speed={0.2}
          mouseInteraction={false}
          glowIntensity={0.05}
          saturation={0.0}
          mouseRepulsion={false}
          twinkleIntensity={0.0}
          rotationSpeed={0.02}
          repulsionStrength={1.0}
          autoCenterRepulsion={0}
          transparent={false}
        />
      </div>
    );
  }, [isHeroVisible]);

  // Scroll and hero visibility effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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
        threshold: 0.1,
        rootMargin: '0px 0px -200px 0px' // Unload Galaxy earlier for better performance
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

  // Real tutorials based on actual skills and projects
  const realTutorials = [
    {
      id: 'raspberry-pi-nas',
      title: 'Building My First Raspberry Pi 5 NAS: A Learning Journey',
      description: 'Complete guide to building a custom NAS server with Raspberry Pi 5, including hardware setup, RAID configuration, and Samba file sharing.',
      category: 'hardware',
      difficulty: 'intermediate',
      duration: 120, // 2 hours
      technologies: ['Raspberry Pi 5', 'Linux', 'RAID', 'Samba', 'Docker', 'Python'],
      prerequisites: ['Basic Linux knowledge', 'Hardware assembly skills'],
      views: 0,
      comments: 0,
      likes: 0,
      completionRate: 0,
      lastUpdated: 'Dec 15, 2024',
      steps: 12,
      rating: 0,
      reviews: 0,
      learningOutcomes: [
        'Set up Raspberry Pi 5 with PCIe HAT',
        'Configure RAID 1 for data redundancy',
        'Install and configure Samba file sharing',
        'Implement automated backup scripts',
        'Monitor system performance and health'
      ],
      featuredImage: '/assets/images/raspberry-pi-new.png',
      status: 'published',
      githubUrl: 'https://github.com/Hampterz/raspberry-pi-nas',
      projectUrl: '/project-deep-dive-raspberry-pi-nas-case-study',
      tutorialUrl: '/tutorials/raspberry-pi-complete-guide'
    },
    {
      id: 'react-portfolio',
      title: 'Building a Modern React Portfolio Website',
      description: 'Learn to create a stunning portfolio website using React, Tailwind CSS, and modern web development practices.',
      category: 'frontend',
      difficulty: 'intermediate',
      duration: 180, // 3 hours
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Vite'],
      prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals'],
      views: 0,
      comments: 0,
      likes: 0,
      completionRate: 0,
      lastUpdated: 'Dec 10, 2024',
      steps: 15,
      rating: 0,
      reviews: 0,
      learningOutcomes: [
        'Set up React development environment',
        'Implement responsive design with Tailwind CSS',
        'Create reusable components',
        'Add animations and interactions',
        'Deploy to production'
      ],
      featuredImage: '/assets/images/no_image.png',
      status: 'published',
      githubUrl: 'https://github.com/Hampterz/techblog-portfolio',
      projectUrl: '/homepage-technical-portfolio-showcase',
      tutorialUrl: '/tutorials/react-js-complete-guide'
    },
    {
      id: 'blender-3d-modeling',
      title: '3D Modeling and Animation with Blender',
      description: 'Master the fundamentals of 3D modeling, texturing, and animation using Blender for character and environment design.',
      category: 'design',
      difficulty: 'advanced',
      duration: 240, // 4 hours
      technologies: ['Blender', '3D Modeling', 'Animation', 'Texturing', 'Rendering'],
      prerequisites: ['Basic computer skills', 'Creative mindset'],
      views: 0,
      comments: 0,
      likes: 0,
      completionRate: 0,
      lastUpdated: 'Dec 5, 2024',
      steps: 20,
      rating: 0,
      reviews: 0,
      learningOutcomes: [
        'Master Blender interface and navigation',
        'Create 3D models from scratch',
        'Apply materials and textures',
        'Animate characters and objects',
        'Render high-quality images and videos'
      ],
      featuredImage: '/assets/images/no_image.png',
      status: 'published',
      githubUrl: 'https://github.com/Hampterz/blender-projects',
      projectUrl: null,
      tutorialUrl: null
    },
    {
      id: 'linux-system-admin',
      title: 'Linux System Administration Essentials',
      description: 'Learn essential Linux commands, system administration, and server management for modern development environments.',
      category: 'system-admin',
      difficulty: 'intermediate',
      duration: 150, // 2.5 hours
      technologies: ['Linux', 'Bash', 'System Administration', 'SSH', 'Cron', 'Systemctl'],
      prerequisites: ['Basic command line knowledge'],
      views: 0,
      comments: 0,
      likes: 0,
      completionRate: 0,
      lastUpdated: 'Dec 1, 2024',
      steps: 18,
      rating: 0,
      reviews: 0,
      learningOutcomes: [
        'Master essential Linux commands',
        'Manage system services and processes',
        'Configure user accounts and permissions',
        'Set up automated tasks with cron',
        'Monitor system performance and logs'
      ],
      featuredImage: '/assets/images/no_image.png',
      status: 'published',
      githubUrl: 'https://github.com/Hampterz/linux-scripts',
      projectUrl: null,
      tutorialUrl: null
    },
    {
      id: 'docker-containerization',
      title: 'Docker Containerization for Developers',
      description: 'Complete guide to containerizing applications with Docker, including Docker Compose and best practices.',
      category: 'devops',
      difficulty: 'beginner',
      duration: 90, // 1.5 hours
      technologies: ['Docker', 'Docker Compose', 'Containerization', 'DevOps', 'CI/CD'],
      prerequisites: ['Basic command line knowledge'],
      views: 0,
      comments: 0,
      likes: 0,
      completionRate: 0,
      lastUpdated: 'Nov 28, 2024',
      steps: 10,
      rating: 0,
      reviews: 0,
      learningOutcomes: [
        'Understand containerization concepts',
        'Create and manage Docker containers',
        'Write effective Dockerfiles',
        'Use Docker Compose for multi-container apps',
        'Deploy containers to production'
      ],
      featuredImage: '/assets/images/no_image.png',
      status: 'published',
      githubUrl: 'https://github.com/Hampterz/docker-examples',
      projectUrl: null,
      tutorialUrl: null
    },
    {
      id: 'javascript-mastery',
      title: 'JavaScript Mastery Guide',
      description: 'Master JavaScript from fundamentals to advanced concepts. Build interactive games and web applications.',
      category: 'frontend',
      difficulty: 'intermediate',
      duration: 180, // 3 hours
      technologies: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming', 'Local Storage'],
      prerequisites: ['Basic HTML/CSS knowledge'],
      views: 0,
      comments: 0,
      likes: 0,
      completionRate: 0,
      lastUpdated: 'Dec 12, 2024',
      steps: 16,
      rating: 0,
      reviews: 0,
      learningOutcomes: [
        'Master JavaScript fundamentals',
        'Build interactive games',
        'Work with DOM and events',
        'Implement async programming patterns',
        'Create real-world applications'
      ],
      featuredImage: '/assets/images/no_image.png',
      status: 'published',
      githubUrl: 'https://github.com/Hampterz/techblog-portfolio',
      projectUrl: null,
      tutorialUrl: '/tutorials/javascript-mastery-guide'
    }
  ];

  // Convert blog posts to tutorial format for compatibility
  const blogTutorials = content?.blogPosts?.map((post, index) => {
    return {
      id: post?.id,
      title: post?.title,
      description: post?.excerpt || post?.content?.substring(0, 200) + '...',
      category: post?.category?.toLowerCase()?.replace(' ', '-'),
      difficulty: 'intermediate', // Default difficulty
      duration: post?.readTime * 10 || 60, // Estimate duration
      technologies: post?.tags || [],
      prerequisites: [],
      views: 0, // Real views start at 0
      comments: 0, // Real comments start at 0
      likes: 0, // Real likes start at 0
      completionRate: 0, // Real completion rate starts at 0
      lastUpdated: new Date(post?.updatedAt)?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      steps: 8, // Fixed number of steps
      rating: 0, // Real rating starts at 0
      reviews: 0, // Real reviews start at 0
      learningOutcomes: [
        "Understand core concepts",
        "Apply practical techniques",
        "Build real-world solutions",
        "Master best practices"
      ],
      featuredImage: post?.featuredImage,
      status: post?.status,
      githubUrl: null,
      projectUrl: null
    };
  })?.filter(tutorial => tutorial?.status === 'published') || [];

  // Combine real tutorials with blog tutorials
  const allTutorials = [...realTutorials, ...blogTutorials];

  // Featured tutorial (first published blog post)
  const featuredTutorial = allTutorials?.[0];

  // Filter tutorials based on search and filters
  useEffect(() => {
    let filtered = allTutorials;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(tutorial =>
        tutorial?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tutorial?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tutorial?.technologies?.some(tech => tech?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(tutorial => tutorial?.category === filters?.category);
    }

    // Apply difficulty filter
    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(tutorial => tutorial?.difficulty === filters?.difficulty);
    }

    // Apply technology filter
    if (filters?.technology !== 'all') {
      filtered = filtered?.filter(tutorial =>
        tutorial?.technologies?.some(tech =>
          tech?.toLowerCase()?.includes(filters?.technology?.replace('-', ' '))
        )
      );
    }

    setFilteredTutorials(filtered);
  }, [searchQuery, filters, allTutorials]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleViewTutorial = (tutorial) => {
    console.log('Viewing tutorial:', tutorial?.title);
    console.log('Tutorial data:', tutorial);
    
    // Increment view count (this would need state management in a real app)
    console.log('Incrementing view count for:', tutorial.title);
    
    // Navigate to tutorial or project page
    if (tutorial.projectUrl) {
      console.log('Navigating to project page:', tutorial.projectUrl);
      window.location.href = tutorial.projectUrl;
    } else if (tutorial.tutorialUrl) {
      console.log('Navigating to tutorial page:', tutorial.tutorialUrl);
      window.location.href = tutorial.tutorialUrl;
    } else if (tutorial.githubUrl) {
      console.log('Opening GitHub repo:', tutorial.githubUrl);
      window.open(tutorial.githubUrl, '_blank');
    } else {
      // For blog tutorials, show an alert for now
      console.log('Opening tutorial detail page for:', tutorial.title);
      alert(`Opening tutorial: ${tutorial.title}\n\nThis would navigate to a detailed tutorial page in a real application.`);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    // Scroll to tutorials section
    document.getElementById('tutorials-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResource = (resource) => {
    console.log('Downloading resource:', resource?.title);
    // In a real app, this would trigger the download
  };

  const handleViewUpdate = (update) => {
    console.log('Viewing update:', update?.title);
    // In a real app, this would navigate to the updated content
  };

  const handleLikeTutorial = (tutorial) => {
    console.log('Liked tutorial:', tutorial?.title);
    // In a real app, this would increment the like count
  };

  const handleBookmarkTutorial = (tutorial) => {
    console.log('Bookmarked tutorial:', tutorial?.title);
    // In a real app, this would save to bookmarks
  };

  const handleRateTutorial = (tutorial, rating) => {
    console.log('Rated tutorial:', tutorial?.title, 'with rating:', rating);
    // In a real app, this would save the rating
  };

  const handleSubscribeNewsletter = () => {
    const email = document.querySelector('input[type="email"]').value;
    if (email) {
      console.log('Subscribed to newsletter with email:', email);
      alert('Thank you for subscribing! You will receive updates about new tutorials.');
      document.querySelector('input[type="email"]').value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const handleSocialClick = (platform) => {
    const urls = {
      github: 'https://github.com/Hampterz',
      twitter: 'https://twitter.com/hampterz',
      linkedin: 'https://linkedin.com/in/hampterz',
      email: 'mailto:hampterz@example.com'
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const handleViewModeChange = (mode) => {
    console.log('Changed view mode to:', mode);
    // In a real app, this would change the display mode
  };

  // Hero section scroll function
  const scrollToTutorials = () => {
    const tutorialsSection = document.getElementById('tutorials-section');
    if (tutorialsSection) {
      tutorialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Galaxy Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-12 overflow-hidden">
        {/* Galaxy Background - Memoized for performance */}
        {MemoizedGalaxy}
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6"></div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-reveal drop-shadow-lg">
              Technical Knowledge Hub
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto text-reveal stagger-1">
              Master complex technical concepts through hands-on tutorials, comprehensive guides, and practical resources
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-reveal stagger-2">
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={scrollToTutorials}
                className="backdrop-blur-sm shadow-lg border-white/20 text-white hover:bg-white/10"
              >
                Explore Tutorials
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Search"
                iconPosition="left"
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="backdrop-blur-sm shadow-lg border-white/20 text-white hover:bg-white/10"
              >
                Search Resources
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-3">
              <div className="text-3xl font-bold text-white mb-2">{allTutorials?.length || 0}+</div>
              <div className="text-white/80 text-sm">Tutorials</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-4">
              <div className="text-3xl font-bold text-white mb-2">
                {content?.blogPosts?.filter(p => p?.status === 'published')?.length || 0}
              </div>
              <div className="text-white/80 text-sm">Published</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-5">
              <div className="text-3xl font-bold text-white mb-2">
                {new Set(allTutorials?.flatMap(t => t?.technologies))?.size || 0}+
              </div>
              <div className="text-white/80 text-sm">Technologies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-reveal stagger-6">
              <div className="text-3xl font-bold text-white mb-2">4.8★</div>
              <div className="text-white/80 text-sm">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>
      {/* Search and Filter */}
      <section id="search-section" className="py-12" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
          />
        </div>
      </section>
      {/* Featured Tutorial */}
      {featuredTutorial && (
        <section className="py-12" data-light-section>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FeaturedTutorial
              tutorial={featuredTutorial}
              onViewTutorial={handleViewTutorial}
            />
          </div>
        </section>
      )}
      {/* Tutorials Grid - Commented out as requested */}
      {/* <section id="tutorials-section" className="py-12 bg-surface" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {searchQuery || filters?.category !== 'all' || filters?.difficulty !== 'all' || filters?.technology !== 'all'
                  ? `Filtered Tutorials (${filteredTutorials?.length})`
                  : `All Tutorials (${allTutorials?.length})`
                }
              </h2>
              <p className="text-text-secondary">
                {searchQuery && `Results for "${searchQuery}"`}
                {filters?.category !== 'all' && ` • Category: ${filters?.category?.replace('-', ' ')}`}
                {filters?.difficulty !== 'all' && ` • Level: ${filters?.difficulty}`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Grid3X3"
                iconPosition="left"
                onClick={() => handleViewModeChange('grid')}
                className="text-text-secondary hover:text-brand-primary"
              >
                Grid View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="List"
                iconPosition="left"
                onClick={() => handleViewModeChange('list')}
                className="text-text-secondary hover:text-brand-primary"
              >
                List View
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)]?.map((_, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-muted rounded-lg"></div>
                    <div className="w-16 h-6 bg-muted rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-3/4 h-6 bg-muted rounded"></div>
                    <div className="w-full h-4 bg-muted rounded"></div>
                    <div className="w-2/3 h-4 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTutorials?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials?.slice(featuredTutorial ? 1 : 0)?.map((tutorial) => (
                <TutorialCard
                  key={tutorial?.id}
                  tutorial={tutorial}
                  onViewTutorial={handleViewTutorial}
                />
              ))}
            </div>
          ) : allTutorials?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BookOpen" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No blog posts yet</h3>
              <p className="text-text-secondary mb-4">
                Blog posts will be added soon. Check back later for new content!
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No tutorials found</h3>
              <p className="text-text-secondary mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ category: 'all', difficulty: 'all', technology: 'all' });
                }}
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section> */}
      {/* Categories */}
      <section className="py-16" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <CategorySection onCategorySelect={handleCategorySelect} />
        </div>
      </section>
      {/* Popular Resources - Commented out as requested */}
      {/* <section className="py-16 bg-surface" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <PopularResources onDownloadResource={handleDownloadResource} />
        </div>
      </section> */}
      {/* Recent Updates */}
      <section className="py-16" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RecentUpdates onViewUpdate={handleViewUpdate} />
        </div>
      </section>
      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-br from-brand-primary to-brand-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Icon name="Mail" size={32} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Tutorials
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get notified when we publish new tutorials, guides, and resources. 
            Join 10,000+ developers who trust our content for their learning journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={handleSubscribeNewsletter}
              className="bg-white text-brand-primary hover:bg-white/90 font-semibold"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-white/70 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Knowledge Hub</h3>
                  <p className="text-sm text-text-secondary">Learn. Build. Share.</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4 max-w-md">
                Empowering developers with practical tutorials, comprehensive guides, and hands-on resources 
                for modern technology stacks.
              </p>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSocialClick('github')}
                  className="text-text-secondary hover:text-brand-primary"
                >
                  <Icon name="Github" size={20} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSocialClick('twitter')}
                  className="text-text-secondary hover:text-brand-primary"
                >
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSocialClick('linkedin')}
                  className="text-text-secondary hover:text-brand-primary"
                >
                  <Icon name="Linkedin" size={20} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><button onClick={() => handleCategorySelect('system-admin')} className="hover:text-brand-primary transition-colors text-left">System Administration</button></li>
                <li><button onClick={() => handleCategorySelect('hardware')} className="hover:text-brand-primary transition-colors text-left">Hardware Integration</button></li>
                <li><button onClick={() => handleCategorySelect('frontend')} className="hover:text-brand-primary transition-colors text-left">Full-Stack Development</button></li>
                <li><button onClick={() => handleCategorySelect('devops')} className="hover:text-brand-primary transition-colors text-left">DevOps Practices</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><button onClick={() => window.open('https://github.com/Hampterz', '_blank')} className="hover:text-brand-primary transition-colors text-left">Download Center</button></li>
                <li><button onClick={() => window.open('https://github.com/Hampterz?tab=repositories', '_blank')} className="hover:text-brand-primary transition-colors text-left">Code Templates</button></li>
                <li><button onClick={() => window.open('https://github.com/Hampterz/techblog-portfolio/discussions', '_blank')} className="hover:text-brand-primary transition-colors text-left">Community Forum</button></li>
                <li><button onClick={() => handleSocialClick('email')} className="hover:text-brand-primary transition-colors text-left">Support</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © {new Date()?.getFullYear()} TechBlog Portfolio. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <button onClick={() => window.open('https://github.com/Hampterz/techblog-portfolio/blob/main/PRIVACY.md', '_blank')} className="text-text-secondary hover:text-brand-primary text-sm transition-colors">Privacy Policy</button>
              <button onClick={() => window.open('https://github.com/Hampterz/techblog-portfolio/blob/main/TERMS.md', '_blank')} className="text-text-secondary hover:text-brand-primary text-sm transition-colors">Terms of Service</button>
              <button onClick={() => handleSocialClick('email')} className="text-text-secondary hover:text-brand-primary text-sm transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnicalKnowledgeHub;