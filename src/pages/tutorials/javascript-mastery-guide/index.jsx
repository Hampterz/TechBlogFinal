import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Galaxy from '../../../components/ui/Galaxy';

const JavaScriptTutorial = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [completedPhases, setCompletedPhases] = useState([]);
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
      phase: 1,
      title: "JavaScript Fundamentals",
      duration: "4 weeks",
      difficulty: "Beginner",
      description: "Master the core concepts of JavaScript including variables, functions, and control structures",
      topics: [
        "Variables and Data Types",
        "Functions and Scope",
        "Control Structures",
        "Arrays and Objects"
      ],
      resources: [
        {
          title: "FreeCodeCamp JavaScript",
          url: "https://freecodecamp.org/learn/javascript-algorithms-and-data-structures",
          type: "Interactive Course",
          description: "Complete JavaScript algorithms and data structures course"
        }
      ],
      projects: [
        {
          title: "Number Guessing Game",
          description: "Build a simple number guessing game with user input validation",
          code: `// Number Guessing Game
class NumberGuessingGame {
  constructor() {
    this.secretNumber = Math.floor(Math.random() * 100) + 1;
    this.attempts = 0;
    this.maxAttempts = 7;
  }

  guess(number) {
    this.attempts++;
    
    if (this.attempts > this.maxAttempts) {
      return {
        message: \`Game Over! The number was \${this.secretNumber}\`,
        gameOver: true
      };
    }

    if (number === this.secretNumber) {
      return {
        message: \`Congratulations! You guessed it in \${this.attempts} attempts!\`,
        gameOver: true
      };
    }

    const hint = number > this.secretNumber ? 'Too high!' : 'Too low!';
    return {
      message: \`\${hint} Attempts left: \${this.maxAttempts - this.attempts}\`,
      gameOver: false
    };
  }

  reset() {
    this.secretNumber = Math.floor(Math.random() * 100) + 1;
    this.attempts = 0;
  }
}

// Usage
const game = new NumberGuessingGame();
console.log(game.guess(50)); // Example guess`
        },
        {
          title: "Calculator App",
          description: "Create a basic calculator with arithmetic operations",
          code: `// Calculator Class
class Calculator {
  constructor() {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }

  inputNumber(number) {
    if (this.waitingForOperand) {
      this.display = String(number);
      this.waitingForOperand = false;
    } else {
      this.display = this.display === '0' ? String(number) : this.display + number;
    }
  }

  inputOperation(nextOperation) {
    const inputValue = parseFloat(this.display);

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operation) {
      const currentValue = this.previousValue || 0;
      const newValue = this.calculate(currentValue, inputValue, this.operation);

      this.display = String(newValue);
      this.previousValue = newValue;
    }

    this.waitingForOperand = true;
    this.operation = nextOperation;
  }

  calculate(firstValue, secondValue, operation) {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  }

  clear() {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }
}`
        }
      ]
    },
    {
      phase: 2,
      title: "Advanced JavaScript Concepts",
      duration: "8 weeks",
      difficulty: "Intermediate",
      description: "Deep dive into closures, async programming, and modern JavaScript features",
      topics: [
        "Closures and Scope",
        "Promises and Async/Await",
        "ES6+ Features",
        "Error Handling"
      ],
      resources: [
        {
          title: "You Don't Know JS",
          url: "https://github.com/getify/You-Dont-Know-JS",
          type: "Book Series",
          description: "Deep dive into JavaScript fundamentals"
        }
      ],
      projects: [
        {
          title: "Promise-based API Client",
          description: "Build an API client using modern async/await patterns",
          code: `// API Client with Promises
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Usage
const api = new APIClient('https://jsonplaceholder.typicode.com');

// Get all posts
api.get('/posts')
  .then(posts => console.log('Posts:', posts))
  .catch(error => console.error('Error:', error));

// Create a new post
api.post('/posts', {
  title: 'New Post',
  body: 'This is a new post',
  userId: 1
}).then(post => console.log('Created post:', post));`
        }
      ]
    },
    {
      phase: 3,
      title: "DOM Manipulation & Interactive Apps",
      duration: "12 weeks",
      difficulty: "Intermediate",
      description: "Master DOM manipulation and build interactive web applications",
      topics: [
        "DOM Selection and Manipulation",
        "Event Handling",
        "Local Storage",
        "Animation and Effects"
      ],
      resources: [
        {
          title: "LeetCode JavaScript Problems",
          url: "https://leetcode.com/problemset/all/",
          type: "Coding Challenges",
          description: "Practice JavaScript algorithms and data structures"
        }
      ],
      projects: [
        {
          title: "Memory Card Game",
          description: "Build a complete memory card matching game with scoring and animations",
          code: `// Memory Card Game
class MemoryGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.time = 0;
    this.timer = null;
    
    this.symbols = ['🎯', '🎨', '🎪', '🎭', '🎸', '🎹', '🎺', '🎻'];
    this.init();
  }

  init() {
    this.createCards();
    this.render();
    this.startTimer();
  }

  createCards() {
    const pairs = [...this.symbols, ...this.symbols];
    this.cards = this.shuffleArray(pairs).map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  render() {
    this.container.innerHTML = '';
    
    this.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = \`card \${card.isFlipped ? 'flipped' : ''} \${card.isMatched ? 'matched' : ''}\`;
      cardElement.innerHTML = \`
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">\${card.symbol}</div>
        </div>
      \`;
      
      cardElement.addEventListener('click', () => this.flipCard(card.id));
      this.container.appendChild(cardElement);
    });
  }

  flipCard(cardId) {
    const card = this.cards.find(c => c.id === cardId);
    
    if (card.isFlipped || card.isMatched || this.flippedCards.length >= 2) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);
    this.moves++;
    this.updateStats();

    if (this.flippedCards.length === 2) {
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    
    if (card1.symbol === card2.symbol) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.matchedPairs++;
      
      if (this.matchedPairs === this.symbols.length) {
        this.gameWin();
      }
    } else {
      card1.isFlipped = false;
      card2.isFlipped = false;
    }
    
    this.flippedCards = [];
    this.render();
  }

  updateStats() {
    document.getElementById('moves').textContent = this.moves;
    document.getElementById('time').textContent = this.time;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time++;
      this.updateStats();
    }, 1000);
  }

  gameWin() {
    clearInterval(this.timer);
    alert(\`Congratulations! You won in \${this.moves} moves and \${this.time} seconds!\`);
  }
}

// Initialize game
const game = new MemoryGame('game-container');`
        },
        {
          title: "Snake Game",
          description: "Create a classic Snake game with keyboard controls and scoring",
          code: `// Snake Game
class SnakeGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 20;
    this.tileCount = this.canvas.width / this.gridSize;
    
    this.snake = [{ x: 10, y: 10 }];
    this.food = this.generateFood();
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.gameRunning = true;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.gameLoop();
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameRunning) return;
      
      switch(e.key) {
        case 'ArrowUp':
          if (this.dy !== 1) {
            this.dx = 0;
            this.dy = -1;
          }
          break;
        case 'ArrowDown':
          if (this.dy !== -1) {
            this.dx = 0;
            this.dy = 1;
          }
          break;
        case 'ArrowLeft':
          if (this.dx !== 1) {
            this.dx = -1;
            this.dy = 0;
          }
          break;
        case 'ArrowRight':
          if (this.dx !== -1) {
            this.dx = 1;
            this.dy = 0;
          }
          break;
      }
    });
  }

  generateFood() {
    return {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
  }

  update() {
    if (!this.gameRunning) return;
    
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.gameOver();
      return;
    }
    
    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }
    
    this.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw snake
    this.ctx.fillStyle = 'lime';
    this.snake.forEach(segment => {
      this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    });
    
    // Draw food
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    
    // Draw score
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(\`Score: \${this.score}\`, 10, 30);
  }

  gameLoop() {
    this.update();
    this.draw();
    
    if (this.gameRunning) {
      setTimeout(() => this.gameLoop(), 150);
    }
  }

  gameOver() {
    this.gameRunning = false;
    this.ctx.fillStyle = 'white';
    this.ctx.font = '40px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.fillText(\`Final Score: \${this.score}\`, this.canvas.width / 2, this.canvas.height / 2 + 50);
  }
}

// Initialize game
const game = new SnakeGame('snake-canvas');`
        }
      ]
    }
  ];

  const togglePhaseCompletion = (phase) => {
    if (completedPhases.includes(phase)) {
      setCompletedPhases(completedPhases.filter(p => p !== phase));
    } else {
      setCompletedPhases([...completedPhases, phase]);
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
              JavaScript Mastery Guide
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Master JavaScript from fundamentals to advanced concepts. Build interactive games and web applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span>24 weeks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span>Intermediate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Code" size={20} />
                <span>4 Projects</span>
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
                Follow this comprehensive 24-week journey to master JavaScript with hands-on projects and coding challenges.
              </p>
            </motion.div>

            {learningPath.map((phase, index) => (
              <motion.div
                key={phase.phase}
                variants={itemVariants}
                className="bg-card rounded-2xl border border-border p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      completedPhases.includes(phase.phase) 
                        ? 'bg-conversion-accent text-white' 
                        : 'bg-brand-primary text-white'
                    }`}>
                      <Icon 
                        name={completedPhases.includes(phase.phase) ? "Check" : "Code"} 
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
                    variant={completedPhases.includes(phase.phase) ? "outline" : "default"}
                    size="sm"
                    onClick={() => togglePhaseCompletion(phase.phase)}
                    iconName={completedPhases.includes(phase.phase) ? "Check" : "Play"}
                    iconPosition="left"
                  >
                    {completedPhases.includes(phase.phase) ? 'Completed' : 'Start'}
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
              Apply everything you've learned by building a complete game or interactive application using pure JavaScript.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-8 shadow-brand">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Interactive Game Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Choose Your Project:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Memory Card Game with scoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Snake Game with keyboard controls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Calculator with advanced functions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Weather App with API integration</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Skills Demonstrated:</h4>
                <div className="flex flex-wrap gap-2">
                  {['ES6+ Features', 'DOM Manipulation', 'Event Handling', 'Async Programming', 'Local Storage', 'API Integration'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg text-sm">
                      {skill}
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

export default JavaScriptTutorial;
