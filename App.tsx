import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ApplicationWrapper } from './components/steps/ApplicationWrapper';
import { AboutUs } from './components/pages/AboutUs';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsConditions } from './components/pages/TermsConditions';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-accent text-text-primary flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ApplicationWrapper />} />
            <Route path="/apply" element={<ApplicationWrapper />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;