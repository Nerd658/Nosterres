import React from 'react';

// Composant Button réutilisable
const Button = ({ text, className = '', onClick, type = 'button', ariaLabel }) => {
// Styles de base avec Tailwind, combinés avec les classes passées via props
    const baseClasses = 'px-4 py-2 font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 bg-green-600';

    return (
        <button
        type={type}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
        aria-label={ariaLabel || text}
        >
        {text}
        </button>
    );
};

export default Button;