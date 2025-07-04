import React from 'react';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent text-primary hover:bg-green-50',
};

const sizes = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({ 
  text, 
  onClick, 
  type = 'button', 
  ariaLabel, 
  // variant = 'primary', 
  size = 'md', 
  className = '',
  startIcon = null,
  endIcon = null
}) => {
  const baseClasses = 'font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 flex items-center justify-center space-x-2';

  // const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses}  ${sizeClasses} ${className}`}
      aria-label={ariaLabel || (typeof text === 'string' ? text : '')}
    >
      {startIcon}
      <span>{text}</span>
      {endIcon}
    </button>
  );
};

export default Button;
