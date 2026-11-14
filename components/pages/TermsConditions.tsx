import React, { useEffect } from 'react';

export const TermsConditions: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-blue-800 to-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-200">Our Terms of Service and User Agreement</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none text-text-light">
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-primary">
              <strong>Last Updated:</strong> January 2025
            </p>
            <p className="text-sm text-text-light mt-2">
              Please read these Terms & Conditions carefully before submitting an application.
            </p>
          </div>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using the Sky Way Talents website and casting application platform, you agree to be bound by these Terms & Conditions. If you do not agree to any part of these terms, you may not use our services.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">2. Application Process</h2>
          <h3 className="text-xl font-bold text-primary mt-6 mb-3">2.1 Eligibility</h3>
          <p>
            To submit a casting application, you must be at least 18 years of age. By submitting an application, you represent and warrant that all information provided is accurate, complete, and truthful.
          </p>

          <h3 className="text-xl font-bold text-primary mt-6 mb-3">2.2 Application Submission</h3>
          <p>
            You agree to complete all required fields in the application form and upload required portfolio materials (headshots and full-body photos). Incomplete applications may be rejected. We reserve the right to request additional information or clarification.
          </p>

          <h3 className="text-xl font-bold text-primary mt-6 mb-3">2.3 Accuracy of Information</h3>
          <p>
            You warrant that all information submitted is accurate and up-to-date. Providing false, misleading, or fraudulent information may result in immediate rejection and removal from our system.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">3. Portfolio and Images</h2>
          <h3 className="text-xl font-bold text-primary mt-6 mb-3">3.1 Your Rights</h3>
          <p>
            You retain all rights to the images and videos you upload. By submitting portfolio materials, you grant Sky Way Talents a non-exclusive, royalty-free license to use, display, and share your images and videos for the purpose of casting and promotion.
          </p>

          <h3 className="text-xl font-bold text-primary mt-6 mb-3">3.2 Third-Party Sharing</h3>
          <p>
            We may share your portfolio materials with production companies, casting directors, and studios as part of the casting process. By submitting your materials, you consent to this sharing for professional casting purposes.
          </p>

          <h3 className="text-xl font-bold text-primary mt-6 mb-3">3.3 Inappropriate Content</h3>
          <p>
            You agree not to upload content that is offensive, illegal, explicit, or violates any third-party rights. Sky Way Talents reserves the right to reject or remove inappropriate materials at our sole discretion.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">4. Content Comfort & Consent</h2>
          <p>
            By indicating your comfort level with various types of content (nudity, violence, intimate scenes, etc.), you acknowledge that this information will be shared with casting teams to ensure appropriate role matching. You retain the right to decline roles that do not align with your stated preferences.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">5. Confidentiality and Non-Disclosure</h2>
          <p>
            Information about casting projects, production details, and other applicants is confidential. You agree not to disclose or share any confidential information received from Sky Way Talents or production companies without explicit written consent.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">6. Intellectual Property Rights</h2>
          <p>
            All content on our website, including text, graphics, logos, and design elements, is the property of Sky Way Talents or our partners and is protected by copyright laws. You may not reproduce, distribute, or use any content without explicit permission.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">7. Limitation of Liability</h2>
          <p>
            Sky Way Talents is provided on an "as-is" basis without warranties of any kind. We do not guarantee:
          </p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>That your application will be selected for any role</li>
            <li>Continued availability of our services</li>
            <li>Results or outcomes from submissions</li>
            <li>Freedom from errors or viruses</li>
          </ul>
          <p className="mt-4">
            In no event shall Sky Way Talents be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Sky Way Talents, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these Terms & Conditions.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">9. Termination</h2>
          <p>
            Sky Way Talents reserves the right to terminate or suspend your access to our services at any time for any reason, including:
          </p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>Violation of these Terms & Conditions</li>
            <li>Provision of false or misleading information</li>
            <li>Inappropriate conduct or communications</li>
            <li>Breach of confidentiality agreements</li>
          </ul>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">10. External Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party websites is at your own risk and subject to their terms and conditions.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">11. Modifications to Terms</h2>
          <p>
            Sky Way Talents reserves the right to modify these Terms & Conditions at any time. Changes will be effective upon posting to our website. Your continued use of our services constitutes acceptance of modified terms.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms & Conditions are governed by and construed in accordance with the laws of England and Wales, United Kingdom. You agree to submit to the exclusive jurisdiction of the courts located in London, England.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">13. Dispute Resolution</h2>
          <p>
            Any disputes arising from these Terms & Conditions or your use of our services shall first be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through arbitration or in accordance with applicable UK law.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">14. Professional Conduct</h2>
          <p>
            As a casting applicant, you agree to maintain professional conduct in all communications with Sky Way Talents, production companies, and casting teams. Unprofessional behavior may result in rejection or removal from our system.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">15. Age Verification for Certain Roles</h2>
          <p>
            For certain roles, we may request proof of age or additional documentation. Failure to provide requested documentation may result in disqualification from those specific roles.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">16. Contact Information</h2>
          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <p className="font-semibold text-primary mb-3">For questions regarding these Terms & Conditions, contact:</p>
            <p className="mb-2">
              <strong>Email:</strong> <a href="mailto:info@skywaytalents.uk" className="text-primary hover:text-gold transition">info@skywaytalents.uk</a>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> <a href="tel:+447599577729" className="text-primary hover:text-gold transition">+44 7599 577729</a>
            </p>
            <p>
              <strong>Address:</strong> 16 George Street, Lewisham, London, SE13 5HE, England
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <p className="text-sm text-text-light">
              <strong>Acknowledgment:</strong> By clicking "I Accept" when submitting your application, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
