import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const TroubleshootingGuide = ({ issues }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIssue, setExpandedIssue] = useState(null);

  const filteredIssues = issues?.filter(issue =>
    issue?.problem?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    issue?.solution?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    issue?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  const toggleIssue = (index) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search troubleshooting issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          color="var(--color-muted-foreground)" 
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />
      </div>
      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p>No troubleshooting issues found matching your search.</p>
          </div>
        ) : (
          filteredIssues?.map((issue, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
              <button
                onClick={() => toggleIssue(index)}
                className="w-full px-6 py-4 text-left hover:bg-surface transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(issue?.severity)}`}>
                        {issue?.severity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{issue?.problem}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {issue?.tags?.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Icon 
                    name={expandedIssue === index ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    color="var(--color-muted-foreground)" 
                  />
                </div>
              </button>

              {expandedIssue === index && (
                <div className="px-6 pb-6 bg-surface/50 border-t border-border">
                  <div className="pt-4 space-y-4">
                    {/* Problem Description */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                        <span>Problem Description</span>
                      </h4>
                      <p className="text-text-secondary leading-relaxed">{issue?.description}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                        <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                        <span>Solution</span>
                      </h4>
                      <p className="text-text-secondary leading-relaxed mb-3">{issue?.solution}</p>
                      
                      {issue?.commands && (
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400 font-mono">Commands</span>
                            <button
                              onClick={() => navigator.clipboard?.writeText(issue?.commands)}
                              className="text-xs text-slate-400 hover:text-white transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
                            {(() => {
                              if (!issue?.commands) return null;
                              const lines = issue.commands.split('\n');
                              return lines.map((line, index) => {
                                const isComment = line.trim().startsWith('#');
                                const textColor = isComment ? 'text-white' : 'text-green-400';
                                return (
                                  <span key={index} className={textColor}>
                                    {line}
                                    {index < lines.length - 1 && '\n'}
                                  </span>
                                );
                              });
                            })()}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Prevention */}
                    {issue?.prevention && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                          <Icon name="Shield" size={16} color="var(--color-brand-primary)" />
                          <span>Prevention</span>
                        </h4>
                        <p className="text-text-secondary leading-relaxed">{issue?.prevention}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TroubleshootingGuide;