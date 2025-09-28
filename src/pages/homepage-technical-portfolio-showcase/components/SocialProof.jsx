import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const communityMetrics = [
    { icon: "Eye", label: "Tutorial Views", value: "15.7K" },
    { icon: "Download", label: "Project Downloads", value: "2.3K" },
    { icon: "MessageCircle", label: "Community Discussions", value: "184" },
    { icon: "Bookmark", label: "Project Bookmarks", value: "456" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Community Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Building a reputation through learning, sharing knowledge, and contributing to the tech community 
              through projects and educational content.
            </p>
          </motion.div>
        </div>

        {/* Community Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">Learning & Sharing Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {communityMetrics?.map((metric, index) => (
                <motion.div
                  key={metric?.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon name={metric?.icon} size={24} color="white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric?.value}</div>
                  <div className="text-sm text-white text-opacity-80">{metric?.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;