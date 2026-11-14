import React from 'react';
import { Button } from '../common/Button';

interface SuccessPageProps {
  restart: () => void;
  applicationId: string | null;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ restart, applicationId }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-accent flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header with Success Icon */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-12">
            <div className="flex justify-center mb-4">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-2">Application Submitted</h1>
            <p className="text-green-100 text-lg">Thank you for applying to Sky Way Talents</p>
          </div>

          {/* Content */}
          <div className="p-12 space-y-8">
            {/* Application ID */}
            {applicationId && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                <p className="text-sm text-text-light mb-2">Your Application Reference Number</p>
                <p className="text-3xl font-bold text-primary font-mono tracking-wider">{applicationId}</p>
                <p className="text-xs text-text-light mt-2">Please save this number for your records</p>
              </div>
            )}

            {/* Confirmation Message */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-text-primary">Application Review</p>
                    <p className="text-sm text-text-light">Our professional casting team will carefully review your application and portfolio within 5-7 business days.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-text-primary">Shortlist Notification</p>
                    <p className="text-sm text-text-light">If you are shortlisted, we will contact you via email and phone with details about the audition process.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-text-primary">Audition</p>
                    <p className="text-sm text-text-light">Selected candidates will be invited to audition. This may be conducted in-person or via video, depending on circumstances.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-text-primary">Final Casting</p>
                    <p className="text-sm text-text-light">Final rounds will determine the actresses selected for the production. Successful candidates will be notified with contract details.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border-l-4 border-gold rounded-lg p-6">
              <h3 className="font-bold text-primary mb-3">📌 Important Reminders</h3>
              <ul className="space-y-2 text-sm text-text-light">
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>A confirmation email has been sent to the email address you provided.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>Check your spam folder if you don't receive the confirmation email.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>Make sure your phone number is correct and available during business hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>We only contact shortlisted candidates - not receiving contact does not mean rejection.</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-primary bg-opacity-5 border-l-4 border-primary rounded-lg p-6">
              <h3 className="font-bold text-primary mb-3">Questions?</h3>
              <p className="text-sm text-text-light mb-3">
                If you have any questions about the casting process, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> casting@skywaytalents.co.uk</p>
                <p><strong>Address:</strong> 16 George Street, Lewisham, England, SE13 5HE</p>
                <p className="text-xs text-text-light mt-3">
                  Please allow up to 7 business days for responses to email enquiries.
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div className="text-center border-t pt-6">
              <p className="text-sm text-text-light mb-4">Follow Sky Way Talents for updates and future casting opportunities</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-primary hover:text-gold transition font-semibold">LinkedIn</a>
                <a href="#" className="text-primary hover:text-gold transition font-semibold">Instagram</a>
                <a href="#" className="text-primary hover:text-gold transition font-semibold">Website</a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => window.print()}
            className="w-full px-6 py-3 bg-white border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition"
          >
            🖨️ Print Confirmation
          </Button>
          
          <Button
            onClick={restart}
            className="w-full px-6 py-3 bg-gradient-to-r from-gold to-yellow-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
          >
            ← Return to Home
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-text-light text-xs mt-8">
          © 2024 Sky Way Talents. All rights reserved.
          <br />
          Casting Call Application System v1.0
        </p>
      </div>
    </div>
  );
};
