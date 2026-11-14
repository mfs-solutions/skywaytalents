import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">ST</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-primary">Sky Way Talents</h1>
              <p className="text-xs text-text-light">Talent & Casting Management</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-text-primary hover:text-primary transition">
              Home
            </Link>
            <Link to="/about" className="text-sm font-semibold text-text-primary hover:text-primary transition">
              About
            </Link>
            <Link to="/apply" className="text-sm font-semibold text-text-primary hover:text-primary transition">
              Apply
            </Link>
            <Link 
              to="/apply" 
              className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
