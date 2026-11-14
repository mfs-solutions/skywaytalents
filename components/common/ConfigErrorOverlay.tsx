import React from 'react';

interface ConfigErrorOverlayProps {
  title: string;
  message: string;
  instructions: React.ReactNode;
}

export const ConfigErrorOverlay: React.FC<ConfigErrorOverlayProps> = ({ title, message, instructions }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex items-center justify-center p-4 text-white font-sans">
      <div className="max-w-2xl w-full bg-white text-text-primary rounded-lg shadow-2xl p-8 transform transition-all animate-fade-in-up">
        <div className="flex items-center mb-6">
          <div className="bg-red-100 p-2 rounded-full mr-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-red-700">{title}</h1>
        </div>
        <p className="mb-4 text-secondary text-lg">{message}</p>
        <div className="bg-accent p-4 rounded-lg text-sm space-y-2 border border-slate-200">
          {instructions}
        </div>
         <p className="text-center text-xs text-slate-400 mt-6">This is a developer-only message. Your end-users will not see this screen if the application is configured correctly.</p>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
