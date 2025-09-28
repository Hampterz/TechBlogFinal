import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PixelBlast from '../../../components/PixelBlast';
import { useParallax } from '../../../hooks/useScrollAnimation';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const parallaxOffset = useParallax(-0.5);

  const rotatingTexts = [
    "Learning One Project at a Time",
    "A Student\'s Tech Journey",
    "Documenting My Learning Path",
    "Building, Learning, Sharing"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-showcase');
    if (projectsSection) {
      projectsSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-hero-section
    >
      {/* PixelBlast Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <PixelBlast
          variant="square"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          liquid={true}
          liquidStrength={0.15}
          liquidRadius={1.2}
          enableRipples={true}
          rippleIntensityScale={1.5}
          rippleThickness={0.08}
          rippleSpeed={0.5}
          liquidWobbleSpeed={3.5}
          speed={0.7}
          edgeFade={0.3}
          transparent={true}
          style={{}}
          className="w-full h-full"
        />
      </motion.div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-800/90 z-10"></div>
      {/* Floating Elements */}
      <div className="absolute inset-0 z-15">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-32 right-20 w-12 h-12 bg-emerald-500/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 left-20 w-20 h-20 bg-purple-500/20 rounded-full blur-sm"
        />
      </div>
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 opacity-5 z-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <motion.path
            d="M100 200 L300 200 L300 400 L500 400 L500 200 L700 200 L700 600 L900 600"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-400"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M200 100 L200 300 L400 300 L400 500 L600 500 L600 300 L800 300 L800 700"
            stroke="currentColor"
            strokeWidth="2"
            className="text-emerald-400"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.circle
            cx="300"
            cy="200"
            r="8"
            fill="currentColor"
            className="text-blue-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="500"
            cy="400"
            r="6"
            fill="currentColor"
            className="text-emerald-500"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
          />
        </svg>
      </div>
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Logo Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                animate={{
                  boxShadow: [
                    "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                    "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
                    "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Icon name="BookOpen" size={32} color="white" strokeWidth={2.5} />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.7)",
                    "0 0 0 10px rgba(16, 185, 129, 0)",
                    "0 0 0 0 rgba(16, 185, 129, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
          
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              background: "linear-gradient(45deg, #ffffff, #60a5fa, #34d399, #ffffff)",
              backgroundSize: "300% 300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            My Personal
            <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Tech Blog
            </span>
          </motion.h1>
        </motion.div>

        {/* Rotating Text with Enhanced Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <div className="h-16 flex items-center justify-center">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                stiffness: 100,
                damping: 10
              }}
              className="text-xl lg:text-2xl text-slate-200 font-medium drop-shadow-lg"
            >
              {rotatingTexts?.[currentText]}
            </motion.p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <motion.p 
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Hey there! I'm a high school student documenting my journey into the world of technology. 
            Follow along as I learn, build, and share my experiences with coding, hardware projects, and everything in between.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="lg"
                iconName="Heart"
                iconPosition="left"
                iconSize={20}
                onClick={scrollToProjects}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full backdrop-blur-sm border border-white/20 group"
              >
                View My Journey
              </Button>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                iconName="Github"
                iconPosition="left"
                iconSize={20}
                onClick={() => window.open('https://github.com/Hampterz', '_blank')}
                className="border-2 border-white/30 bg-white/10 text-slate-300 hover:bg-white hover:text-slate-800 hover:border-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                My GitHub
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section with Staggered Animation */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.9
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: "GraduationCap", value: "Student", label: "Learning Every Day" },
            { icon: "Code", value: "1", label: "Main Project" },
            { icon: "Heart", value: "100%", label: "Learning Passion" }
          ]?.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, type: "spring" }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                y: -2,
                transition: { duration: 0.1 }
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div 
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <Icon name={stat?.icon} size={24} color="#60a5fa" />
              </motion.div>
              <motion.div 
                className="text-2xl font-bold text-white mb-1 drop-shadow-lg"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(96, 165, 250, 0.5)",
                    "0 0 10px rgba(96, 165, 250, 0.8)",
                    "0 0 5px rgba(96, 165, 250, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat?.value}
              </motion.div>
              <div className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 -ml-4"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="cursor-pointer group"
            onClick={scrollToProjects}
            whileHover={{ 
              scale: 1.2, 
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.9, 
              transition: { duration: 0.1, ease: "easeIn" }
            }}
          >
            <motion.div
              className="relative"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(148, 163, 184, 0.7)",
                  "0 0 0 10px rgba(148, 163, 184, 0)",
                  "0 0 0 0 rgba(148, 163, 184, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Icon name="ChevronDown" size={32} color="#94a3b8" className="group-hover:text-white transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;