import React, { useState } from 'react';
import { FormData, AgeGroup, Ethnicity } from '../../types';
import { Button } from '../common/Button';
import { TextInput } from '../form/TextInput';
import { SelectInput } from '../form/SelectInput';

interface ApplicationFormProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  nextStep,
  prevStep,
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
    if (!formData.measurements.height) newErrors.height = 'Height is required';
    if (!formData.measurements.weight) newErrors.weight = 'Weight is required';
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
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold font-serif mb-2">Application Form</h2>
        <p className="text-gray-200">Step 1 of 3 - Personal Information</p>
        <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
          <div className="bg-gold h-2 rounded-full" style={{ width: '33.33%' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Personal Information Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Full Name *"
              type="text"
              value={formData.fullName}
              onChange={(value) => updateFormData({ fullName: value })}
              placeholder="Enter your full name"
              error={errors.fullName}
            />
            
            <TextInput
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData({ email: value })}
              placeholder="your@email.com"
              error={errors.email}
            />

            <TextInput
              label="Phone Number *"
              type="tel"
              value={formData.phone}
              onChange={(value) => updateFormData({ phone: value })}
              placeholder="+44 (0)20 XXXX XXXX"
              error={errors.phone}
            />

            <TextInput
              label="Date of Birth *"
              type="date"
              value={formData.dateOfBirth}
              onChange={(value) => updateFormData({ dateOfBirth: value })}
              error={errors.dateOfBirth}
            />

            <SelectInput
              label="Age Group *"
              value={formData.ageGroup}
              onChange={(value) => updateFormData({ ageGroup: value as AgeGroup })}
              options={Object.values(AgeGroup).map(age => ({ value: age, label: age }))}
              error={errors.ageGroup}
            />

            <SelectInput
              label="Ethnicity *"
              value={formData.ethnicity}
              onChange={(value) => updateFormData({ ethnicity: value as Ethnicity })}
              options={Object.values(Ethnicity).map(eth => ({ value: eth, label: eth }))}
              error={errors.ethnicity}
            />
          </div>
        </div>

        {/* Physical Characteristics Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
            Physical Characteristics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Height (cm) *"
              type="number"
              value={formData.measurements.height}
              onChange={(value) => updateFormData({
                measurements: { ...formData.measurements, height: value }
              })}
              placeholder="e.g., 170"
              error={errors.height}
            />

            <TextInput
              label="Weight (kg) *"
              type="number"
              value={formData.measurements.weight}
              onChange={(value) => updateFormData({
                measurements: { ...formData.measurements, weight: value }
              })}
              placeholder="e.g., 65"
              error={errors.weight}
            />

            <TextInput
              label="Hair Colour"
              type="text"
              value={formData.measurements.hairColour}
              onChange={(value) => updateFormData({
                measurements: { ...formData.measurements, hairColour: value }
              })}
              placeholder="e.g., Brown, Blonde, Black"
            />

            <TextInput
              label="Eye Colour"
              type="text"
              value={formData.measurements.eyeColour}
              onChange={(value) => updateFormData({
                measurements: { ...formData.measurements, eyeColour: value }
              })}
              placeholder="e.g., Blue, Brown, Hazel"
            />

            <TextInput
              label="Skin Tone"
              type="text"
              value={formData.measurements.skinTone}
              onChange={(value) => updateFormData({
                measurements: { ...formData.measurements, skinTone: value }
              })}
              placeholder="e.g., Fair, Medium, Olive"
            />
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
            Professional Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Casting Role for Which You're Applying"
              type="text"
              value={formData.castingRole}
              onChange={(value) => updateFormData({ castingRole: value })}
              placeholder="e.g., Leading Role, Supporting Role"
            />

            <TextInput
              label="Years of Experience"
              type="text"
              value={formData.experience}
              onChange={(value) => updateFormData({ experience: value })}
              placeholder="e.g., 3 years in theatre and TV"
            />

            <TextInput
              label="Availability Date *"
              type="date"
              value={formData.availableFromDate}
              onChange={(value) => updateFormData({ availableFromDate: value })}
              error={errors.availableFromDate}
            />
          </div>

          {/* Checkboxes */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="drivingLicense"
                checked={formData.drivingLicense}
                onChange={(e) => updateFormData({ drivingLicense: e.target.checked })}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <label htmlFor="drivingLicense" className="ml-2 text-sm text-text-light cursor-pointer">
                Do you have a valid UK driving license?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownCar"
                checked={formData.ownCar}
                onChange={(e) => updateFormData({ ownCar: e.target.checked })}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <label htmlFor="ownCar" className="ml-2 text-sm text-text-light cursor-pointer">
                Do you own your own vehicle?
              </label>
            </div>
          </div>
        </div>

        {/* Content Comfort Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
            Content Comfort Level
          </h3>
          <p className="text-sm text-text-light mb-4">Please indicate your comfort level with the following content types:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'nude', label: 'Nude/Semi-nude scenes' },
              { key: 'underwear', label: 'Underwear/Lingerie scenes' },
              { key: 'violent', label: 'Violent scenes' },
              { key: 'romantic', label: 'Romantic/Intimate scenes' },
              { key: 'alcohol', label: 'Alcohol/Drug use scenes' },
            ].map(item => (
              <div key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.key}
                  checked={formData.contentComfort[item.key as keyof typeof formData.contentComfort]}
                  onChange={(e) => updateFormData({
                    contentComfort: {
                      ...formData.contentComfort,
                      [item.key]: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold cursor-pointer"
                />
                <label htmlFor={item.key} className="ml-2 text-sm text-text-light cursor-pointer">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">* Checking means you are comfortable with this content</p>
        </div>

        {/* Additional Information */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
            Additional Information
          </h3>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
            placeholder="Add any relevant information about your experience, special skills, or notes for the casting team..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          onClick={prevStep}
          className="px-8 py-3 bg-gray-300 text-text-primary font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          ← Back
        </Button>
        
        <Button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
        >
          Continue to Portfolio →
        </Button>
      </div>
    </div>
  );
};
