import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillDetailModal = ({ skill, isOpen, onClose }) => {
  if (!isOpen || !skill) return null;

  const getSkillColor = (skill) => {
    // Use category-based colors
    switch (skill?.category) {
      case 'Frontend':
        return 'bg-blue-500';
      case 'Backend':
        return 'bg-green-500';
      case 'DevOps':
        return 'bg-purple-500';
      case 'Hardware':
        return 'bg-red-500';
      case 'Design':
        return 'bg-pink-500';
      case 'System Admin':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const mockProjectDetails = {
    'React.js': [
      {
        name: 'TechBlog Portfolio',
        description: 'Interactive portfolio showcasing technical projects with dynamic components',
        technologies: ['React 18', 'Tailwind CSS', 'Framer Motion'],
        link: '/homepage-technical-portfolio-showcase',
        status: 'Live'
      },
      {
        name: 'Task Management Dashboard',
        description: 'Real-time collaborative task management with drag-and-drop functionality',
        technologies: ['React', 'Redux Toolkit', 'React DnD'],
        link: '#',
        status: 'In Development'
      }
    ],
    'Node.js': [
      {
        name: 'API Gateway Service',
        description: 'Microservices architecture with authentication and rate limiting',
        technologies: ['Node.js', 'Express', 'JWT', 'Redis'],
        link: '#',
        status: 'Completed'
      }
    ],
    'Docker': [
      {
        name: 'Raspberry Pi NAS',
        description: 'Containerized network-attached storage solution with web interface',
        technologies: ['Docker', 'Docker Compose', 'Nginx'],
        link: '/project-deep-dive-raspberry-pi-nas-case-study',
        status: 'Live'
      }
    ]
  };

  const mockLearningResources = {
    'React.js': [
      { title: 'React Docs', type: 'Documentation', url: 'https://react.dev/learn' },
      { title: 'MDN React Guide', type: 'Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started' },
      { title: 'React Tutorial (Mosh)', type: 'Tutorial', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
      { title: 'Scrimba React Course', type: 'Course', url: 'https://www.youtube.com/watch?v=x4rFhThSX04' },
      { title: 'Codecademy React', type: 'Course', url: 'https://www.codecademy.com/learn/react-101' }
    ],
    'JavaScript': [
      { title: 'freeCodeCamp JavaScript', type: 'Course', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures' },
      { title: 'You Don\'t Know JS', type: 'Book', url: 'https://github.com/getify/You-Dont-Know-JS' },
      { title: 'MDN JavaScript', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
    ],
    'HTML/CSS': [
      { title: 'MDN HTML', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { title: 'MDN CSS', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { title: 'CSS Tricks', type: 'Guide', url: 'https://css-tricks.com/guides/' },
      { title: 'Flexbox Froggy', type: 'Game', url: 'https://flexboxfroggy.com/' },
      { title: 'Grid Garden', type: 'Game', url: 'https://cssgridgarden.com/' }
    ],
    'Tailwind CSS': [
      { title: 'Tailwind Docs', type: 'Documentation', url: 'https://tailwindcss.com/docs' },
      { title: 'Tailwind UI', type: 'Components', url: 'https://tailwindui.com/' },
      { title: 'YouTube Crash Course', type: 'Tutorial', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' }
    ],
    'Python': [
      { title: 'Python Docs', type: 'Documentation', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Automate the Boring Stuff', type: 'Book', url: 'https://automatetheboringstuff.com/' },
      { title: 'Real Python', type: 'Tutorial', url: 'https://realpython.com/' }
    ],
    'Docker': [
      { title: 'Docker Labs', type: 'Tutorial', url: 'https://github.com/docker-archive-public/docker.labs' },
      { title: 'Docker Beginner Tutorial', type: 'Tutorial', url: 'https://www.youtube.com/watch?v=zT-7d1Ab1iE' },
      { title: 'Deploy to Raspberry Pi', type: 'Guide', url: 'https://blog.devops.dev/deploying-apps-to-your-raspberry-pi-using-git-docker-a481d32bcba3' }
    ],
    'Linux': [
      { title: 'The Linux Command Line', type: 'Book', url: 'http://linuxcommand.org/tlcl.php' },
      { title: 'Linux Journey', type: 'Course', url: 'https://linuxjourney.com/' },
      { title: 'OverTheWire (Bandit)', type: 'Game', url: 'https://overthewire.org/wargames/bandit/' }
    ],
    'Git': [
      { title: 'Raspberry Pi Git Tutorial', type: 'Tutorial', url: 'https://projects.raspberrypi.org/en/projects/getting-started-with-git' },
      { title: 'Pro Git Book', type: 'Book', url: 'https://git-scm.com/book/en/v2' },
      { title: 'GitHub Learning Lab', type: 'Course', url: 'https://lab.github.com/' }
    ],
    'Raspberry Pi': [
      { title: 'Raspberry Pi Guide', type: 'Guide', url: 'https://github.com/mikeroyal/Raspberry-Pi-Guide' },
      { title: '5 Raspberry Pi Projects', type: 'Tutorial', url: 'https://www.youtube.com/watch?v=udOidMbTdWk' },
      { title: 'Blender on Raspberry Pi', type: 'Guide', url: 'https://raspberrytips.com/blender-on-raspberry-pi/' }
    ],
    'Electronics': [
      { title: 'Raspberry Pi Guide', type: 'Guide', url: 'https://github.com/mikeroyal/Raspberry-Pi-Guide' },
      { title: '5 Raspberry Pi Projects', type: 'Tutorial', url: 'https://www.youtube.com/watch?v=udOidMbTdWk' },
      { title: 'Electronics Basics', type: 'Tutorial', url: 'https://www.youtube.com/watch?v=udOidMbTdWk' }
    ],
    'Blender 3D': [
      { title: 'Blender Manual', type: 'Documentation', url: 'https://docs.blender.org/manual/en/latest/' },
      { title: 'Blender Guru', type: 'Tutorial', url: 'https://www.youtube.com/user/BlenderGuru' }
    ],
    '3D Modeling': [
      { title: 'Blender Manual', type: 'Documentation', url: 'https://docs.blender.org/manual/en/latest/' },
      { title: 'Blender Guru', type: 'Tutorial', url: 'https://www.youtube.com/user/BlenderGuru' }
    ],
    '3D Animation': [
      { title: 'Blender Manual', type: 'Documentation', url: 'https://docs.blender.org/manual/en/latest/' },
      { title: 'Blender Guru', type: 'Tutorial', url: 'https://www.youtube.com/user/BlenderGuru' },
      { title: 'Animation Principles', type: 'Tutorial', url: 'https://www.youtube.com/user/BlenderGuru' }
    ],
    'Samba': [
      { title: 'Samba Docs', type: 'Documentation', url: 'https://www.samba.org/samba/docs/current/' },
      { title: 'Linux RAID (mdadm guide)', type: 'Guide', url: 'https://raid.wiki.kernel.org/index.php/Mdadm' },
      { title: 'Network File Sharing', type: 'Tutorial', url: 'https://www.samba.org/samba/docs/current/' }
    ],
    'RAID Management': [
      { title: 'Linux RAID (mdadm guide)', type: 'Guide', url: 'https://raid.wiki.kernel.org/index.php/Mdadm' },
      { title: 'Storage Systems', type: 'Tutorial', url: 'https://raid.wiki.kernel.org/index.php/Mdadm' },
      { title: 'Data Redundancy', type: 'Guide', url: 'https://raid.wiki.kernel.org/index.php/Mdadm' }
    ],
    'System Monitoring': [
      { title: 'Prometheus Docs', type: 'Documentation', url: 'https://prometheus.io/docs/introduction/overview/' },
      { title: 'Grafana Docs', type: 'Documentation', url: 'https://grafana.com/docs/' },
      { title: 'System Performance', type: 'Tutorial', url: 'https://prometheus.io/docs/introduction/overview/' }
    ]
  };

  const projects = mockProjectDetails?.[skill?.name] || [];
  const resources = mockLearningResources?.[skill?.name] || [];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Documentation':
        return 'FileText';
      case 'Course':
        return 'GraduationCap';
      case 'Tutorial':
        return 'PlayCircle';
      case 'Article':
        return 'BookOpen';
      case 'Guide':
        return 'Map';
      case 'Workshop':
        return 'Users';
      case 'Checklist':
        return 'CheckSquare';
      case 'Book':
        return 'BookOpen';
      case 'Game':
        return 'Gamepad2';
      case 'Components':
        return 'Layers';
      default:
        return 'Link';
    }
  };

  const getAcademicContext = (skillName) => {
    const academicContexts = {
      'React.js': {
        title: 'Frontend Development Learning',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'CS 4640 - Programming Languages for Web Applications',
          'Independent Study - Modern Frontend Frameworks',
          'Personal Projects - Portfolio Development'
        ]
      },
      'JavaScript': {
        title: 'Programming Fundamentals',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'CS 1110 - Introduction to Programming',
          'CS 2110 - Software Development Methods',
          'Personal Projects - Web Development'
        ]
      },
      'HTML/CSS': {
        title: 'Web Development Fundamentals',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'CS 1110 - Introduction to Programming',
          'Independent Study - Web Design Principles',
          'Personal Projects - Website Development'
        ]
      },
      'Tailwind CSS': {
        title: 'Modern CSS Framework Learning',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - Modern CSS Frameworks',
          'Personal Projects - Portfolio Styling',
          'Online Tutorials - Responsive Design'
        ]
      },
      'Python': {
        title: 'Backend Programming',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'CS 2110 - Software Development Methods',
          'Personal Projects - Automation Scripts',
          'Independent Study - Data Processing'
        ]
      },
      'Docker': {
        title: 'Containerization Technology',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - DevOps Practices',
          'Personal Projects - Raspberry Pi NAS',
          'Online Learning - Container Orchestration'
        ]
      },
      'Linux': {
        title: 'System Administration',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'CS 2150 - Program and Data Representation',
          'Personal Projects - Raspberry Pi Administration',
          'Independent Study - Unix/Linux Systems'
        ]
      },
      'Git': {
        title: 'Version Control Systems',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'CS 2110 - Software Development Methods',
          'Personal Projects - Code Management',
          'Independent Study - Collaborative Development'
        ]
      },
      'Raspberry Pi': {
        title: 'Hardware Integration',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - Embedded Systems',
          'Personal Projects - NAS Server Build',
          'Hardware Hacking - IoT Development'
        ]
      },
      'Electronics': {
        title: 'Hardware Design',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - Circuit Design',
          'Personal Projects - Hardware Assembly',
          'Online Learning - Electronic Components'
        ]
      },
      'Blender 3D': {
        title: '3D Design and Animation',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - 3D Modeling',
          'Personal Projects - Character Design',
          'Online Learning - Animation Principles'
        ]
      },
      '3D Modeling': {
        title: 'Digital Art and Design',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - 3D Art Creation',
          'Personal Projects - Environment Design',
          'Online Learning - Digital Sculpting'
        ]
      },
      '3D Animation': {
        title: 'Motion Graphics and Animation',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - Animation Techniques',
          'Personal Projects - Character Animation',
          'Online Learning - Motion Graphics'
        ]
      },
      'Samba': {
        title: 'Network File Sharing',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - Network Protocols',
          'Personal Projects - NAS Configuration',
          'Online Learning - File Sharing Systems'
        ]
      },
      'RAID Management': {
        title: 'Storage Systems Administration',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - Data Storage',
          'Personal Projects - RAID Configuration',
          'Online Learning - Storage Redundancy'
        ]
      },
      'System Monitoring': {
        title: 'System Performance Management',
        description: 'This skill was developed through practical application of concepts from:',
        courses: [
          'Independent Study - System Administration',
          'Personal Projects - Performance Tracking',
          'Online Learning - Monitoring Tools'
        ]
      }
    };

    return academicContexts[skillName] || {
      title: 'Skill Development',
      description: 'This skill was developed through practical application of concepts from:',
      courses: [
        'Independent Study - Self-directed Learning',
        'Personal Projects - Hands-on Experience',
        'Online Learning - Continuous Education'
      ]
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getSkillColor(skill)}`}>
              <Icon name={skill?.icon} size={24} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{skill?.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getSkillColor(skill)}`}>
                  {skill?.proficiency}
                </span>
                <span className="text-sm text-gray-600">{skill?.category}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Skill Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Proficiency</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{skill?.percentage}%</span>
                  <span className="text-sm text-gray-600">{skill?.proficiency}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getSkillColor(skill)}`}
                    style={{ width: `${skill?.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Experience</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{skill?.experience}</div>
              <div className="text-sm text-gray-600">{skill?.learningTimeline}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="FolderOpen" size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Projects</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{skill?.projectCount}</div>
              <div className="text-sm text-gray-600">Completed projects</div>
            </div>
          </div>

          {/* Recent Projects */}
          {projects?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects?.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{project?.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project?.status === 'Live' ? 'bg-emerald-100 text-emerald-700' :
                        project?.status === 'Completed'? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {project?.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project?.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project?.technologies?.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project?.link !== '#' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        onClick={() => window.open(project?.link, '_blank')}
                      >
                        View Project
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Resources */}
          {resources?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources?.map((resource, index) => (
                  <a 
                    key={index} 
                    href={resource?.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                      <Icon name={getResourceIcon(resource?.type)} size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{resource?.title}</p>
                      <p className="text-xs text-gray-600">{resource?.type}</p>
                    </div>
                    <Icon name="ExternalLink" size={14} className="text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Course Correlation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Context</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={16} color="white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">{getAcademicContext(skill?.name)?.title}</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    {getAcademicContext(skill?.name)?.description}
                  </p>
                  <ul className="space-y-1 text-sm text-blue-700">
                    {getAcademicContext(skill?.name)?.courses?.map((course, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailModal;