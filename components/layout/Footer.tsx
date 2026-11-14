import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary text-lg font-bold">ST</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">Sky Way Talents</h3>
                <p className="text-xs text-gray-300">Professional Talent Management</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Connecting talented actresses with outstanding casting opportunities across the UK and beyond. Established in 2019.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-serif">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white">Address</p>
                <p>16 George Street</p>
                <p>Lewisham, London</p>
                <p>SE13 5HE, England</p>
              </div>
              <div>
                <p className="font-semibold text-white">Email</p>
                <p>
                  <a href="mailto:info@skywaytalents.uk" className="hover:text-gold transition">
                    info@skywaytalents.uk
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p>
                  <a href="tel:+447599577729" className="hover:text-gold transition">
                    +44 7599 577729
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-gold transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-gold transition">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gold transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; 2019-2025 Sky Way Talents. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              <a href="https://skywaytalents.uk" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
                skywaytalents.uk
              </a>
              {' '} • <span className="text-gold">Professional Casting Services</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
