
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CVData, Skill } from '@/types/cv';
import { Plus, X } from 'lucide-react';

interface SkillsFormProps {
  data: CVData;
  onUpdate: (section: keyof CVData, data: any) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    onUpdate('skills', [...data.skills, newSkill]);
  };

  const updateSkill = (id: string, field: string, value: any) => {
    const updated = data.skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onUpdate('skills', updated);
  };

  const removeSkill = (id: string) => {
    onUpdate('skills', data.skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.skills.map((skill) => (
        <Card key={skill.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Skill Entry</h3>
            <Button
              onClick={() => removeSkill(skill.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor={`skill-name-${skill.id}`}>Skill Name *</Label>
              <Input
                id={`skill-name-${skill.id}`}
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                placeholder="JavaScript"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`skill-level-${skill.id}`}>Proficiency Level</Label>
              <Select 
                value={skill.level} 
                onValueChange={(value) => updateSkill(skill.id, 'level', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor={`skill-category-${skill.id}`}>Category</Label>
              <Select 
                value={skill.category} 
                onValueChange={(value) => updateSkill(skill.id, 'category', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      ))}

      <Button
        onClick={addSkill}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </Button>
    </div>
  );
};
