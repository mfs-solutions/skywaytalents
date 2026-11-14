
import React from 'react';

interface ToggleGridProps {
  title: string;
  options: { key: string; label: string }[];
  values: { [key: string]: boolean };
  onChange: (key: string, value: boolean) => void;
}

const ToggleButton: React.FC<{
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="font-medium text-sm text-text-primary">{label}</span>
      <div className="flex rounded-lg bg-slate-200 p-0.5">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-4 py-1 text-sm rounded-md transition-colors ${value ? 'bg-primary text-white shadow' : 'text-slate-600'}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-4 py-1 text-sm rounded-md transition-colors ${!value ? 'bg-secondary text-white shadow' : 'text-slate-600'}`}
        >
          No
        </button>
      </div>
    </div>
  );
};


export const ToggleGrid: React.FC<ToggleGridProps> = ({ title, options, values, onChange }) => {
  return (
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {options.map(option => (
          <ToggleButton
            key={option.key}
            label={option.label}
            value={values[option.key]}
            onChange={(newValue) => onChange(option.key, newValue)}
          />
        ))}
      </div>
    </section>
  );
};
