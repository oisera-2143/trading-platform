import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ type = 'info', title, message, onClose }) => {
  const bgColors = {
    success: 'bg-success bg-opacity-10 border-success',
    danger: 'bg-danger bg-opacity-10 border-danger',
    warning: 'bg-warning bg-opacity-10 border-warning',
    info: 'bg-accent bg-opacity-10 border-accent',
  };

  const textColors = {
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-accent',
  };

  return (
    <div className={`border rounded-lg p-4 ${bgColors[type]}`}>
      <div className="flex gap-3">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textColors[type]}`} />
        <div className="flex-1">
          {title && <p className={`font-semibold ${textColors[type]}`}>{title}</p>}
          {message && <p className="text-neutral text-sm mt-1">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-neutral-dark hover:text-neutral transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
