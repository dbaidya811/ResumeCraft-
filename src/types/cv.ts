
export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft Skills' | 'Languages' | 'Tools';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface CVData {
  personalDetails: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}
