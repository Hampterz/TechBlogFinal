import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    'Projects': [
      { name: 'Raspberry Pi 5 NAS', href: '/project-deep-dive-raspberry-pi-nas-case-study' },
      { name: 'IoT Weather Station', href: '#' },
      { name: 'Smart Home Dashboard', href: '#' },
      { name: 'All Projects', href: '#' }
    ],
    'Learning': [
      { name: 'Skills Matrix', href: '/interactive-skills-matrix' },
      { name: 'Knowledge Hub', href: '/technical-knowledge-hub' },
      { name: 'Tutorials', href: '#' },
      { name: 'Resources', href: '#' }
    ],
    'Connect': [
      { name: 'GitHub', href: 'https://github.com', external: true },
      { name: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { name: 'Email', href: 'mailto:hello@makerschronicle.dev' },
      { name: 'Discord', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', href: 'https://github.com' },
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'Discord', icon: 'MessageSquare', href: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Icon name="Code2" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">The Maker's Chronicle</h3>
                  <p className="text-slate-400 text-sm">Building Tomorrow, Documenting Today</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                A technical portfolio showcasing the journey from concept to creation, 
                sharing knowledge and inspiring the next generation of makers.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    target={social?.href?.startsWith('http') ? '_blank' : '_self'}
                    rel={social?.href?.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-300 group"
                    aria-label={social?.name}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={18} 
                      color="#94a3b8" 
                      className="group-hover:text-white transition-colors duration-300" 
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks)?.map(([category, links]) => (
              <div key={category} className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-6">{category}</h4>
                <ul className="space-y-3">
                  {links?.map((link) => (
                    <li key={link?.name}>
                      <a
                        href={link?.href}
                        target={link?.external ? '_blank' : '_self'}
                        rel={link?.external ? 'noopener noreferrer' : ''}
                        className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span>{link?.name}</span>
                        {link?.external && (
                          <Icon 
                            name="ExternalLink" 
                            size={14} 
                            color="currentColor" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-slate-400">
                Get notified about new projects, tutorials, and technical insights.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 flex-1 lg:w-64"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 text-sm">
              <p>&copy; {currentYear} The Maker's Chronicle. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors duration-300">Sitemap</a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Icon name="Heart" size={16} color="#ef4444" />
              <span>Made with passion for learning and sharing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;