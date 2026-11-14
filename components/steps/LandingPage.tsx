import React from 'react';
import { Button } from '../common/Button';

interface LandingPageProps {
  nextStep: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ nextStep }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-accent to-accent">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Main Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-primary mb-6 leading-tight">
            Exciting Casting Opportunity
          </h1>
          <p className="text-xl text-text-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Sky Way Talents is seeking talented actresses for an upcoming premium television series. 
            Apply now to be considered for this exclusive opportunity.
          </p>
          <div className="inline-block bg-gold text-white px-6 py-2 rounded-full text-sm font-semibold">
            Casting Now Open
          </div>
        </div>

        {/* Role Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                5
              </div>
              <h3 className="text-lg font-bold text-primary">Role 1</h3>
            </div>
            <p className="text-text-light font-semibold mb-2">Leading Roles</p>
            <div className="bg-primary bg-opacity-10 rounded-lg p-4">
              <p className="text-primary font-bold text-lg">Age 18-25</p>
              <p className="text-sm text-text-light mt-2">5 talented actresses required</p>
              <p className="text-xs text-text-light mt-2">Dynamic, versatile performers with strong screen presence</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-primary">Role 2</h3>
            </div>
            <p className="text-text-light font-semibold mb-2">Supporting Roles</p>
            <div className="bg-gold bg-opacity-10 rounded-lg p-4">
              <p className="text-gold font-bold text-lg">Age 35-45</p>
              <p className="text-sm text-text-light mt-2">2 experienced actresses required</p>
              <p className="text-xs text-text-light mt-2">Mature professionals with character depth</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-secondary hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-gray-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-primary">Role 3</h3>
            </div>
            <p className="text-text-light font-semibold mb-2">Senior Roles</p>
            <div className="bg-secondary bg-opacity-10 rounded-lg p-4">
              <p className="text-secondary font-bold text-lg">Age 45+</p>
              <p className="text-sm text-text-light mt-2">2 distinguished actresses required</p>
              <p className="text-xs text-text-light mt-2">Elegant, authoritative presence essential</p>
            </div>
          </div>
        </div>

        {/* About the Production */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold font-serif text-primary mb-6">About This Production</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-3">Production Details</h3>
              <ul className="space-y-3 text-text-light">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">•</span>
                  <span><strong>Genre:</strong> Premium Drama Series</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">•</span>
                  <span><strong>Format:</strong> Television Series</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">•</span>
                  <span><strong>Production Location:</strong> United Kingdom</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">•</span>
                  <span><strong>Filming Schedule:</strong> To be confirmed post-casting</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary mb-3">Requirements</h3>
              <ul className="space-y-3 text-text-light">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">✓</span>
                  <span>Professional headshots and full-body photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">✓</span>
                  <span>Short profile/introduction video (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">✓</span>
                  <span>Valid contact information and availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-xl leading-none">✓</span>
                  <span>Consent to terms and content guidelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-8 mb-12">
          <h3 className="text-lg font-bold text-primary mb-4">Important Information</h3>
          <ul className="space-y-3 text-sm text-text-light">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-xl leading-none">→</span>
              <span>Only serious applicants who are genuinely interested in this opportunity should apply.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-xl leading-none">→</span>
              <span>UK residency or work visa required for filming.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-xl leading-none">→</span>
              <span>All applications will be reviewed by our professional casting team.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-xl leading-none">→</span>
              <span>Shortlisted candidates will be contacted for auditions.</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            onClick={nextStep}
            className="px-12 py-4 text-lg bg-gradient-to-r from-gold to-yellow-600 text-white font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            Apply Now →
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-text-light text-sm mt-12">
          By clicking "Apply Now", you will be directed to complete our detailed application form.
          <br />
          All information provided will be kept confidential.
        </p>
      </div>
    </div>
  );
};
