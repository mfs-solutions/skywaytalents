import React from 'react';

interface TextInputProps {
  label: string;
  id?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ 
  label, 
  id, 
  error, 
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  required
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-semibold text-text-primary mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-text-primary placeholder-gray-400 ${
          error 
            ? 'border-red-500 focus:ring-red-400' 
            : 'border-gray-300 focus:ring-primary focus:border-primary'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

