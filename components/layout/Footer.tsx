import React from 'react';

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
              Connecting talented actresses with outstanding casting opportunities across the UK and beyond.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-serif">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white">Address</p>
                <p>16 George Street</p>
                <p>Lewisham, England</p>
                <p>SE13 5HE</p>
              </div>
              <div>
                <p className="font-semibold text-white">Email</p>
                <p>casting@skywaytalents.co.uk</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-gold transition">Home</a></li>
              <li><a href="#" className="hover:text-gold transition">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; 2024 Sky Way Talents. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Casting Call Application • <span className="text-gold">Now Open</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
