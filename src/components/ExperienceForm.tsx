
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CVData, Experience } from '@/types/cv';
import { Plus, X } from 'lucide-react';

interface ExperienceFormProps {
  data: CVData;
  onUpdate: (section: keyof CVData, data: any) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdate('experience', [...data.experience, newExperience]);
    setEditingId(newExperience.id);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate('experience', updated);
  };

  const removeExperience = (id: string) => {
    onUpdate('experience', data.experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.experience.map((experience) => (
        <Card key={experience.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Experience Entry</h3>
            <Button
              onClick={() => removeExperience(experience.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`jobTitle-${experience.id}`}>Job Title *</Label>
              <Input
                id={`jobTitle-${experience.id}`}
                value={experience.jobTitle}
                onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                placeholder="Software Engineer"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`company-${experience.id}`}>Company *</Label>
              <Input
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                placeholder="Tech Corp"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor={`location-${experience.id}`}>Location</Label>
              <Input
                id={`location-${experience.id}`}
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                placeholder="New York, NY"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
              <Input
                id={`startDate-${experience.id}`}
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
              <Input
                id={`endDate-${experience.id}`}
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                disabled={experience.current}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={`current-${experience.id}`}
              checked={experience.current}
              onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
            />
            <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
          </div>

          <div>
            <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
            <Textarea
              id={`description-${experience.id}`}
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              className="mt-1 min-h-[80px]"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={addExperience}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
};
