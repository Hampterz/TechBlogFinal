import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Home',
      path: '/homepage-technical-portfolio-showcase',
      icon: 'Home'
    },
    {
      name: 'Projects',
      path: '/project-deep-dive-raspberry-pi-nas-case-study',
      icon: 'FolderOpen'
    },
    {
      name: 'Skills',
      path: '/interactive-skills-matrix',
      icon: 'Target'
    },
    {
      name: 'Blog',
      path: '/technical-knowledge-hub',
      icon: 'BookOpen'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Liquid glass effect styles
  const getHeaderStyles = () => {
    if (isScrolled) {
      return 'bg-white/10 backdrop-blur-3xl backdrop-saturate-200 border-b border-white/20 shadow-2xl shadow-black/5';
    }
    return 'bg-white/5 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10';
  };

  // Always use black text for readability on transparent backgrounds
  const getTextStyles = () => {
    return 'text-gray-900';
  };

  const getLogoStyles = () => {
    return 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600';
  };

  const getSubtitleStyles = () => {
    return 'text-gray-600';
  };

  const getNavLinkStyles = (isActive) => {
    const baseStyles = 'flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150';
    
    return isActive 
      ? `${baseStyles} bg-gray-900/90 text-white shadow-lg backdrop-blur-sm border border-gray-700`
      : `${baseStyles} text-gray-800 hover:text-gray-900 hover:bg-gray-900/10 hover:shadow-md hover:backdrop-blur-sm`;
  };

  const getButtonStyles = (type) => {
    if (type === 'github') {
      return 'border-2 border-gray-800 bg-gray-900/5 backdrop-blur-sm text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 rounded-xl shadow-md hover:shadow-lg';
    }
    return 'bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-sm border border-indigo-500 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md hover:shadow-lg';
  };

  const getMobileMenuStyles = () => {
    return 'bg-white/15 backdrop-blur-3xl backdrop-saturate-200 border-t border-white/20 shadow-2xl';
  };

  const getMobileLinkStyles = (isActive) => {
    const baseStyles = 'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150';
    
    return isActive
      ? `${baseStyles} bg-gray-900/90 text-white shadow-lg`
      : `${baseStyles} text-gray-800 hover:text-gray-900 hover:bg-gray-900/10`;
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.1 } // Instant response
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.header 
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyles()}`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <motion.a 
              href="/homepage-technical-portfolio-showcase" 
              className="flex items-center space-x-3 group"
              variants={logoVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="relative">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-150 backdrop-blur-sm border border-white/20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  animate={{
                    boxShadow: [
                      "0 4px 14px 0 rgba(79, 70, 229, 0.3)",
                      "0 4px 14px 0 rgba(147, 51, 234, 0.3)",
                      "0 4px 14px 0 rgba(79, 70, 229, 0.3)"
                    ]
                  }}
                >
                  <Icon name="Palette" size={20} color="white" strokeWidth={2.5} />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0.7)",
                      "0 0 0 6px rgba(16, 185, 129, 0)",
                      "0 0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden sm:block">
                <motion.h1 
                  className={`text-xl font-bold transition-all duration-150 ${getLogoStyles()}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.1 }} // Instant response
                >
                  Creative Hub
                </motion.h1>
                <motion.p 
                  className={`text-xs font-medium ${getSubtitleStyles()}`}
                  animate={{
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Tech & Design
                </motion.p>
              </div>
            </motion.a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems?.map((item, index) => (
              <motion.a
                key={item?.path}
                href={item?.path}
                className={getNavLinkStyles(isActivePath(item?.path))}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.1 } // Instant response
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.1 }} // Instant response
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    color={isActivePath(item?.path) ? 'white' : '#1f2937'} 
                  />
                </motion.div>
                <span>{item?.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                iconName="Github"
                iconPosition="left"
                iconSize={16}
                onClick={() => window.open('https://github.com/Hampterz', '_blank')}
                className={`transition-all duration-150 ${getButtonStyles('github')}`}
                animated={true}
              >
                GitHub
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                iconSize={16}
                className={`transition-all duration-150 ${getButtonStyles('contact')}`}
                animated={true}
              >
                Contact
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }} // Instant response
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className={`${getTextStyles()} hover:bg-gray-900/10 rounded-xl backdrop-blur-sm transition-all duration-150`}
                animated={true}
              >
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon 
                    name={isMobileMenuOpen ? "X" : "Menu"} 
                    size={20}
                    color="#1f2937"
                  />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className={`lg:hidden ${getMobileMenuStyles()}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <nav className="px-6 py-4 space-y-3">
                {navigationItems?.map((item, index) => (
                  <motion.a
                    key={item?.path}
                    href={item?.path}
                    onClick={closeMobileMenu}
                    className={getMobileLinkStyles(isActivePath(item?.path))}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 5,
                      transition: { duration: 0.1 } // Instant response
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.1 }} // Instant response
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        color={isActivePath(item?.path) ? 'white' : '#1f2937'} 
                      />
                    </motion.div>
                    <span>{item?.name}</span>
                  </motion.a>
                ))}
                
                {/* Mobile CTA Buttons */}
                <motion.div 
                  className="pt-4 border-t border-gray-800/20 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Github"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    onClick={() => {
                      window.open('https://github.com/Hampterz', '_blank');
                      closeMobileMenu();
                    }}
                    className={`transition-all duration-150 ${getButtonStyles('github')}`}
                    animated={true}
                  >
                    View GitHub
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    onClick={closeMobileMenu}
                    className={`transition-all duration-150 ${getButtonStyles('contact')}`}
                    animated={true}
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;