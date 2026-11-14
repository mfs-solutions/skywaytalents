import React, { useState } from 'react';
import { FormData } from '../../types';

interface FullBodyUploadStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const FullBodyUploadStep: React.FC<FullBodyUploadStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessages, setSuccessMessages] = useState<Record<string, string>>({});
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const maxFiles = 10;
  const mandatoryCount = 5;
  const currentFiles = formData.portfolio.fullBody || [];

  const handleFileSelect = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, [`file_${index}`]: 'Please select an image file' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors({ ...errors, [`file_${index}`]: 'File size must be less than 10MB' });
      return;
    }

    const newFiles = [...currentFiles];
    newFiles[index] = file;
    updateFormData({ portfolio: { ...formData.portfolio, fullBody: newFiles } });
    setErrors({ ...errors, [`file_${index}`]: '' });
    setSuccessMessages({ ...successMessages, [`file_${index}`]: 'Image uploaded successfully!' });
    setTimeout(() => {
      setSuccessMessages({ ...successMessages, [`file_${index}`]: '' });
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(index, file);
  };

  const validateUploads = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentFiles.length < mandatoryCount) {
      newErrors.fullBody = `Please upload at least ${mandatoryCount} full-body photos`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateUploads()) {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Full Body Photos</h2>
            <span className="text-sm font-semibold text-slate-600">Step 6 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-3">📋 Photography Guidelines</h3>
          <ul className="space-y-2 text-blue-800 text-sm md:text-base">
            <li>✓ Ensure good lighting and clear, sharp images</li>
            <li>✓ No heavy makeup filters or excessive editing</li>
            <li>✓ Show your natural figure in everyday clothing</li>
            <li>✓ Full body shots should display your complete body proportions</li>
            <li>✓ Natural pose, arms relaxed at sides or gently posed</li>
          </ul>
        </div>

        {/* Upload Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="mb-6">
            <p className="text-slate-700 mb-2">
              <span className="font-semibold text-primary">{mandatoryCount} images mandatory</span> • Up to {maxFiles} images total
            </p>
            <p className="text-slate-600 text-sm">
              Uploaded: {currentFiles.length}/{maxFiles}
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentFiles.length / maxFiles) * 100}%` }}
              ></div>
            </div>
          </div>

          {errors.fullBody && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold">{errors.fullBody}</p>
            </div>
          )}

          {/* Upload Boxes Grid - 5 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: maxFiles }).map((_, index) => (
              <div
                key={index}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(index);
                }}
                onDragLeave={() => setDragOverIndex(null)}
                className={`relative border-2 border-dashed rounded-lg p-4 md:p-6 text-center transition ${
                  dragOverIndex === index
                    ? 'border-primary bg-primary/5'
                    : currentFiles[index]
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-300 bg-slate-50 hover:border-primary'
                }`}
              >
                {currentFiles[index] ? (
                  <div className="space-y-2">
                    <div className="text-3xl">✓</div>
                    <p className="font-semibold text-green-700 text-xs md:text-sm line-clamp-2">
                      {currentFiles[index].name.substring(0, 20)}
                    </p>
                    {successMessages[`file_${index}`] && (
                      <p className="text-green-600 text-xs">{successMessages[`file_${index}`]}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = [...currentFiles];
                        newFiles.splice(index, 1);
                        updateFormData({ portfolio: { ...formData.portfolio, fullBody: newFiles } });
                      }}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xl md:text-2xl">📸</p>
                    <p className="text-slate-700 font-semibold text-xs md:text-sm">
                      Photo {index + 1}
                      {index < mandatoryCount && <span className="text-red-500 ml-1">*</span>}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(index, file);
                      }}
                      className="hidden"
                      id={`file_${index}`}
                    />
                    <label
                      htmlFor={`file_${index}`}
                      className="inline-block px-2 md:px-3 py-1 md:py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition text-xs font-semibold"
                    >
                      Choose
                    </label>
                    <p className="text-xs text-slate-500">or drag</p>
                  </div>
                )}
                {errors[`file_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">{errors[`file_${index}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-200"
          >
            Continue
          </button>
          <button
            onClick={prevStep}
            className="w-full bg-slate-300 text-slate-800 font-bold py-3 rounded-lg hover:bg-slate-400 transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
