
import React from 'react';
import { CVData } from '@/types/cv';

interface ModernTemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="p-8 bg-white text-gray-900 min-h-[800px]">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">
            {data.personalDetails.fullName || 'Your Name'}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              {data.personalDetails.email && (
                <p>📧 {data.personalDetails.email}</p>
              )}
              {data.personalDetails.phone && (
                <p>📱 {data.personalDetails.phone}</p>
              )}
            </div>
            <div className="space-y-1">
              {data.personalDetails.location && (
                <p>📍 {data.personalDetails.location}</p>
              )}
              {data.personalDetails.linkedIn && (
                <p>💼 {data.personalDetails.linkedIn}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalDetails.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    {edu.location && <p>{edu.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {['Technical', 'Soft Skills', 'Languages', 'Tools'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="font-semibold mb-2 text-purple-600">{category}</h3>
                  <div className="space-y-1">
                    {categorySkills.map((skill, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500 ml-2">({skill.level})</span>
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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-100 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-700 text-sm">{project.description}</p>
                {project.link && (
                  <p className="text-blue-600 text-sm mt-1">🔗 {project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
