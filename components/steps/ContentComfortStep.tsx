import React, { useState } from 'react';
import { FormData } from '../../types';

interface ContentComfortStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const ContentComfortStep: React.FC<ContentComfortStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}) => {
  const updateContentComfort = (field: keyof FormData['contentComfort'], value: boolean) => {
    updateFormData({
      contentComfort: {
        ...formData.contentComfort,
        [field]: value,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Content Comfort Level</h2>
            <span className="text-sm font-semibold text-slate-600">Step 4 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '56%' }}></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Please indicate which types of content you're comfortable with. This helps us match you with appropriate roles.
            </p>
          </div>

          <div className="space-y-4">
            {/* Nude Scenes */}
            <label className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.contentComfort.nude}
                onChange={(e) => updateContentComfort('nude', e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <div className="ml-3">
                <p className="font-semibold text-slate-800">Nude Scenes</p>
                <p className="text-sm text-slate-600">Comfortable with nude or semi-nude scenes</p>
              </div>
            </label>

            {/* Underwear Scenes */}
            <label className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.contentComfort.underwear}
                onChange={(e) => updateContentComfort('underwear', e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <div className="ml-3">
                <p className="font-semibold text-slate-800">Underwear Scenes</p>
                <p className="text-sm text-slate-600">Comfortable with underwear scenes</p>
              </div>
            </label>

            {/* Violent Scenes */}
            <label className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.contentComfort.violent}
                onChange={(e) => updateContentComfort('violent', e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <div className="ml-3">
                <p className="font-semibold text-slate-800">Violent Scenes</p>
                <p className="text-sm text-slate-600">Comfortable with violence or action sequences</p>
              </div>
            </label>

            {/* Romantic Scenes */}
            <label className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.contentComfort.romantic}
                onChange={(e) => updateContentComfort('romantic', e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <div className="ml-3">
                <p className="font-semibold text-slate-800">Romantic Scenes</p>
                <p className="text-sm text-slate-600">Comfortable with kissing and romantic scenes</p>
              </div>
            </label>

            {/* Alcohol Use */}
            <label className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.contentComfort.alcohol}
                onChange={(e) => updateContentComfort('alcohol', e.target.checked)}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <div className="ml-3">
                <p className="font-semibold text-slate-800">Alcohol or Drug Use</p>
                <p className="text-sm text-slate-600">Comfortable with scenes involving alcohol or simulated drug use</p>
              </div>
            </label>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={nextStep}
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
    </div>
  );
};
