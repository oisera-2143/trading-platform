import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-secondary border border-tertiary rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
