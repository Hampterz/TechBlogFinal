import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import NotFound from "pages/NotFound";
import HomepageTechnicalPortfolioShowcase from './pages/homepage-technical-portfolio-showcase';
import ProjectDeepDive from './pages/project-deep-dive-raspberry-pi-nas-case-study';
import TechnicalKnowledgeHub from './pages/technical-knowledge-hub';
import InteractiveSkillsMatrix from './pages/interactive-skills-matrix';
// Admin imports disabled for public hosting
// import AdminProjectManagementDashboard from './pages/admin-project-management-dashboard';
// import SecretAdminProjectEditor from './pages/secret-admin-project-editor';
// Tutorial imports
import ReactTutorial from './pages/tutorials/react-js-complete-guide';
import JavaScriptTutorial from './pages/tutorials/javascript-mastery-guide';
import RaspberryPiTutorial from './pages/tutorials/raspberry-pi-complete-guide';

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={pageTransition?.initial}
      animate={pageTransition?.animate}
      exit={pageTransition?.exit}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location?.pathname}>
        <Route 
          path="/homepage-technical-portfolio-showcase" 
          element={
            <PageWrapper>
              <HomepageTechnicalPortfolioShowcase />
            </PageWrapper>
          } 
        />
        <Route 
          path="/project-deep-dive-raspberry-pi-nas-case-study" 
          element={
            <PageWrapper>
              <ProjectDeepDive />
            </PageWrapper>
          } 
        />
        <Route 
          path="/technical-knowledge-hub" 
          element={
            <PageWrapper>
              <TechnicalKnowledgeHub />
            </PageWrapper>
          } 
        />
        <Route 
          path="/interactive-skills-matrix" 
          element={
            <PageWrapper>
              <InteractiveSkillsMatrix />
            </PageWrapper>
          } 
        />
        {/* Admin routes disabled for public hosting */}
        {/* <Route 
          path="/secret-admin-project-editor" 
          element={
            <PageWrapper>
              <SecretAdminProjectEditor />
            </PageWrapper>
          } 
        />
        <Route 
          path="/admin-secret-dashboard-sreyas" 
          element={
            <PageWrapper>
              <SecretAdminProjectEditor />
            </PageWrapper>
          } 
        />
        <Route 
          path="/admin-project-management-dashboard" 
          element={
            <PageWrapper>
              <AdminProjectManagementDashboard />
            </PageWrapper>
          } 
        /> */}
        {/* Tutorial Routes */}
        <Route 
          path="/tutorials/react-js-complete-guide" 
          element={
            <PageWrapper>
              <ReactTutorial />
            </PageWrapper>
          } 
        />
        <Route 
          path="/tutorials/javascript-mastery-guide" 
          element={
            <PageWrapper>
              <JavaScriptTutorial />
            </PageWrapper>
          } 
        />
        <Route 
          path="/tutorials/raspberry-pi-complete-guide" 
          element={
            <PageWrapper>
              <RaspberryPiTutorial />
            </PageWrapper>
          } 
        />
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <HomepageTechnicalPortfolioShowcase />
            </PageWrapper>
          } 
        />
        <Route 
          path="*" 
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          } 
        />
      </RouterRoutes>
    </AnimatePresence>
  );
};

function Routes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AnimatedRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Routes;