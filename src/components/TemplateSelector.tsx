
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with gradient accents',
      preview: 'bg-gradient-to-br from-blue-100 to-purple-100'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout with serif typography',
      preview: 'bg-gradient-to-br from-gray-100 to-blue-100'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant with focus on content',
      preview: 'bg-gradient-to-br from-slate-100 to-gray-100'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Choose Your CV Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="p-4">
              <div className={`h-24 rounded-md mb-3 ${template.preview}`} />
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              <Button
                variant={selectedTemplate === template.id ? "default" : "outline"}
                size="sm"
                className="mt-3 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateSelect(template.id);
                }}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
