import React, { useState, useRef } from 'react';
import { PersonalDetailsForm } from '@/components/PersonalDetailsForm';
import { ExperienceForm } from '@/components/ExperienceForm';
import { EducationForm } from '@/components/EducationForm';
import { SkillsForm } from '@/components/SkillsForm';
import { ProjectsForm } from '@/components/ProjectsForm';
import { CVPreview } from '@/components/CVPreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';
import { CVData } from '@/types/cv';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  
  const [cvData, setCvData] = useState<CVData>({
    personalDetails: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedIn: '',
      portfolio: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const steps = [
    { title: 'Personal Details', component: PersonalDetailsForm },
    { title: 'Experience', component: ExperienceForm },
    { title: 'Education', component: EducationForm },
    { title: 'Skills', component: SkillsForm },
    { title: 'Projects', component: ProjectsForm }
  ];

  const updateCVData = (section: keyof CVData, data: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownload = async () => {
    if (!cvPreviewRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);
      
      // Clone the CV content
      const cvContent = cvPreviewRef.current.querySelector('.cv-template');
      if (cvContent) {
        const clonedContent = cvContent.cloneNode(true) as HTMLElement;
        clonedContent.style.width = '800px';
        clonedContent.style.transform = 'scale(1)';
        tempDiv.appendChild(clonedContent);
        
        // Generate canvas from the temporary div
        const canvas = await html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: 800,
          height: tempDiv.scrollHeight
        });
        
        // Create PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        
        // Download the PDF
        const fileName = `${cvData.personalDetails.fullName || 'CV'}.pdf`;
        pdf.save(fileName);
      }
      
      // Clean up
      document.body.removeChild(tempDiv);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Professional CV Builder
          </h1>
          <p className="text-gray-600">Create a stunning resume in minutes</p>
        </div>

        {/* Template Selector */}
        <TemplateSelector 
          selectedTemplate={selectedTemplate}
          onTemplateSelect={setSelectedTemplate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              {/* Current Form Component */}
              <CurrentStepComponent
                data={cvData}
                onUpdate={updateCVData}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`} ref={cvPreviewRef}>
            <CVPreview 
              data={cvData} 
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
