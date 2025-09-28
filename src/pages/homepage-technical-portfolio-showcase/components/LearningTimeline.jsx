import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LearningTimeline = () => {
  const [activeYear, setActiveYear] = useState(2024);

  const timelineData = {
    2024: {
      title: "Current Learning Journey",
      description: "Continuing to learn and build projects as a student",
      achievements: [
        {
          icon: "Database",
          title: "Raspberry Pi 5 NAS Server",
          description: "Complete network storage solution with web interface - my main project so far",
          tech: ["Python", "Linux", "Docker"],
          impact: "Personal learning project, great experience with server setup"
        }
      ],
      skills: ["Learning Linux", "Server Management", "Problem Solving"],
      certifications: ["Student - continuous learning"]
    }
  };

  const years = Object.keys(timelineData)?.sort((a, b) => b - a);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My Journey as a Student
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Documenting my learning experience and projects. Just starting out but excited 
              to share what I've built and learned along the way.
            </p>
          </motion.div>
        </div>

        {/* Timeline Content */}
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Year Overview */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">{activeYear}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {timelineData?.[activeYear]?.title}
                </h3>
                <p className="text-slate-300">
                  {timelineData?.[activeYear]?.description}
                </p>
              </div>

              {/* Skills Learning */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Skills I'm Working On</h4>
                <div className="flex flex-wrap gap-2">
                  {timelineData?.[activeYear]?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Current Status</h4>
                <div className="space-y-2">
                  {timelineData?.[activeYear]?.certifications?.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <Icon name="BookOpen" size={16} color="#10b981" />
                      <span className="text-slate-300 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {timelineData?.[activeYear]?.achievements?.map((achievement, index) => (
                <motion.div
                  key={achievement?.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={achievement?.icon} size={24} color="white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {achievement?.title}
                      </h4>
                      <p className="text-slate-600 mb-4">
                        {achievement?.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {achievement?.tech?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Impact */}
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Icon name="Heart" size={16} />
                        <span className="text-sm font-medium">{achievement?.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">My Learning Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">1+</div>
                <div className="text-slate-300">Year Learning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">1</div>
                <div className="text-slate-300">Main Project</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">10+</div>
                <div className="text-slate-300">Skills Learning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-slate-300">Motivation</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningTimeline;