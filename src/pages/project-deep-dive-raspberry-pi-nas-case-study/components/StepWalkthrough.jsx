import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StepWalkthrough = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState(new Set([0]));

  const toggleStep = (index) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedSteps(newExpanded);
    setActiveStep(index);
  };

  return (
    <div className="space-y-4">
      {steps?.map((step, index) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleStep(index)}
            className="w-full px-6 py-4 bg-card hover:bg-surface transition-colors duration-200 flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                expandedSteps?.has(index) 
                  ? 'bg-brand-primary text-white' :'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{step?.title}</h3>
                <p className="text-sm text-muted-foreground">{step?.duration}</p>
              </div>
            </div>
            <Icon 
              name={expandedSteps?.has(index) ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              color="currentColor" 
            />
          </button>
          
          {expandedSteps?.has(index) && (
            <div className="px-6 pb-6 bg-surface/50">
              <div className="pt-4 space-y-4">
                <p className="text-text-secondary leading-relaxed">{step?.description}</p>
                
                {step?.commands && (
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-mono">Terminal</span>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Copy"
                        iconSize={14}
                        className="text-slate-400 hover:text-white"
                        onClick={() => navigator.clipboard?.writeText(step?.commands)}
                      >
                        Copy
                      </Button>
                    </div>
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {(() => {
                        if (!step?.commands) return null;
                        const lines = step.commands.split('\n');
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
                
                {step?.keyPoints && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Key Points:</h4>
                    <ul className="space-y-1">
                      {step?.keyPoints?.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                          <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepWalkthrough;