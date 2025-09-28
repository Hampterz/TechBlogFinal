import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeBlock = ({ title, language, code, filename, variant = 'default' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const renderCodeWithSyntaxHighlighting = (code) => {
    if (!code) return null;
    const lines = code.split('\n');
    return lines.map((line, index) => {
      const isComment = line.trim().startsWith('#');
      const textColor = isComment ? 'text-white' : (variant === 'green' ? 'text-green-400' : 'text-slate-100');
      
      return (
        <span key={index} className={textColor}>
          {line}
          {index < lines.length - 1 && '\n'}
        </span>
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="FileCode" size={16} color="var(--color-brand-primary)" />
          <div>
            <h4 className="font-medium text-foreground">{title}</h4>
            {filename && (
              <p className="text-xs text-muted-foreground font-mono">{filename}</p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={copied ? "Check" : "Copy"}
          iconSize={16}
          onClick={handleCopy}
          className={copied ? "text-success" : "text-muted-foreground hover:text-foreground"}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="bg-slate-900 p-4 overflow-x-auto">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-slate-400 ml-2">{language}</span>
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed">
          {renderCodeWithSyntaxHighlighting(code)}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;