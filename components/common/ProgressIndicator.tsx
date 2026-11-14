
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = ['Description', 'Application', 'Portfolio'];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors duration-300
                  ${isActive ? 'bg-primary text-white' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-slate-200 text-slate-500' : ''}
                `}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={`ml-2 text-xs md:text-base hidden sm:inline transition-colors duration-300
                  ${isActive ? 'text-primary font-bold' : ''}
                  ${isCompleted ? 'text-green-600' : ''}
                  ${!isActive && !isCompleted ? 'text-slate-500' : ''}
                `}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-auto h-1 mx-2 md:mx-4 transition-colors duration-300 ${isCompleted ? 'bg-green-500' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
