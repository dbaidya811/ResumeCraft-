
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData, Project } from '@/types/cv';
import { Plus, X } from 'lucide-react';

interface ProjectsFormProps {
  data: CVData;
  onUpdate: (section: keyof CVData, data: any) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onUpdate }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    };
    onUpdate('projects', [...data.projects, newProject]);
  };

  const updateProject = (id: string, field: string, value: any) => {
    if (field === 'technologies') {
      const techArray = value.split(',').map((tech: string) => tech.trim()).filter(Boolean);
      value = techArray;
    }
    
    const updated = data.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    onUpdate('projects', updated);
  };

  const removeProject = (id: string) => {
    onUpdate('projects', data.projects.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.projects.map((project) => (
        <Card key={project.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Project Entry</h3>
            <Button
              onClick={() => removeProject(project.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`project-name-${project.id}`}>Project Name *</Label>
              <Input
                id={`project-name-${project.id}`}
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="E-commerce Platform"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`project-link-${project.id}`}>Project Link</Label>
              <Input
                id={`project-link-${project.id}`}
                value={project.link || ''}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`project-startDate-${project.id}`}>Start Date</Label>
              <Input
                id={`project-startDate-${project.id}`}
                type="month"
                value={project.startDate}
                onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`project-endDate-${project.id}`}>End Date</Label>
              <Input
                id={`project-endDate-${project.id}`}
                type="month"
                value={project.endDate}
                onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor={`project-technologies-${project.id}`}>Technologies Used</Label>
            <Input
              id={`project-technologies-${project.id}`}
              value={project.technologies.join(', ')}
              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              placeholder="React, Node.js, MongoDB, AWS"
              className="mt-1"
              title="Separate technologies with commas"
            />
            <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
          </div>

          <div>
            <Label htmlFor={`project-description-${project.id}`}>Project Description</Label>
            <Textarea
              id={`project-description-${project.id}`}
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Describe the project, your role, and key achievements..."
              className="mt-1 min-h-[80px]"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={addProject}
        variant="outline"
        className="w-full flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </Button>
    </div>
  );
};
