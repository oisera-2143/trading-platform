import React from 'react';

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && <Icon className="w-12 h-12 text-neutral-dark mb-4" />}
      <h3 className="text-lg font-semibold text-neutral mb-2">{title}</h3>
      {description && <p className="text-neutral-dark text-sm mb-4">{description}</p>}
      {action}
    </div>
  );
};
