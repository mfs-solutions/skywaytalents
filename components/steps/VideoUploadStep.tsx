import React, { useState } from 'react';
import { FormData } from '../../types';

interface VideoUploadStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const VideoUploadStep: React.FC<VideoUploadStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const currentFiles = formData.portfolio.profileVideo || [];

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('video/') && !file.type.startsWith('image/')) {
      setErrors({ video: 'Please select a video or image file' });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setErrors({ video: 'File size must be less than 100MB' });
      return;
    }

    const newFiles = [file];
    updateFormData({ portfolio: { ...formData.portfolio, profileVideo: newFiles } });
    setErrors({});
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Profile Introduction Video</h2>
            <span className="text-sm font-semibold text-slate-600">Step 7 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm md:text-base">
              <strong>Optional:</strong> Upload a brief introduction video (30-60 seconds) or skip this step. This helps casting directors get to know you better!
            </p>
          </div>

          {errors.video && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold text-sm md:text-base">{errors.video}</p>
            </div>
          )}

          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition ${
              dragOver
                ? 'border-primary bg-primary/5'
                : currentFiles.length > 0
                ? 'border-green-300 bg-green-50'
                : 'border-slate-300 bg-slate-50 hover:border-primary'
            }`}
          >
            {currentFiles.length > 0 ? (
              <div className="space-y-3">
                <div className="text-6xl">✓</div>
                <p className="font-semibold text-green-700 text-base md:text-lg">
                  {currentFiles[0].name}
                </p>
                <p className="text-sm text-green-600">
                  {(currentFiles[0].size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={() => {
                    updateFormData({ portfolio: { ...formData.portfolio, profileVideo: [] } });
                  }}
                  className="text-red-500 hover:text-red-700 underline text-sm"
                >
                  Remove and Upload Different File
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-4xl md:text-5xl">🎥</p>
                <div>
                  <p className="font-semibold text-slate-800 text-base md:text-lg mb-2">
                    Upload Your Introduction Video
                  </p>
                  <p className="text-slate-600 text-sm md:text-base mb-4">
                    30-60 seconds • MP4, WebM, or MOV format
                  </p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                  id="video_file"
                />
                <label
                  htmlFor="video_file"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition font-semibold"
                >
                  Choose Video File
                </label>
                <p className="text-xs md:text-sm text-slate-500">or drag and drop</p>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm md:text-base font-bold text-blue-900 mb-2">📋 Video Tips</h3>
            <ul className="space-y-1 text-blue-800 text-xs md:text-sm">
              <li>✓ Introduce yourself with your name and age</li>
              <li>✓ Speak clearly and naturally</li>
              <li>✓ Good lighting and clear audio</li>
              <li>✓ Show your personality and enthusiasm</li>
              <li>✓ Keep it between 30-60 seconds</li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-200"
          >
            {currentFiles.length > 0 ? 'Continue' : 'Skip & Continue'}
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
