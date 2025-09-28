import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { useContent } from '../../../contexts/ContentContext';
import AnimatedSection from '../../../components/ui/AnimatedSection';

const SkillsVisualization = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [animationComplete, setAnimationComplete] = useState(false);
  const { content } = useContent();
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });

  // Use skills from CMS
  const skillCategories = content?.skills || {};
  const categoryNames = Object.keys(skillCategories);

  // Set default category to first available
  useEffect(() => {
    if (categoryNames?.length > 0 && !skillCategories?.[activeCategory]) {
      setActiveCategory(categoryNames?.[0]);
    }
  }, [categoryNames, activeCategory, skillCategories]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const getColorClasses = (color, type = 'bg') => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        bgLight: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-500',
        shadow: 'shadow-blue-200'
      },
      emerald: {
        bg: 'bg-emerald-500',
        bgLight: 'bg-emerald-100',
        text: 'text-emerald-600',
        border: 'border-emerald-500',
        shadow: 'shadow-emerald-200'
      },
      orange: {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-500',
        shadow: 'shadow-orange-200'
      },
      purple: {
        bg: 'bg-purple-500',
        bgLight: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-500',
        shadow: 'shadow-purple-200'
      },
      pink: {
        bg: 'bg-pink-500',
        bgLight: 'bg-pink-100',
        text: 'text-pink-600',
        border: 'border-pink-500',
        shadow: 'shadow-pink-200'
      }
    };
    return colorMap?.[color] || colorMap?.blue;
  };

  const getLevelDescription = (level) => {
    if (level >= 80) return 'Getting There!';
    if (level >= 40) return 'Learning';
    if (level >= 20) return 'Beginner';
    return 'Just Started';
  };

  // If no skills, show placeholder
  if (categoryNames?.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-white to-slate-50" data-light-section>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center" animationType="fadeInUp">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              My Skills
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              No skills added yet. Use the admin dashboard to showcase your amazing skills!
            </p>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50" data-light-section ref={skillsRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" animationType="fadeInUp">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            animate={isInView ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            } : {}}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              background: "linear-gradient(45deg, #0f172a, #1e40af, #059669, #0f172a)",
              backgroundSize: "300% 300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {content?.pages?.home?.skillsTitle || "My Learning Journey"}
          </motion.h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {content?.pages?.home?.skillsDescription || "I'm still learning and growing! Here's an honest look at where I am with different technologies. Every day is a chance to get a little bit better! 📚"}
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Category Selector */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <motion.div 
              className="bg-white rounded-3xl p-6 sticky top-24 shadow-lg border border-slate-200"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
              }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Skill Areas</h3>
              <div className="space-y-3">
                {Object.entries(skillCategories)?.map(([category, data], index) => {
                  const colors = getColorClasses(data?.color);
                  const isActive = activeCategory === category;
                  
                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? `${colors?.bg} text-white shadow-lg ${colors?.shadow}` 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ 
                        scale: isActive ? 1.02 : 1.05,
                        x: isActive ? 0 : 5
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-white bg-opacity-20' : colors?.bgLight
                        }`}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon 
                          name={data?.icon || 'Settings'} 
                          size={20} 
                          color={isActive ? 'white' : colors?.text?.replace('text-', '#')} 
                        />
                      </motion.div>
                      <div className="text-left">
                        <div className="font-semibold">{category}</div>
                        <div className={`text-sm ${isActive ? 'text-white text-opacity-80' : 'text-slate-500'}`}>
                          {data?.skills?.length || 0} skills
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          className="ml-auto"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <Icon name="ChevronRight" size={16} color="white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Overall Stats with Animation */}
              <motion.div 
                className="mt-8 pt-6 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h4 className="font-semibold text-slate-900 mb-4">My Stats</h4>
                <div className="space-y-3">
                  {[
                    { 
                      label: "Total Skills", 
                      value: Object.values(skillCategories)?.reduce((acc, cat) => acc + (cat?.skills?.length || 0), 0)
                    },
                    { 
                      label: "Categories", 
                      value: categoryNames?.length 
                    },
                    { 
                      label: "Motivation Level", 
                      value: "∞" 
                    }
                  ]?.map((stat, index) => (
                    <motion.div 
                      key={stat?.label}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-slate-600">{stat?.label}</span>
                      <motion.span 
                        className="font-semibold text-slate-900"
                        animate={stat?.value === "∞" ? {
                          scale: [1, 1.2, 1],
                          color: ["#0f172a", "#1e40af", "#0f172a"]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat?.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <motion.div 
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
              }}
            >
              <motion.div 
                className="flex items-center gap-4 mb-8"
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(skillCategories?.[activeCategory]?.color)?.bgLight}`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon 
                    name={skillCategories?.[activeCategory]?.icon || 'Settings'} 
                    size={24} 
                    color={getColorClasses(skillCategories?.[activeCategory]?.color)?.text?.replace('text-', '#')} 
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{activeCategory} Skills</h3>
                  <p className="text-slate-600">Where I'm at in my learning journey</p>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                key={`skills-${activeCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {skillCategories?.[activeCategory]?.skills?.map((skill, index) => {
                  const colors = getColorClasses(skillCategories?.[activeCategory]?.color);
                  
                  return (
                    <motion.div
                      key={`${skill?.name}-${index}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300"
                      whileHover={{ 
                        y: -3,
                        boxShadow: "0 10px 25px -12px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <motion.h4 
                            className="text-lg font-semibold text-slate-900"
                            whileHover={{ scale: 1.02 }}
                          >
                            {skill?.name}
                          </motion.h4>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{skill?.experience || 'Learning'}</span>
                            <span>•</span>
                            <span>{skill?.projects || 0} project{skill?.projects !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <motion.span 
                              className={`font-medium ${colors?.text}`}
                              animate={{
                                scale: [1, 1.05, 1]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: index * 0.3 
                              }}
                            >
                              {getLevelDescription(skill?.level || 0)}
                            </motion.span>
                          </div>
                        </div>
                        <div className="text-right">
                          <motion.div 
                            className="text-2xl font-bold text-slate-900"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                          >
                            {skill?.level || 0}%
                          </motion.div>
                        </div>
                      </div>
                      {/* Learning Note */}
                      {skill?.learning && (
                        <motion.div 
                          className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                          whileHover={{ x: 5 }}
                        >
                          <p className="text-blue-800 text-sm italic">
                            💭 {skill?.learning}
                          </p>
                        </motion.div>
                      )}
                      {/* Enhanced Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                          <motion.div
                            className={`h-4 rounded-full ${colors?.bg} relative`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: animationComplete ? `${skill?.level || 0}%` : 0
                            }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.2 + 0.5,
                              ease: "easeOut"
                            }}
                          >
                            {/* Progress bar shine effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                              animate={{
                                x: ["-100%", "200%"]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5 + 2,
                                ease: "easeInOut"
                              }}
                              style={{ width: "50%" }}
                            />
                          </motion.div>
                        </div>
                        <motion.div 
                          className="flex justify-between text-xs text-slate-500 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 1 }}
                        >
                          {["Just Started", "Learning", "Getting There!", "Confident"]?.map((label, labelIndex) => (
                            <motion.span
                              key={label}
                              whileHover={{ scale: 1.1, color: colors?.text?.replace('text-', '#') }}
                              className="cursor-default"
                            >
                              {label}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}

                {(!skillCategories?.[activeCategory]?.skills || skillCategories?.[activeCategory]?.skills?.length === 0) && (
                  <motion.div 
                    className="text-center py-8 text-slate-500"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon name="Plus" size={32} className="mx-auto mb-4 text-slate-300" />
                    </motion.div>
                    <p>No skills in this category yet.</p>
                  </motion.div>
                )}
              </motion.div>

              {/* Category Summary with Animation */}
              <motion.div 
                className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200"
                key={`summary-${activeCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -12px rgba(59, 130, 246, 0.1)"
                }}
              >
                <motion.h4 
                  className="font-semibold text-slate-900 mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  My Thoughts on {activeCategory}
                </motion.h4>
                <motion.p 
                  className="text-slate-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {activeCategory === 'Frontend' && "I love seeing my code come to life in the browser! Still struggling with CSS sometimes, but getting better every day."}
                  {activeCategory === 'Backend' && "Server-side programming is fascinating! Python is my go-to language, but I'm excited to explore more technologies."}
                  {activeCategory === 'Hardware' && "Working with physical devices is so satisfying! My Raspberry Pi 5 project opened up a whole new world for me."}
                  {activeCategory === 'Tools' && "These tools make development so much easier. Still learning shortcuts and best practices, but I'm getting more comfortable."}
                  {activeCategory === 'Design/Blender' && "Blender is amazing! Creating 3D models and animations is like digital art. It's a perfect break from coding."}
                  {activeCategory === 'Creative' && "Creative skills are just as important as technical ones. Design and creativity help make technology more human and accessible."}
                  {!['Frontend', 'Backend', 'Hardware', 'Tools', 'Design/Blender', 'Creative']?.includes(activeCategory) && `Currently exploring ${activeCategory} skills and finding new ways to grow in this area.`}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsVisualization;