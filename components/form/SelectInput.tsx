import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  id?: string;
  error?: string;
  options?: Option[];
  children?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({ 
  label, 
  id, 
  error, 
  options, 
  children,
  value,
  onChange,
  disabled,
  required
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-semibold text-text-primary mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-text-primary ${
          error 
            ? 'border-red-500 focus:ring-red-400' 
            : 'border-gray-300 focus:ring-primary focus:border-primary'
        }`}
      >
        <option value="">-- Select an option --</option>
        {options ? options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )) : children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
