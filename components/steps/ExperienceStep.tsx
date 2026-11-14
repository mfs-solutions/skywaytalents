import React, { useState } from 'react';
import { FormData } from '../../types';
import { TextInput } from '../form/TextInput';

interface ExperienceStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.experience.trim()) newErrors.experience = 'Experience information is required';
    if (!formData.availableFromDate) newErrors.availableFromDate = 'Availability date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Experience & Availability</h2>
            <span className="text-sm font-semibold text-slate-600">Step 3 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {/* Acting Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Acting Experience *
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => {
                  updateFormData({ experience: e.target.value });
                  if (errors.experience) setErrors({ ...errors, experience: '' });
                }}
                placeholder="Describe your acting experience, training, and previous roles..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition ${
                  errors.experience ? 'border-red-500' : 'border-slate-200'
                }`}
                rows={6}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            {/* Driving License */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Driving License</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.drivingLicense === true}
                    onChange={() => updateFormData({ drivingLicense: true })}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.drivingLicense === false}
                    onChange={() => updateFormData({ drivingLicense: false })}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">No</span>
                </label>
              </div>
            </div>

            {/* Own Car */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Own Car</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.ownCar === true}
                    onChange={() => updateFormData({ ownCar: true })}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.ownCar === false}
                    onChange={() => updateFormData({ ownCar: false })}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">No</span>
                </label>
              </div>
            </div>

            {/* Availability Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Available From *
              </label>
              <TextInput
                type="date"
                value={formData.availableFromDate}
                onChange={(e) => {
                  updateFormData({ availableFromDate: e.target.value });
                  if (errors.availableFromDate) setErrors({ ...errors, availableFromDate: '' });
                }}
                className={errors.availableFromDate ? 'border-red-500' : ''}
              />
              {errors.availableFromDate && <p className="text-red-500 text-sm mt-1">{errors.availableFromDate}</p>}
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Information (Optional)
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
                placeholder="Any additional information you'd like to share..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                rows={4}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3 mt-8">
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
    </div>
  );
};
