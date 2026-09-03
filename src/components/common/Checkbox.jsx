import React from 'react';

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  ...props
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 rounded border-tertiary bg-tertiary cursor-pointer accent-accent"
        {...props}
      />
      {label && (
        <label className="text-sm text-neutral cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
};
