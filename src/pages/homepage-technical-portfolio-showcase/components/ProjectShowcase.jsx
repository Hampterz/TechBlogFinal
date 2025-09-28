import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { useContent } from '../../../contexts/ContentContext';
import AnimatedSection from '../../../components/ui/AnimatedSection';

const ProjectShowcase = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const { content } = useContent();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Get featured projects from CMS
  const projects = content?.projects?.filter(p => p?.featured) || [];
  const mainProject = projects?.[0];

  const getStatusColor = (status) => {
    return 'bg-blue-100 text-blue-800 border-blue-200 rounded-full';
  };

  const getTechStackColor = (tech) => {
    const colors = {
      'Python': 'bg-yellow-100 text-yellow-800 rounded-full',
      'React': 'bg-blue-100 text-blue-800 rounded-full',
      'Node.js': 'bg-green-100 text-green-800 rounded-full',
      'Docker': 'bg-blue-100 text-blue-800 rounded-full',
      'Arduino': 'bg-teal-100 text-teal-800 rounded-full',
      'Linux': 'bg-gray-100 text-gray-800 rounded-full',
      'PostgreSQL': 'bg-blue-100 text-blue-800 rounded-full',
      'MongoDB': 'bg-green-100 text-green-800 rounded-full',
      'TensorFlow': 'bg-orange-100 text-orange-800 rounded-full',
      'Solidity': 'bg-purple-100 text-purple-800 rounded-full',
      'default': 'bg-slate-100 text-slate-800 rounded-full'
    };
    return colors?.[tech] || colors?.default;
  };

  // If no projects, show placeholder
  if (!projects?.length) {
    return (
      <section 
        id="projects-showcase" 
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" 
        data-light-section
        ref={sectionRef}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <AnimatedSection animationType="fadeInUp">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                My Projects
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                No featured projects yet. Use the admin dashboard to add your amazing projects!
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/admin-secret-dashboard-sreyas'}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Add Projects
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    );
  }

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

  const projectCardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section 
      id="projects-showcase" 
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" 
      data-light-section
      ref={sectionRef}
    >
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
            {content?.pages?.home?.projectsTitle || "My Learning Projects"}
          </motion.h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {content?.pages?.home?.projectsDescription || "Here are the main projects I've been working on during my studies. Each one has been an amazing learning experience!"}
          </p>
        </AnimatedSection>

        {/* Featured Project Display */}
        <AnimatedSection className="flex justify-center mb-12" animationType="scaleIn" delay={0.3}>
          <motion.div
            className="group relative max-w-2xl"
            onMouseEnter={() => setHoveredProject(mainProject?.id)}
            onMouseLeave={() => setHoveredProject(null)}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{
              y: -5,
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
          >
            <motion.div 
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-150 overflow-hidden border border-slate-200 hover:border-blue-300"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  whileHover={{ 
                    scale: 1.1, 
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Image
                      src={mainProject?.image || "/assets/images/rasberrypimage.png?v=" + Date.now()}
                    alt={mainProject?.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Floating Badges with Animation */}
                {/* <motion.div 
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(251, 191, 36, 0.7)",
                        "0 0 0 10px rgba(251, 191, 36, 0)",
                        "0 0 0 0 rgba(251, 191, 36, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon name="Heart" size={16} />
                    </motion.div>
                    My Pride & Joy
                  </motion.div>
                </motion.div> */}

                {/* Status Badge */}
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div 
                    className={`px-4 py-2 text-sm font-semibold border ${getStatusColor(mainProject?.status)}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {mainProject?.status?.replace('-', ' ') || 'In Progress'}
                  </motion.div>
                </motion.div>

                {/* Enhanced Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === mainProject?.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredProject === mainProject?.id ? 0 : 20,
                      opacity: hoveredProject === mainProject?.id ? 1 : 0
                    }}
                    transition={{ delay: 0.1 }}
                  >
                    {mainProject?.demoUrl && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="default"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="left"
                          iconSize={16}
                          onClick={() => window.location.href = mainProject?.demoUrl}
                          className="bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-lg"
                        >
                          Read More
                        </Button>
                      </motion.div>
                    )}
                    {mainProject?.githubUrl && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Github"
                          iconPosition="left"
                          iconSize={16}
                          onClick={() => window.open(mainProject?.githubUrl, '_blank')}
                          className="border-white text-white hover:bg-white hover:text-slate-900 rounded-full shadow-lg"
                        >
                          Code
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>

              {/* Project Content with Enhanced Animation */}
              <motion.div 
                className="p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.h3 
                    className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {mainProject?.title}
                  </motion.h3>
                  <motion.div 
                    className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
                  >
                    {mainProject?.category}
                  </motion.div>
                </div>

                <motion.p 
                  className="text-slate-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {mainProject?.description}
                </motion.p>

                {/* Learning Note with Animation */}
                {mainProject?.learningNote && (
                  <motion.div 
                    className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-blue-800 italic">
                      💡 {mainProject?.learningNote}
                    </p>
                  </motion.div>
                )}

                {/* Tech Stack with Staggered Animation */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.9 }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {mainProject?.tech?.map((tech, index) => (
                    <motion.span
                      key={tech}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, y: 20 },
                        visible: { opacity: 1, scale: 1, y: 0 }
                      }}
                      className={`px-3 py-2 text-sm font-medium ${getTechStackColor(tech)} cursor-default`}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Project Metrics */}
                {mainProject?.metrics && (
                  <motion.div 
                    className="flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-4 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                  >
                    <div className="flex items-center gap-6">
                      {[
                        { icon: "Star", value: mainProject?.metrics?.stars, label: "stars" },
                        { icon: "GitFork", value: mainProject?.metrics?.forks, label: "forks" },
                        { icon: "Eye", value: mainProject?.metrics?.views, label: "views" }
                      ].map((metric, index) => (
                        <motion.div 
                          key={metric.label}
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.05, color: "#3b82f6" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                        >
                          <Icon name={metric.icon} size={16} />
                          <span>{metric.value} {metric.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        {/* Additional Projects Grid */}
        {projects?.length > 1 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {projects?.slice(1)?.map((project, index) => (
              <motion.div
                key={project?.id}
                variants={projectCardVariants}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {project?.image && (
                  <div className="h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={project?.image}
                        alt={project?.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                )}
                <div className="p-6">
                  <motion.h4 
                    className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    {project?.title}
                  </motion.h4>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project?.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project?.tech?.slice(0, 3)?.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className={`px-2 py-1 text-xs font-medium ${getTechStackColor(tech)}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * techIndex }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project?.demoUrl && (
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          size="sm"
                          onClick={() => window.location.href = project?.demoUrl}
                          className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View
                        </Button>
                      </motion.div>
                    )}
                    {project?.githubUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project?.githubUrl, '_blank')}
                          className="border-gray-300 hover:border-gray-400"
                        >
                          <Icon name="Github" size={14} />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Future Projects Teaser */}
        <AnimatedSection animationType="fadeInUp" delay={0.8} className="text-center">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto border border-slate-200"
            whileHover={{ 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon name="Lightbulb" size={48} color="#60a5fa" className="mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">More Projects Coming Soon!</h3>
            <p className="text-slate-600 mb-6">
              I'm constantly learning and building new things. Check back regularly to see what new projects 
              I'm working on as I continue my tech journey through college!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                iconName="Bell"
                iconPosition="left"
                iconSize={20}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Stay Tuned!
              </Button>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProjectShowcase;