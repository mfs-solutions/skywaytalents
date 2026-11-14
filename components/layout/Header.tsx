import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">ST</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-primary">Sky Way Talents</h1>
              <p className="text-xs text-text-light">Talent & Casting Management</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-primary">Series Casting Call</p>
            <p className="text-xs text-gold">Now Accepting Applications</p>
          </div>
        </div>
      </div>
    </header>
  );
};
