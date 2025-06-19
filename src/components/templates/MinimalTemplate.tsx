
import React from 'react';
import { CVData } from '@/types/cv';

interface MinimalTemplateProps {
  data: CVData;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-8 bg-white text-gray-900 min-h-[800px] font-sans max-w-2xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light mb-6 tracking-wide">
          {data.personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-1">
            {data.personalDetails.email && <p>{data.personalDetails.email}</p>}
            {data.personalDetails.phone && <p>{data.personalDetails.phone}</p>}
          </div>
          <div className="space-y-1">
            {data.personalDetails.location && <p>{data.personalDetails.location}</p>}
            {data.personalDetails.linkedIn && <p>{data.personalDetails.linkedIn}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalDetails.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed text-sm">{data.personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-6 text-gray-500 uppercase tracking-widest">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                    {exp.location && <p className="mt-1">{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-6 text-gray-500 uppercase tracking-widest">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    {edu.location && <p className="mt-1">{edu.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-6 text-gray-500 uppercase tracking-widest">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Technical', 'Soft Skills', 'Languages', 'Tools'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="font-medium mb-3 text-gray-900 text-sm">{category}</h3>
                  <div className="space-y-1">
                    {categorySkills.map((skill, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-400 text-xs">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-6 text-gray-500 uppercase tracking-widest">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                {project.technologies.length > 0 && (
                  <p className="text-xs text-gray-500 mb-2">
                    {project.technologies.join(' • ')}
                  </p>
                )}
                <p className="text-gray-700 text-sm leading-relaxed mb-1">{project.description}</p>
                {project.link && (
                  <p className="text-gray-500 text-xs">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
