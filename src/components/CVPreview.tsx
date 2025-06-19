
import React from 'react';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';

interface CVPreviewProps {
  data: CVData;
  template: string;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <Card className="sticky top-4">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <p className="text-sm text-gray-600">See how your CV looks in real-time</p>
      </div>
      <div className="p-4">
        <div className="bg-white border rounded-lg shadow-sm max-h-[600px] overflow-y-auto cv-template">
          {renderTemplate()}
        </div>
      </div>
    </Card>
  );
};
