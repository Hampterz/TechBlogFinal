import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Galaxy from '../../../components/ui/Galaxy';

const ReactTutorial = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedWeeks, setCompletedWeeks] = useState([]);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = React.useRef(null);

  // Intersection Observer for hero visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { rootMargin: '-200px' }
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

  const learningPath = [
    {
      week: 1,
      title: "React Fundamentals",
      duration: "4 weeks",
      difficulty: "Beginner",
      description: "Learn the basics of React, components, and JSX",
      topics: [
        "React Documentation Study",
        "Component Creation",
        "Props and State",
        "Event Handling"
      ],
      resources: [
        {
          title: "React Official Docs",
          url: "https://react.dev/learn",
          type: "Documentation",
          description: "Official React learning path"
        },
        {
          title: "MDN React Introduction",
          url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started",
          type: "Tutorial",
          description: "Comprehensive React introduction"
        }
      ],
      projects: [
        {
          title: "Component Library",
          description: "Build reusable components (buttons, cards, inputs)",
          code: `// Button Component Example
import React from 'react';

const Button = ({ children, variant = 'primary', onClick, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variants[variant]}\`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`
        }
      ]
    },
    {
      week: 2,
      title: "Hooks and State Management",
      duration: "4 weeks",
      difficulty: "Intermediate",
      description: "Master React hooks and state management patterns",
      topics: [
        "useState and useEffect",
        "Custom Hooks",
        "Context API",
        "State Lifting"
      ],
      resources: [
        {
          title: "Mosh React Tutorial",
          url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
          type: "Video",
          description: "Comprehensive React hooks tutorial"
        }
      ],
      projects: [
        {
          title: "Todo App with Hooks",
          description: "Build a todo application using hooks and localStorage",
          code: `// Todo App with Hooks
import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 px-3 py-2 border rounded-l-lg"
          placeholder="Add a todo..."
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={\`flex items-center p-2 border rounded \${todo.completed ? 'bg-gray-100' : 'bg-white'}\`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-3"
            />
            <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;`
        }
      ]
    },
    {
      week: 3,
      title: "Advanced React Patterns",
      duration: "8 weeks",
      difficulty: "Advanced",
      description: "Learn routing, context, and API integration",
      topics: [
        "React Router",
        "Context API",
        "API Integration",
        "Performance Optimization"
      ],
      resources: [
        {
          title: "Scrimba React Course",
          url: "https://www.youtube.com/watch?v=x4rFhThSX04",
          type: "Interactive Course",
          description: "Hands-on React course with coding challenges"
        }
      ],
      projects: [
        {
          title: "Portfolio Website",
          description: "Build a dynamic portfolio site with routing and API calls",
          code: `// Portfolio with React Router
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

// Context for theme
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <Link to="/" className="text-xl font-bold">My Portfolio</Link>
                <div className="space-x-6">
                  <Link to="/" className="hover:text-blue-600">Home</Link>
                  <Link to="/projects" className="hover:text-blue-600">Projects</Link>
                  <Link to="/about" className="hover:text-blue-600">About</Link>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default App;`
        }
      ]
    }
  ];

  const toggleWeekCompletion = (week) => {
    if (completedWeeks.includes(week)) {
      setCompletedWeeks(completedWeeks.filter(w => w !== week));
    } else {
      setCompletedWeeks([...completedWeeks, week]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Galaxy Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-12 overflow-hidden">
        {/* Galaxy Background */}
        {isHeroVisible && (
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
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6"></div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-reveal drop-shadow-lg">
              React.js Complete Guide
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Master React.js from fundamentals to advanced patterns. Build real-world applications with modern React practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span>16 weeks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span>Intermediate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Code" size={20} />
                <span>3 Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Learning Path</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Follow this structured 16-week journey to master React.js with hands-on projects and real-world applications.
              </p>
            </motion.div>

            {learningPath.map((phase, index) => (
              <motion.div
                key={phase.week}
                variants={itemVariants}
                className="bg-card rounded-2xl border border-border p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      completedWeeks.includes(phase.week) 
                        ? 'bg-conversion-accent text-white' 
                        : 'bg-brand-primary text-white'
                    }`}>
                      <Icon 
                        name={completedWeeks.includes(phase.week) ? "Check" : "BookOpen"} 
                        size={24} 
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary">{phase.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span>{phase.duration}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-lg ${
                          phase.difficulty === 'Beginner' ? 'bg-conversion-accent/10 text-conversion-accent' :
                          phase.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {phase.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={completedWeeks.includes(phase.week) ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleWeekCompletion(phase.week)}
                    iconName={completedWeeks.includes(phase.week) ? "Check" : "Play"}
                    iconPosition="left"
                  >
                    {completedWeeks.includes(phase.week) ? 'Completed' : 'Start'}
                  </Button>
                </div>

                <p className="text-text-secondary mb-6">{phase.description}</p>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">What You'll Learn:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-conversion-accent" />
                        <span className="text-text-primary">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">Resources:</h4>
                  <div className="space-y-2">
                    {phase.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                        <div>
                          <h5 className="font-medium text-text-primary">{resource.title}</h5>
                          <p className="text-sm text-text-secondary">{resource.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(resource.url, '_blank')}
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          Visit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {phase.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="bg-surface rounded-lg p-6">
                    <h4 className="font-semibold text-text-primary mb-3">{project.title}</h4>
                    <p className="text-text-secondary mb-4">{project.description}</p>
                    <details className="group">
                      <summary className="cursor-pointer text-brand-primary hover:text-brand-secondary font-medium">
                        View Code Example
                      </summary>
                      <pre className="mt-4 p-4 bg-background rounded-lg overflow-x-auto text-sm">
                        <code>{project.code}</code>
                      </pre>
                    </details>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Project */}
      <section className="py-16 bg-surface" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Final Project</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Apply everything you've learned by building a complete portfolio website with dynamic content, routing, and modern React patterns.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-8 shadow-brand">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Portfolio Website with React</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Features to Implement:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Responsive design with Tailwind CSS</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>React Router for navigation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Context API for theme management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>API integration for dynamic content</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Component library for reusability</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'Tailwind CSS', 'React Router', 'Context API', 'Vite'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => window.history.back()}
            >
              Back to Tutorials
            </Button>
            <Button
              variant="default"
              size="lg"
              iconName="Github"
              iconPosition="left"
              onClick={() => window.open('https://github.com/Hampterz/techblog-portfolio', '_blank')}
            >
              View Source Code
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReactTutorial;
