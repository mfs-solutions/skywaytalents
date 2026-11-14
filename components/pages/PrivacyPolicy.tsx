import React, { useEffect } from 'react';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-blue-800 to-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-200">How We Protect Your Personal Information</p>
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
              Sky Way Talents is committed to protecting your privacy and ensuring you have a positive experience on our website and application.
            </p>
          </div>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">1. Introduction</h2>
          <p>
            Sky Way Talents ("we," "our," "us," or "Company") operates the casting application platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our casting application services.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-bold text-primary mt-6 mb-3">2.1 Personal Information</h3>
          <p>When you submit an application through our form, we collect:</p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>Full name and date of birth</li>
            <li>Contact information (email, phone number)</li>
            <li>Physical characteristics (height, weight, hair color, eye color, skin tone)</li>
            <li>Professional information (experience, casting role preferences)</li>
            <li>Portfolio files (headshots, full-body photos, profile videos)</li>
            <li>Additional information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <p>We may automatically collect certain information about your device when you visit our website:</p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring/exit pages</li>
            <li>Device type and operating system</li>
          </ul>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>Processing and reviewing casting applications</li>
            <li>Contacting you about casting opportunities</li>
            <li>Communicating with casting directors and production companies</li>
            <li>Maintaining our casting database</li>
            <li>Improving our website and services</li>
            <li>Complying with legal obligations</li>
            <li>Responding to inquiries and providing customer support</li>
          </ul>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">4. Data Storage and Security</h2>
          <p>
            Your information is stored securely using industry-standard encryption and security measures. We use Firebase Cloud Storage and Firestore Database to maintain your data with high security standards. Your sensitive information is protected with SSL/TLS encryption.
          </p>
          <p className="mt-4">
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">5. Data Retention</h2>
          <p>
            We retain your application information for the duration of the casting process and as required by law. Portfolio files may be retained for up to one year after submission unless otherwise agreed. You may request deletion of your information at any time by contacting us.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">6. Third-Party Disclosure</h2>
          <p>
            We may share your information with production companies, casting directors, and studios as part of the casting process. We will not sell, trade, or rent your personal information to third parties without your explicit consent, except as necessary to fulfill our services.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for data processing</li>
            <li>Request a copy of your data in portable format</li>
            <li>Object to certain processing activities</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us at <a href="mailto:info@skywaytalents.uk" className="text-primary hover:text-gold transition font-semibold">info@skywaytalents.uk</a>.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">8. Cookies and Tracking</h2>
          <p>
            Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and improve our services. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">9. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that a child has provided us with personal information, we will delete such information promptly.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services constitutes your acceptance of the updated Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">11. Contact Information</h2>
          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <p className="font-semibold text-primary mb-3">If you have questions about this Privacy Policy, please contact us:</p>
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

          <h2 className="text-2xl font-bold font-serif text-primary mt-8 mb-4">12. GDPR Compliance</h2>
          <p>
            Sky Way Talents complies with the General Data Protection Regulation (GDPR) and other applicable data protection laws. We process your personal data lawfully and transparently, with your explicit consent and in accordance with applicable regulations.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <p className="text-sm text-text-light">
              <strong>Note:</strong> By submitting your application, you acknowledge that you have read and understood this Privacy Policy and agree to the terms outlined herein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
