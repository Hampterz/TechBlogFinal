import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsVisualization from './components/SkillsVisualization';
import LearningTimeline from './components/LearningTimeline';
import SocialProof from './components/SocialProof';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PageTransition from '../../components/ui/PageTransition';

const HomepageTechnicalPortfolioShowcase = () => {
  useEffect(() => {
    // Set page title
    document.title = "My Personal Tech Blog - Learning & Building";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'My personal tech blog documenting my learning journey in high school. Sharing projects, learning experiences, and growth in technology. From a beginner\'s perspective to inspire other students.');
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          <HeroSection />
          <ProjectShowcase />
          <SkillsVisualization />
          <LearningTimeline />
          <SocialProof />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default HomepageTechnicalPortfolioShowcase;