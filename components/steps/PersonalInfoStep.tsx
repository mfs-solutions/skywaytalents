import React, { useState } from 'react';
import { FormData, AgeGroup, Ethnicity } from '../../types';
import { Button } from '../common/Button';
import { TextInput } from '../form/TextInput';
import { SelectInput } from '../form/SelectInput';

interface PersonalInfoStepProps {
  nextStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  nextStep,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required';
    if (!formData.ethnicity) newErrors.ethnicity = 'Ethnicity is required';

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
            <h2 className="text-xl md:text-2xl font-bold text-primary">Personal Information</h2>
            <span className="text-sm font-semibold text-slate-600">Step 1 of 7</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '14%' }}></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name *
              </label>
              <TextInput
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  updateFormData({ fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="Enter your full name"
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address *
              </label>
              <TextInput
                type="email"
                value={formData.email}
                onChange={(e) => {
                  updateFormData({ email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="your.email@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number *
              </label>
              <TextInput
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  updateFormData({ phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="+44 7000 000000"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Date of Birth *
              </label>
              <TextInput
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => {
                  updateFormData({ dateOfBirth: e.target.value });
                  if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
                }}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age Group *
              </label>
              <SelectInput
                value={formData.ageGroup}
                onChange={(e) => {
                  updateFormData({ ageGroup: e.target.value as AgeGroup });
                  if (errors.ageGroup) setErrors({ ...errors, ageGroup: '' });
                }}
                options={[
                  { value: '', label: 'Select your age group' },
                  { value: AgeGroup.YOUNG, label: '18-25 years' },
                  { value: AgeGroup.MIDDLE, label: '35-45 years' },
                  { value: AgeGroup.MATURE, label: '45+ years' },
                ]}
                className={errors.ageGroup ? 'border-red-500' : ''}
              />
              {errors.ageGroup && <p className="text-red-500 text-sm mt-1">{errors.ageGroup}</p>}
            </div>

            {/* Ethnicity */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ethnicity *
              </label>
              <SelectInput
                value={formData.ethnicity}
                onChange={(e) => {
                  updateFormData({ ethnicity: e.target.value as Ethnicity });
                  if (errors.ethnicity) setErrors({ ...errors, ethnicity: '' });
                }}
                options={[
                  { value: '', label: 'Select your ethnicity' },
                  { value: Ethnicity.WHITE, label: 'White' },
                  { value: Ethnicity.BLACK, label: 'Black' },
                  { value: Ethnicity.ASIAN, label: 'Asian' },
                  { value: Ethnicity.MIXED, label: 'Mixed' },
                  { value: Ethnicity.OTHER, label: 'Other' },
                ]}
                className={errors.ethnicity ? 'border-red-500' : ''}
              />
              {errors.ethnicity && <p className="text-red-500 text-sm mt-1">{errors.ethnicity}</p>}
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
          </div>
        </div>
      </div>
    </div>
  );
};
