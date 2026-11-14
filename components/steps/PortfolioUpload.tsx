import React, { useState } from 'react';
import { FormData, UploadProgress } from '../../types';
import { Button } from '../common/Button';
import { FileUpload } from '../form/FileUpload';

interface PortfolioUploadProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  isSubmitting: boolean;
  submissionError: string | null;
  uploadProgress: UploadProgress;
}

export const PortfolioUpload: React.FC<PortfolioUploadProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  isSubmitting,
  submissionError,
  uploadProgress,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validatePortfolio = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.portfolio.headshot.length === 0) {
      newErrors.headshot = 'At least one headshot is required';
    }
    
    if (formData.portfolio.fullBody.length === 0) {
      newErrors.fullBody = 'At least one full-body photo is required';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validatePortfolio()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold font-serif mb-2">Your Portfolio</h2>
        <p className="text-gray-200">Step 2 of 3 - Upload Your Photos & Video</p>
        <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
          <div className="bg-gold h-2 rounded-full" style={{ width: '66.66%' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-text-light mb-8 text-center">
          Upload high-quality photos and videos to showcase your talent. These will be reviewed by our professional casting team.
        </p>

        {/* Portfolio Sections */}
        <div className="space-y-8">
          {/* Headshots */}
          <div className="border-2 border-dashed border-primary rounded-lg p-8 hover:border-gold hover:bg-primary hover:bg-opacity-5 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-primary">Professional Headshot</h3>
              <span className="ml-auto text-red-500 font-semibold">*Required</span>
            </div>
            <p className="text-sm text-text-light mb-4">
              High-quality close-up photo of your face. This is essential for the casting team to assess your features.
            </p>
            <FileUpload
              label="Upload Headshot (JPG, PNG - Max 5MB)"
              accept="image/jpeg,image/png"
              multiple={true}
              onFilesSelect={(files) => updateFormData({
                portfolio: { ...formData.portfolio, headshot: files }
              })}
              files={formData.portfolio.headshot}
              progress={uploadProgress.headshot}
            />
            {errors.headshot && <p className="text-red-500 text-sm mt-2">{errors.headshot}</p>}
            {formData.portfolio.headshot.length > 0 && (
              <p className="text-green-600 text-sm mt-2">✓ {formData.portfolio.headshot.length} file(s) selected</p>
            )}
          </div>

          {/* Full Body */}
          <div className="border-2 border-dashed border-gold rounded-lg p-8 hover:border-primary hover:bg-gold hover:bg-opacity-5 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-primary">Full Body Photos</h3>
              <span className="ml-auto text-red-500 font-semibold">*Required</span>
            </div>
            <p className="text-sm text-text-light mb-4">
              Full-length photos showing your complete physique. Can be casual or professional attire.
            </p>
            <FileUpload
              label="Upload Full Body Photos (JPG, PNG - Max 5MB each)"
              accept="image/jpeg,image/png"
              multiple={true}
              onFilesSelect={(files) => updateFormData({
                portfolio: { ...formData.portfolio, fullBody: files }
              })}
              files={formData.portfolio.fullBody}
              progress={uploadProgress.fullBody}
            />
            {errors.fullBody && <p className="text-red-500 text-sm mt-2">{errors.fullBody}</p>}
            {formData.portfolio.fullBody.length > 0 && (
              <p className="text-green-600 text-sm mt-2">✓ {formData.portfolio.fullBody.length} file(s) selected</p>
            )}
          </div>

          {/* Profile Video */}
          <div className="border-2 border-dashed border-secondary rounded-lg p-8 hover:border-gold hover:bg-secondary hover:bg-opacity-5 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-primary">Profile/Introduction Video</h3>
              <span className="text-gray-500 font-semibold">Optional</span>
            </div>
            <p className="text-sm text-text-light mb-4">
              60-120 second video introducing yourself. This helps the casting team get a sense of your personality and presence.
            </p>
            <FileUpload
              label="Upload Video (MP4, MOV - Max 50MB)"
              accept="video/mp4,video/quicktime"
              multiple={false}
              onFilesSelect={(files) => updateFormData({
                portfolio: { ...formData.portfolio, profileVideo: files }
              })}
              files={formData.portfolio.profileVideo}
              progress={uploadProgress.profileVideo}
            />
            {formData.portfolio.profileVideo.length > 0 && (
              <p className="text-green-600 text-sm mt-2">✓ Video selected</p>
            )}
          </div>
        </div>

        {/* Guidelines Box */}
        <div className="mt-8 bg-blue-50 border-l-4 border-primary rounded-lg p-6">
          <h4 className="font-bold text-primary mb-3">📋 Photography Guidelines</h4>
          <ul className="space-y-2 text-sm text-text-light">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Ensure good lighting and clear, sharp images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>No heavy makeup filters or excessive editing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Natural hairstyle that accurately represents you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Headshots should be a neutral expression facing the camera</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>For full body: show your natural figure in everyday clothing</span>
            </li>
          </ul>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-gold rounded-lg p-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold cursor-pointer mt-1"
            />
            <div>
              <label htmlFor="terms" className="text-sm text-text-light cursor-pointer">
                <span className="font-semibold text-text-primary">I agree to the Terms & Conditions</span>
                <br />
                <span className="text-xs">
                  I confirm that I have uploaded my own genuine photographs and videos, and grant Sky Way Talents permission to use these materials for casting purposes only. 
                  All information provided is accurate and truthful. I understand this is a legitimate casting opportunity and I am seriously interested in pursuing this role.
                </span>
              </label>
            </div>
          </div>
          {errors.terms && <p className="text-red-500 text-sm mt-2">{errors.terms}</p>}
        </div>

        {/* Error Message */}
        {submissionError && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <p className="text-red-700 text-sm"><strong>Error:</strong> {submissionError}</p>
          </div>
        )}

        {/* Loading State */}
        {isSubmitting && (
          <div className="mt-6 bg-blue-50 border-l-4 border-primary rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-primary font-semibold">Submitting your application...</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          onClick={prevStep}
          disabled={isSubmitting}
          className="px-8 py-3 bg-gray-300 text-text-primary font-semibold rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
        >
          ← Back
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application →'}
        </Button>
      </div>
    </div>
  );
};
