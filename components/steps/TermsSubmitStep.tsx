import React, { useState } from 'react';
import { FormData } from '../../types';

interface TermsSubmitStepProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  submissionError: string | null;
}

export const TermsSubmitStep: React.FC<TermsSubmitStepProps> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
  onSubmit,
  isSubmitting,
  submissionError,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await onSubmit();
        nextStep();
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Terms & Conditions</h2>
            <span className="text-sm font-semibold text-slate-600">Final Step</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Terms Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          {/* Terms Content */}
          <div className="mb-8 max-h-96 overflow-y-auto pr-4 space-y-6 text-sm md:text-base text-slate-700">
            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">1. Eligibility</h3>
              <p>By submitting this application, you confirm that you are at least 18 years old and legally eligible to work in the UK.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">2. Application Information</h3>
              <p>All information provided in this application must be accurate and truthful. Any false information may result in disqualification.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">3. Photography & Likeness Rights</h3>
              <p>You grant Sky Way Talents the right to use your submitted photographs and information for casting purposes and internal records.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">4. Confidentiality</h3>
              <p>Your personal information will be kept confidential and used only for casting purposes related to the upcoming series.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">5. No Guarantee</h3>
              <p>Submission of an application does not guarantee selection for the casting or the production. All decisions are at the sole discretion of the casting directors.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">6. Work Rights</h3>
              <p>You confirm that you have the legal right to work in the United Kingdom and agree to provide evidence of this if requested.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">7. Content Liability</h3>
              <p>You assume all responsibility for the content of photos and videos submitted. Sky Way Talents is not liable for any content you upload.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">8. Professional Conduct</h3>
              <p>You agree to conduct yourself professionally if selected for any interviews, auditions, or production work.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">9. Limitation of Liability</h3>
              <p>Sky Way Talents shall not be liable for any indirect, incidental, or consequential damages arising from your participation in this casting process.</p>
            </div>

            <div>
              <h3 className="font-bold text-primary text-base md:text-lg mb-2">10. Dispute Resolution</h3>
              <p>Any disputes arising from this application shall be resolved under English law and the exclusive jurisdiction of the English courts.</p>
            </div>
          </div>

          {/* Error Messages */}
          {errors.terms && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold text-sm md:text-base">{errors.terms}</p>
            </div>
          )}

          {submissionError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold text-sm md:text-base">{submissionError}</p>
            </div>
          )}

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition mb-6">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => {
                updateFormData({ termsAccepted: e.target.checked });
                if (errors.terms) setErrors({ ...errors, terms: '' });
              }}
              className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary mt-1 flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-slate-800 text-sm md:text-base">
                I accept the Terms & Conditions
              </p>
              <p className="text-xs md:text-sm text-slate-600">
                I have read and agree to all terms and conditions listed above
              </p>
            </div>
          </label>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <p className="text-blue-800 text-xs md:text-sm">
              <strong>Note:</strong> By submitting this application, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
              <div className="mb-4">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto"></div>
              </div>
              <p className="font-bold text-slate-800 text-lg">Submitting Application</p>
              <p className="text-slate-600 text-sm mt-2">Please wait while we process your submission...</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg transition duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <button
            onClick={prevStep}
            disabled={isSubmitting}
            className="w-full bg-slate-300 text-slate-800 font-bold py-3 rounded-lg hover:bg-slate-400 transition duration-200 disabled:opacity-70"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
