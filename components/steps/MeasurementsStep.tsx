import React, { useState } from 'react';
import { FormData } from '../../types';
import { Button } from '../common/Button';
import { TextInput } from '../form/TextInput';

interface MeasurementsStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const MeasurementsStep: React.FC<MeasurementsStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.measurements.height.trim()) newErrors.height = 'Height is required';
    if (!formData.measurements.weight.trim()) newErrors.weight = 'Weight is required';
    if (!formData.measurements.hairColour.trim()) newErrors.hairColour = 'Hair colour is required';
    if (!formData.measurements.eyeColour.trim()) newErrors.eyeColour = 'Eye colour is required';
    if (!formData.measurements.skinTone.trim()) newErrors.skinTone = 'Skin tone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const updateMeasurements = (field: keyof FormData['measurements'], value: string) => {
    updateFormData({
      measurements: {
        ...formData.measurements,
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
            <h2 className="text-xl md:text-2xl font-bold text-primary">Physical Characteristics</h2>
            <span className="text-sm font-semibold text-slate-600">Step 2 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '28%' }}></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Height *
              </label>
              <TextInput
                type="text"
                value={formData.measurements.height}
                onChange={(e) => {
                  updateMeasurements('height', e.target.value);
                  if (errors.height) setErrors({ ...errors, height: '' });
                }}
                placeholder='e.g., 5 feet 8 inches or 173cm'
                className={errors.height ? 'border-red-500' : ''}
              />
              {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Weight *
              </label>
              <TextInput
                type="text"
                value={formData.measurements.weight}
                onChange={(e) => {
                  updateMeasurements('weight', e.target.value);
                  if (errors.weight) setErrors({ ...errors, weight: '' });
                }}
                placeholder="e.g., 65kg or 143lbs"
                className={errors.weight ? 'border-red-500' : ''}
              />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
            </div>

            {/* Hair Colour */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hair Colour *
              </label>
              <TextInput
                type="text"
                value={formData.measurements.hairColour}
                onChange={(e) => {
                  updateMeasurements('hairColour', e.target.value);
                  if (errors.hairColour) setErrors({ ...errors, hairColour: '' });
                }}
                placeholder="e.g., Blonde, Brown, Black"
                className={errors.hairColour ? 'border-red-500' : ''}
              />
              {errors.hairColour && <p className="text-red-500 text-sm mt-1">{errors.hairColour}</p>}
            </div>

            {/* Eye Colour */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Eye Colour *
              </label>
              <TextInput
                type="text"
                value={formData.measurements.eyeColour}
                onChange={(e) => {
                  updateMeasurements('eyeColour', e.target.value);
                  if (errors.eyeColour) setErrors({ ...errors, eyeColour: '' });
                }}
                placeholder="e.g., Blue, Brown, Green"
                className={errors.eyeColour ? 'border-red-500' : ''}
              />
              {errors.eyeColour && <p className="text-red-500 text-sm mt-1">{errors.eyeColour}</p>}
            </div>

            {/* Skin Tone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Skin Tone *
              </label>
              <TextInput
                type="text"
                value={formData.measurements.skinTone}
                onChange={(e) => {
                  updateMeasurements('skinTone', e.target.value);
                  if (errors.skinTone) setErrors({ ...errors, skinTone: '' });
                }}
                placeholder="e.g., Fair, Olive, Dark"
                className={errors.skinTone ? 'border-red-500' : ''}
              />
              {errors.skinTone && <p className="text-red-500 text-sm mt-1">{errors.skinTone}</p>}
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
