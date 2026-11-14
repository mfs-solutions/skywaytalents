import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PersonalInfoStep } from './PersonalInfoStep';
import { MeasurementsStep } from './MeasurementsStep';
import { ExperienceStep } from './ExperienceStep';
import { ContentComfortStep } from './ContentComfortStep';
import { HeadshotUploadStep } from './HeadshotUploadStep';
import { FullBodyUploadStep } from './FullBodyUploadStep';
import { VideoUploadStep } from './VideoUploadStep';
import { TermsSubmitStep } from './TermsSubmitStep';
import { SuccessPage } from './SuccessPage';
import { LandingPage } from './LandingPage';
import { FormData, initialFormData, UploadProgress } from '../../types';
import { submitApplicationToSupabase } from '../../lib/supabaseService';
import { ConfigErrorOverlay } from '../common/ConfigErrorOverlay';

export const ApplicationWrapper: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = parseInt(searchParams.get('step') || '0');

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [isLoading, setIsLoading] = useState(false);

  const [isInitializing, setIsInitializing] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    // Supabase initializes automatically, no async setup needed
    // But verify environment variables are configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      setConfigError(
        'Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
      );
    }
  }, []);

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchParams({ step: (step + 1).toString() });
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 300);
  };

  const prevStep = () => {
    if (step > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setSearchParams({ step: (step - 1).toString() });
        window.scrollTo(0, 0);
        setIsLoading(false);
      }, 300);
    }
  };

  const restart = () => {
    setFormData(initialFormData);
    setSearchParams({ step: '0' });
    setIsSubmitting(false);
    setSubmissionError(null);
    setApplicationId(null);
    setUploadProgress({});
    window.scrollTo(0, 0);
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setUploadProgress({});

    try {
      const id = await submitApplicationToSupabase(formData, (field, progress) => {
        setUploadProgress((prev) => ({ ...prev, [field]: progress }));
      });
      setApplicationId(id);
      nextStep();
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSubmissionError(
        `Submission failed: ${errorMessage}. Please check your connection and file sizes, then try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LandingPage nextStep={nextStep} />;
      case 1:
        return (
          <PersonalInfoStep
            nextStep={nextStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <MeasurementsStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ExperienceStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <ContentComfortStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <HeadshotUploadStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
            uploadProgress={uploadProgress}
          />
        );
      case 6:
        return (
          <FullBodyUploadStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 7:
        return (
          <VideoUploadStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 8:
        return (
          <TermsSubmitStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
          />
        );
      case 9:
        return <SuccessPage restart={restart} applicationId={applicationId} />;
      default:
        navigate('/?step=0');
        return <LandingPage nextStep={nextStep} />;
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          <p className="text-slate-700 font-semibold">Initializing Application...</p>
        </div>
      </div>
    );
  }

  if (configError) {
    return (
      <ConfigErrorOverlay
        title="Supabase Configuration Error"
        message={configError}
        instructions={
          <>
            <p className="font-bold mb-2">To fix this, configure Supabase environment variables:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Go to{' '}
                <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  Supabase Dashboard
                </a>
                .
              </li>
              <li>Select your project and go to Settings &gt; API.</li>
              <li>Copy your Project URL and anon key.</li>
              <li>
                Create a <span className="font-mono bg-slate-300 px-1 rounded">.env.local</span> file in the project root.
              </li>
              <li>Add the following variables:</li>
            </ol>
            <pre className="bg-slate-800 text-white p-3 rounded mt-2 text-xs overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}
            </pre>
            <li className="mt-2">Restart your development server.</li>
          </>
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 flex flex-col">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
            <p className="text-slate-700 font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <main className="flex-1">
        {renderStep()}
      </main>
    </div>
  );
};
