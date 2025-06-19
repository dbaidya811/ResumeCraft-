
import React from 'react';
import { CVData } from '@/types/cv';

interface ClassicTemplateProps {
  data: CVData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="p-8 bg-white text-gray-900 min-h-[800px] font-serif">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {data.personalDetails.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails.location && <span>{data.personalDetails.location}</span>}
        </div>
        {(data.personalDetails.linkedIn || data.personalDetails.portfolio) && (
          <div className="flex justify-center items-center gap-8 text-sm text-gray-600 mt-2">
            {data.personalDetails.linkedIn && <span>{data.personalDetails.linkedIn}</span>}
            {data.personalDetails.portfolio && <span>{data.personalDetails.portfolio}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.personalDetails.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <p className="text-gray-600 italic">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed pl-4">
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
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600 italic">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm mt-1 pl-4">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Skills & Competencies
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {['Technical', 'Soft Skills', 'Languages', 'Tools'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="font-semibold mb-2 text-gray-700">{category}:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {categorySkills.map((skill, index) => (
                      <li key={index}>• {skill.name} ({skill.level})</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Notable Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600 italic mb-1">
                    Technologies: {project.technologies.join(', ')}
                  </p>
                )}
                <p className="text-gray-700 text-sm pl-4">{project.description}</p>
                {project.link && (
                  <p className="text-gray-600 text-sm pl-4 mt-1">Link: {project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
