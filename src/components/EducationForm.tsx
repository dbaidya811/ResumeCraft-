
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData, Education } from '@/types/cv';
import { Plus, X } from 'lucide-react';

interface EducationFormProps {
  data: CVData;
  onUpdate: (section: keyof CVData, data: any) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onUpdate }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    onUpdate('education', [...data.education, newEducation]);
  };

  const updateEducation = (id: string, field: string, value: any) => {
    const updated = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate('education', updated);
  };

  const removeEducation = (id: string) => {
    onUpdate('education', data.education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.education.map((education) => (
        <Card key={education.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Education Entry</h3>
            <Button
              onClick={() => removeEducation(education.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
              <Input
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
              <Input
                id={`institution-${education.id}`}
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                placeholder="University of Technology"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor={`edu-location-${education.id}`}>Location</Label>
              <Input
                id={`edu-location-${education.id}`}
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                placeholder="Boston, MA"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`edu-startDate-${education.id}`}>Start Date</Label>
              <Input
                id={`edu-startDate-${education.id}`}
                type="month"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`edu-endDate-${education.id}`}>End Date</Label>
              <Input
                id={`edu-endDate-${education.id}`}
                type="month"
                value={education.endDate}
                onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
            <Input
              id={`gpa-${education.id}`}
              value={education.gpa || ''}
              onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
              placeholder="3.8/4.0"
              className="mt-1 max-w-32"
            />
          </div>

          <div>
            <Label htmlFor={`edu-description-${education.id}`}>Additional Details</Label>
            <Textarea
              id={`edu-description-${education.id}`}
              value={education.description || ''}
              onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
              placeholder="Relevant coursework, honors, activities..."
              className="mt-1 min-h-[60px]"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={addEducation}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </Button>
    </div>
  );
};
