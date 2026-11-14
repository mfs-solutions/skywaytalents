import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AboutUs: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-blue-800 to-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">About Sky Way Talents</h1>
          <p className="text-xl text-gray-200">Professional Talent Management & Casting Services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">Our Story</h2>
            <p className="text-text-light text-lg mb-4 leading-relaxed">
              Founded in <span className="font-semibold text-primary">2019</span>, Sky Way Talents has established itself as a leading talent management and casting agency in the United Kingdom. With over five years of experience in the entertainment industry, we pride ourselves on connecting exceptional talent with outstanding opportunities.
            </p>
            <p className="text-text-light text-lg mb-4 leading-relaxed">
              Our mission is to discover, nurture, and promote talented actresses across all age groups and experience levels. We work closely with production companies, directors, and casting teams to bring quality talent to prestigious film, television, and streaming projects.
            </p>
            <p className="text-text-light text-lg leading-relaxed">
              Whether you're an aspiring actress looking to break into the industry or an experienced professional seeking your next role, Sky Way Talents is here to support your career journey.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold font-serif mb-6">Quick Facts</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-gold pl-4">
                <p className="font-semibold text-lg">Founded</p>
                <p className="text-gray-200">2019</p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <p className="font-semibold text-lg">Location</p>
                <p className="text-gray-200">Lewisham, London, England</p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <p className="font-semibold text-lg">Specialization</p>
                <p className="text-gray-200">Talent Management & Casting</p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <p className="font-semibold text-lg">Industry Focus</p>
                <p className="text-gray-200">Film, Television & Streaming</p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold font-serif text-primary mb-10 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 border-l-4 border-primary hover:shadow-lg transition">
              <div className="text-4xl text-gold mb-4">🎭</div>
              <h3 className="text-xl font-bold text-primary mb-3">Talent Representation</h3>
              <p className="text-text-light">
                We represent talented actresses and advocate for their interests in negotiations with production companies and studios.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 border-l-4 border-gold hover:shadow-lg transition">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-primary mb-3">Casting Services</h3>
              <p className="text-text-light">
                We provide comprehensive casting services for film, television, and streaming productions, matching the right talent to each role.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 border-l-4 border-secondary hover:shadow-lg transition">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-primary mb-3">Career Development</h3>
              <p className="text-text-light">
                We support our talent with career guidance, professional development, and access to premium opportunities in the industry.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Info Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-12 text-white mb-16">
          <h2 className="text-3xl font-bold font-serif mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Office Address</h3>
              <p className="text-gray-200">
                16 George Street<br />
                Lewisham<br />
                London, SE13 5HE<br />
                England
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Details</h3>
              <p className="text-gray-200 mb-2">
                <strong>Phone:</strong><br />
                <a href="tel:+447599577729" className="hover:text-gold transition">
                  +44 7599 577729
                </a>
              </p>
              <p className="text-gray-200">
                <strong>Email:</strong><br />
                <a href="mailto:info@skywaytalents.uk" className="hover:text-gold transition">
                  info@skywaytalents.uk
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Website</h3>
              <p className="text-gray-200">
                <strong>Domain:</strong><br />
                <a href="https://skywaytalents.uk" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
                  skywaytalents.uk
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold font-serif text-primary mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Integrity</h3>
                <p className="text-text-light">We conduct all business with honesty, transparency, and professional ethics.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Excellence</h3>
                <p className="text-text-light">We maintain the highest standards in talent management and casting services.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Diversity</h3>
                <p className="text-text-light">We celebrate diversity and promote inclusive casting practices across all projects.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Support</h3>
                <p className="text-text-light">We provide comprehensive support to our talent at every stage of their career.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold font-serif text-primary mb-4">Ready to Join Us?</h2>
          <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
            If you're an aspiring actress looking for your next opportunity, we'd love to hear from you. Apply for our current casting call and take the first step in your entertainment career.
          </p>
          <Link 
            to="/apply"
            className="inline-block px-12 py-4 bg-gradient-to-r from-gold to-yellow-600 text-white font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            Apply Now →
          </Link>
        </div>
      </div>
    </div>
  );
};
