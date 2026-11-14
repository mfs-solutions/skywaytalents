import React, { useState } from 'react';
import { FormData } from '../../types';

interface HeadshotUploadStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  uploadProgress: Record<string, number>;
}

export const HeadshotUploadStep: React.FC<HeadshotUploadStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  uploadProgress,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessages, setSuccessMessages] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<Record<string, boolean>>({});
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const maxFiles = 4;
  const mandatoryCount = 2;
  const currentFiles = formData.portfolio.headshot || [];

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
    updateFormData({ portfolio: { ...formData.portfolio, headshot: newFiles } });
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
      newErrors.headshot = `Please upload at least ${mandatoryCount} headshots`;
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
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Headshot Photos</h2>
            <span className="text-sm font-semibold text-slate-600">Step 5 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-3">📋 Photography Guidelines</h3>
          <ul className="space-y-2 text-blue-800 text-sm md:text-base">
            <li>✓ Ensure good lighting and clear, sharp images</li>
            <li>✓ No heavy makeup filters or excessive editing</li>
            <li>✓ Natural hairstyle that accurately represents you</li>
            <li>✓ Headshots should be a neutral expression facing the camera</li>
            <li>✓ Show your natural features and current appearance</li>
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

          {errors.headshot && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold">{errors.headshot}</p>
            </div>
          )}

          {/* Upload Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: maxFiles }).map((_, index) => (
              <div
                key={index}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(index);
                }}
                onDragLeave={() => setDragOverIndex(null)}
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition ${
                  dragOverIndex === index
                    ? 'border-primary bg-primary/5'
                    : currentFiles[index]
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-300 bg-slate-50 hover:border-primary'
                }`}
              >
                {currentFiles[index] ? (
                  <div className="space-y-3">
                    <div className="text-4xl">✓</div>
                    <p className="font-semibold text-green-700 text-sm md:text-base">
                      {currentFiles[index].name.substring(0, 30)}
                    </p>
                    {successMessages[`file_${index}`] && (
                      <p className="text-green-600 text-xs md:text-sm">{successMessages[`file_${index}`]}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = [...currentFiles];
                        newFiles.splice(index, 1);
                        updateFormData({ portfolio: { ...formData.portfolio, headshot: newFiles } });
                      }}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl">📸</p>
                    <p className="text-slate-700 font-semibold text-sm md:text-base">
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
                      className="inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition text-xs md:text-sm font-semibold"
                    >
                      Choose Image
                    </label>
                    <p className="text-xs text-slate-500">or drag and drop</p>
                  </div>
                )}
                {errors[`file_${index}`] && (
                  <p className="text-red-500 text-xs mt-2">{errors[`file_${index}`]}</p>
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
