import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/steps/LandingPage';
import { ApplicationForm } from './components/steps/ApplicationForm';
import { PortfolioUpload } from './components/steps/PortfolioUpload';
import { SuccessPage } from './components/steps/SuccessPage';
import { FormData, initialFormData, UploadProgress } from './types';
import { submitApplication, initializeFirebaseAndAuth, FirebaseConfigError } from './firebase';
import { ConfigErrorOverlay } from './components/common/ConfigErrorOverlay';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

  const [isInitializing, setIsInitializing] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeFirebaseAndAuth();
      } catch (error) {
        if (error instanceof FirebaseConfigError) {
          setConfigError(error.message);
        } else {
          setConfigError("An unexpected error occurred during application startup.");
          console.error(error);
        }
      } finally {
        setIsInitializing(false);
      }
    };
    initialize();
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const restart = () => {
    setFormData(initialFormData);
    setStep(1);
    setIsSubmitting(false);
    setSubmissionError(null);
    setApplicationId(null);
    setUploadProgress({});
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setUploadProgress({});

    try {
      const id = await submitApplication(formData, (field, progress) => {
        setUploadProgress(prev => ({ ...prev, [field]: progress }));
      });
      setApplicationId(id);
      nextStep();
    } catch (error) {
      console.error(error);
      setSubmissionError('An error occurred during submission. Please check your connection and file sizes, then try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return <LandingPage nextStep={nextStep} />;
      case 2:
        return <ApplicationForm nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <PortfolioUpload 
                 nextStep={handleSubmit} 
                 prevStep={prevStep} 
                 formData={formData} 
                 updateFormData={updateFormData}
                 isSubmitting={isSubmitting}
                 submissionError={submissionError}
                 uploadProgress={uploadProgress}
               />;
      case 4:
        return <SuccessPage restart={restart} applicationId={applicationId} />;
      default:
        return <LandingPage nextStep={nextStep} />;
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-accent flex items-center justify-center">
        <div className="flex items-center space-x-2 text-text-primary">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Initializing Application...</span>
        </div>
      </div>
    );
  }

  if (configError) {
    return (
      <ConfigErrorOverlay
        title="Firebase Configuration Error"
        message={configError}
        instructions={
          <>
            <p className="font-bold mb-2">To fix this, enable Anonymous Authentication in your Firebase project:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Firebase Console</a>.</li>
              <li>Select your project (<span className="font-mono bg-slate-300 px-1 rounded">genlux-ai</span>).</li>
              <li>Navigate to <span className="font-bold">Authentication</span> in the Build section.</li>
              <li>Go to the <span className="font-bold">Sign-in method</span> tab.</li>
              <li>Find <span className="font-bold">Anonymous</span> in the provider list and enable it.</li>
              <li>Save your changes and refresh this page.</li>
            </ol>
          </>
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-accent text-text-primary flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          {renderStep()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;