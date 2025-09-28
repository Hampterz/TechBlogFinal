import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPathSuggestions = ({ currentSkills, onPathSelect }) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const learningPaths = [
    {
      id: 'frontend-development',
      title: 'Frontend Development',
      description: 'Master modern web development with React, JavaScript, and CSS',
      difficulty: 'Intermediate',
      duration: '6-12 months',
      icon: 'Monitor',
      color: 'blue',
      skills: [
        {
          name: 'React.js',
          duration: '6 months',
          proficiency: '70%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'Read React Docs (https://react.dev/learn)',
                'Follow MDN React intro: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started',
                'Build a small component library (buttons, cards)'
              ]
            },
            {
              period: 'Weeks 5–8',
              tasks: [
                'Watch React tutorial (Mosh): https://www.youtube.com/watch?v=SqcY0GlETPk',
                'Make a Todo App with hooks + localStorage'
              ]
            },
            {
              period: 'Weeks 9–16',
              tasks: [
                'Scrimba React course: https://www.youtube.com/watch?v=x4rFhThSX04',
                'Add router, context, and simple API calls'
              ]
            }
          ],
          projectGoal: 'Portfolio site or blog with dynamic content'
        },
        {
          name: 'JavaScript',
          duration: '8 months',
          proficiency: '60%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'FreeCodeCamp: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures',
                'Build mini-games (guess number, calculator)'
              ]
            },
            {
              period: 'Weeks 5–12',
              tasks: [
                'Read "You Don\'t Know JS" https://github.com/getify/You-Dont-Know-JS',
                'Practice closures, async, promises'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'Solve coding challenges (LeetCode easy/medium)',
                'DOM practice with small interactive apps'
              ]
            }
          ],
          projectGoal: 'Build a simple game (memory cards or snake) fully in JS'
        },
        {
          name: 'HTML/CSS',
          duration: '1 year',
          proficiency: '80%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'MDN HTML: https://developer.mozilla.org/en-US/docs/Web/HTML',
                'MDN CSS: https://developer.mozilla.org/en-US/docs/Web/CSS'
              ]
            },
            {
              period: 'Weeks 5–12',
              tasks: [
                'Play Flexbox Froggy https://flexboxfroggy.com/ + Grid Garden https://cssgridgarden.com/',
                'Clone a simple landing page'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'Read CSS Tricks: https://css-tricks.com/guides/',
                'Practice transitions, animations, responsive design'
              ]
            }
          ],
          projectGoal: 'Clone a real website (e.g., Apple product page)'
        },
        {
          name: 'Tailwind CSS',
          duration: '6 months',
          proficiency: '60%',
          weeks: [
            {
              period: 'Weeks 1–2',
              tasks: [
                'Read Tailwind docs: https://tailwindcss.com/docs',
                'Build a simple card layout'
              ]
            },
            {
              period: 'Weeks 3–6',
              tasks: [
                'Tailwind YouTube crash course: https://www.youtube.com/watch?v=dFgzHOX84xQ',
                'Practice with components'
              ]
            },
            {
              period: 'Weeks 7–12',
              tasks: [
                'Use Tailwind UI examples: https://tailwindui.com/',
                'Create a responsive dashboard'
              ]
            }
          ],
          projectGoal: 'Portfolio or admin dashboard styled with Tailwind'
        }
      ]
    },
    {
      id: 'backend-devops',
      title: 'Backend & DevOps',
      description: 'Build robust backends and master deployment with Python, Docker, and Linux',
      difficulty: 'Intermediate',
      duration: '6-12 months',
      icon: 'Server',
      color: 'orange',
      skills: [
        {
          name: 'Python',
          duration: '1 year',
          proficiency: '70%',
          weeks: [
            {
              period: 'Weeks 1–6',
              tasks: [
                'Python tutorial: https://docs.python.org/3/tutorial/',
                'Automate the Boring Stuff: https://automatetheboringstuff.com/'
              ]
            },
            {
              period: 'Weeks 7–12',
              tasks: [
                'Real Python articles: https://realpython.com/',
                'Write scripts for daily tasks'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'Pick Flask or FastAPI → build APIs',
                'Make a blog backend or notes API'
              ]
            }
          ],
          projectGoal: 'REST API with authentication + database'
        },
        {
          name: 'Docker',
          duration: '3 months',
          proficiency: '50%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'Watch Docker beginner tutorial: https://www.youtube.com/watch?v=zT-7d1Ab1iE',
                'Run containers for Python apps'
              ]
            },
            {
              period: 'Weeks 5–8',
              tasks: [
                'Docker Labs: https://github.com/docker-archive-public/docker.labs',
                'Practice volumes, networks'
              ]
            },
            {
              period: 'Weeks 9–12',
              tasks: [
                'Deploy app to Raspberry Pi: https://blog.devops.dev/deploying-apps-to-your-raspberry-pi-using-git-docker-a481d32bcba3'
              ]
            }
          ],
          projectGoal: 'Containerize a full app (frontend + backend)'
        },
        {
          name: 'Linux',
          duration: '1 year',
          proficiency: '60%',
          weeks: [
            {
              period: 'Weeks 1–6',
              tasks: [
                'Linux Journey: https://linuxjourney.com/',
                'Try OverTheWire Bandit: https://overthewire.org/wargames/bandit/'
              ]
            },
            {
              period: 'Weeks 7–12',
              tasks: [
                'Read The Linux Command Line book: http://linuxcommand.org/tlcl.php',
                'Manage users, processes, permissions'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'Setup server on Pi or VM',
                'Learn cron jobs, networking, logs'
              ]
            }
          ],
          projectGoal: 'Host a personal site on your own Linux server'
        },
        {
          name: 'Git',
          duration: '8 months',
          proficiency: '60%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'Raspberry Pi Git tutorial: https://projects.raspberrypi.org/en/projects/getting-started-with-git',
                'Practice init, commit, push'
              ]
            },
            {
              period: 'Weeks 5–12',
              tasks: [
                'Pro Git Book: https://git-scm.com/book/en/v2',
                'Try branching, merging'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'GitHub Learning Lab: https://lab.github.com/',
                'Learn rebasing, cherry-pick'
              ]
            }
          ],
          projectGoal: 'Maintain all projects in GitHub repos'
        }
      ]
    },
    {
      id: 'hardware-design',
      title: 'Hardware & Design',
      description: 'Build physical projects and create stunning 3D designs',
      difficulty: 'Intermediate',
      duration: '6-12 months',
      icon: 'Cpu',
      color: 'red',
      skills: [
        {
          name: 'Raspberry Pi',
          duration: '1 year',
          proficiency: '80%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'Raspberry Pi Guide: https://github.com/mikeroyal/Raspberry-Pi-Guide',
                'Basic GPIO projects'
              ]
            },
            {
              period: 'Weeks 5–12',
              tasks: [
                'YouTube projects: https://www.youtube.com/watch?v=udOidMbTdWk',
                'Run Python scripts on Pi'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'Setup Pi as server, NAS, or smart home hub'
              ]
            }
          ],
          projectGoal: 'Build a Pi-based NAS or IoT device'
        },
        {
          name: 'Electronics',
          duration: '8 months',
          proficiency: '70%',
          weeks: [
            {
              period: 'Weeks 1–6',
              tasks: [
                'Learn basics: resistors, LEDs, transistors',
                'Breadboard practice'
              ]
            },
            {
              period: 'Weeks 7–12',
              tasks: [
                'Read datasheets, use Arduino + Pi',
                'Build small circuits (sensor, motor)'
              ]
            }
          ],
          projectGoal: 'Temperature/humidity monitoring system'
        },
        {
          name: 'Blender 3D',
          duration: '8 months',
          proficiency: '80%',
          weeks: [
            {
              period: 'Weeks 1–4',
              tasks: [
                'Learn Blender interface + navigation',
                'Model simple objects (cup, chair)'
              ]
            },
            {
              period: 'Weeks 5–12',
              tasks: [
                'Learn materials, textures, lighting',
                'Start Blender Guru\'s Donut tutorial'
              ]
            },
            {
              period: 'Weeks 13–24',
              tasks: [
                'Practice 3D modeling (rooms, characters)',
                'Start simple animations'
              ]
            }
          ],
          projectGoal: 'Short 3D scene with animation',
          resources: [
            'Blender Manual: https://docs.blender.org/manual/en/latest/',
            'Blender Guru: https://www.youtube.com/user/BlenderGuru'
          ]
        }
      ]
    },
    {
      id: 'system-admin',
      title: 'System Administration',
      description: 'Master server management, file sharing, and system monitoring',
      difficulty: 'Beginner',
      duration: '2-6 months',
      icon: 'Settings',
      color: 'purple',
      skills: [
        {
          name: 'Samba',
          duration: '3 months',
          proficiency: '40%',
          weeks: [
            {
              period: 'Weeks 1–12',
              tasks: [
                'Read docs: https://www.samba.org/samba/docs/current/',
                'Set up a Samba share on Linux'
              ]
            }
          ],
          projectGoal: 'Share files between Pi + Windows/Linux machines'
        },
        {
          name: 'RAID Management',
          duration: '3 months',
          proficiency: '65%',
          weeks: [
            {
              period: 'Weeks 1–12',
              tasks: [
                'Read mdadm guide: https://raid.wiki.kernel.org/index.php/Mdadm',
                'Practice RAID 1 on spare drives'
              ]
            }
          ],
          projectGoal: 'RAID 1 storage array on Pi NAS'
        },
        {
          name: 'System Monitoring',
          duration: '2 months',
          proficiency: '50%',
          weeks: [
            {
              period: 'Weeks 1–8',
              tasks: [
                'Prometheus Docs: https://prometheus.io/docs/introduction/overview/',
                'Grafana Docs: https://grafana.com/docs/',
                'Install on Pi or VM'
              ]
            }
          ],
          projectGoal: 'Dashboard showing CPU, RAM, disk, network'
        }
      ]
    }
  ];

  const getPathColor = (color, variant = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        light: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      orange: {
        bg: 'bg-orange-500',
        light: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200'
      },
      red: {
        bg: 'bg-red-500',
        light: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200'
      },
      purple: {
        bg: 'bg-purple-500',
        light: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200'
      }
    };
    return colors?.[color]?.[variant];
  };

  const extractUrl = (text) => {
    const urlMatch = text.match(/https?:\/\/[^\s)]+/);
    return urlMatch ? urlMatch[0] : null;
  };

  const renderTask = (task) => {
    const url = extractUrl(task);
    if (url) {
      const cleanTask = task.replace(url, '').trim();
      return (
        <div className="flex items-start space-x-2">
          <span className="text-gray-700">{cleanTask}</span>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm inline-flex items-center space-x-1"
          >
            <span>{url}</span>
            <Icon name="ExternalLink" size={12} className="text-blue-600" />
          </a>
        </div>
      );
    }
    return <span className="text-gray-700">{task}</span>;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 relative z-0">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-trust-builder to-brand-secondary rounded-2xl flex items-center justify-center">
          <Icon name="Route" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Useful Learning Tools</h3>
          <p className="text-sm text-gray-600">Structured learning paths and resources to advance your technical skills</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {learningPaths?.map((path) => (
          <div
            key={path?.id}
            className={`border-2 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
              selectedPath === path?.id
                ? `${getPathColor(path?.color, 'border')} bg-white shadow-xl scale-[1.02]`
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-[1.01]'
            }`}
            onClick={() => setSelectedPath(selectedPath === path?.id ? null : path?.id)}
          >
            {/* Path Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getPathColor(path?.color, 'bg')}`}>
                  <Icon name={path?.icon} size={28} color="white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{path?.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{path?.description}</p>
                </div>
              </div>
              <div className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Icon name={selectedPath === path?.id ? "ChevronUp" : "ChevronDown"} size={24} />
              </div>
            </div>

            {/* Path Metadata */}
            <div className="flex items-center space-x-6 mb-6">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getPathColor(path?.color, 'light')} ${getPathColor(path?.color, 'text')}`}>
                {path?.difficulty}
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Icon name="Clock" size={16} />
                <span className="font-medium">{path?.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Icon name="Target" size={16} />
                <span className="font-medium">{path?.skills?.length} skills</span>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-gray-700 mb-3">Skills Covered:</h5>
              <div className="flex flex-wrap gap-2">
                {path?.skills?.map((skill, index) => (
                  <div key={index} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-700">{skill?.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Details */}
            {selectedPath === path?.id && (
              <div className="space-y-8 border-t border-gray-200 pt-6 relative z-20 bg-white">
                {path?.skills?.map((skill, skillIndex) => (
                  <div key={skillIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPathColor(path?.color, 'bg')} shadow-md`}>
                          <Icon name="Code2" size={20} color="white" />
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-gray-900">{skill?.name}</h5>
                          <p className="text-sm text-gray-600">Learning progression and resources</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Weeks Timeline */}
                    <div className="space-y-4">
                      {skill?.weeks?.map((week, weekIndex) => (
                        <div key={weekIndex} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getPathColor(path?.color, 'bg')}`}>
                              {weekIndex + 1}
                            </div>
                            <h6 className="text-lg font-semibold text-gray-800">{week?.period}</h6>
                          </div>
                          <div className="space-y-3">
                            {week?.tasks?.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  {renderTask(task)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {/* Project Goal */}
                      {skill?.projectGoal && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon name="Target" size={18} className="text-white" />
                            </div>
                            <div>
                              <h6 className="text-lg font-semibold text-blue-900 mb-2">Project Goal</h6>
                              <p className="text-blue-800 leading-relaxed">{skill?.projectGoal}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  };
  
export default LearningPathSuggestions;