import React from 'react';

export const Select = ({
  label,
  placeholder,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-tertiary border rounded-lg text-neutral focus:outline-none focus:border-accent transition-colors ${
          error ? 'border-danger' : 'border-tertiary'
        } ${disabled ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};
