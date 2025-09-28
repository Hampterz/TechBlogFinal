import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const RichTextEditor = ({ value, onChange, placeholder = "Start writing...", minHeight = 200 }) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);

  const handleFormatting = (format) => {
    const textarea = textareaRef?.current;
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = value?.substring(start, end);
    let newValue = value;

    switch (format) {
      case 'bold':
        newValue = value?.substring(0, start) + `**${selectedText || 'bold text'}**` + value?.substring(end);
        break;
      case 'italic':
        newValue = value?.substring(0, start) + `*${selectedText || 'italic text'}*` + value?.substring(end);
        break;
      case 'heading':
        newValue = value?.substring(0, start) + `## ${selectedText || 'Heading'}` + value?.substring(end);
        break;
      case 'list':
        newValue = value?.substring(0, start) + `- ${selectedText || 'List item'}` + value?.substring(end);
        break;
      case 'code':
        if (selectedText?.includes('\n')) {
          newValue = value?.substring(0, start) + `\`\`\`\n${selectedText || 'code block'}\n\`\`\`` + value?.substring(end);
        } else {
          newValue = value?.substring(0, start) + `\`${selectedText || 'code'}\`` + value?.substring(end);
        }
        break;
      case 'link':
        newValue = value?.substring(0, start) + `[${selectedText || 'link text'}](https://example.com)` + value?.substring(end);
        break;
      default:
        break;
    }

    onChange(newValue);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea?.focus();
      const newCursorPosition = start + newValue?.substring(start)?.indexOf(selectedText || format) + (selectedText?.length || 0);
      textarea?.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const renderPreview = (text) => {
    // Simple markdown-like rendering
    let html = text?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>')?.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')?.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-3">$1</h1>')?.replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')?.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')?.replace(/```\n([\s\S]*?)\n```/g, '<pre class="bg-gray-100 p-3 rounded mt-2 mb-2 overflow-x-auto"><code class="font-mono text-sm">$1</code></pre>')?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>')?.replace(/\n\n/g, '</p><p class="mb-3">')?.replace(/\n/g, '<br>');

    return `<p class="mb-3">${html}</p>`;
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFormatting('bold')}
            className="p-2"
            title="Bold"
          >
            <Icon name="Bold" size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFormatting('italic')}
            className="p-2"
            title="Italic"
          >
            <Icon name="Italic" size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFormatting('heading')}
            className="p-2"
            title="Heading"
          >
            <Icon name="Heading" size={16} />
          </Button>
          <div className="w-px h-6 bg-gray-300"></div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFormatting('list')}
            className="p-2"
            title="List"
          >
            <Icon name="List" size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFormatting('code')}
            className="p-2"
            title="Code"
          >
            <Icon name="Code" size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFormatting('link')}
            className="p-2"
            title="Link"
          >
            <Icon name="Link" size={16} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={!isPreview ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(false)}
            className="px-3"
          >
            <Icon name="Edit" size={14} className="mr-1" />
            Write
          </Button>
          <Button
            type="button"
            variant={isPreview ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(true)}
            className="px-3"
          >
            <Icon name="Eye" size={14} className="mr-1" />
            Preview
          </Button>
        </div>
      </div>
      {/* Editor */}
      <div className="relative">
        {!isPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e?.target?.value)}
            placeholder={placeholder}
            className="w-full p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            style={{ minHeight: `${minHeight}px` }}
          />
        ) : (
          <div 
            className="p-4 prose prose-sm max-w-none"
            style={{ minHeight: `${minHeight}px` }}
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        )}
      </div>
      {/* Character count */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
        <span>{value?.length} characters</span>
        <span className="text-gray-400">Supports Markdown formatting</span>
      </div>
    </div>
  );
};

export default RichTextEditor;