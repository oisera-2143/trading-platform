import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-accent text-primary hover:bg-opacity-90 disabled:bg-neutral-dark disabled:cursor-not-allowed',
    success: 'bg-success text-primary hover:bg-opacity-90 disabled:bg-neutral-dark disabled:cursor-not-allowed',
    danger: 'bg-danger text-primary hover:bg-opacity-90 disabled:bg-neutral-dark disabled:cursor-not-allowed',
    secondary: 'bg-tertiary text-neutral border border-accent hover:bg-secondary disabled:bg-neutral-dark disabled:cursor-not-allowed',
    ghost: 'text-accent hover:bg-tertiary disabled:text-neutral-dark disabled:cursor-not-allowed',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};
