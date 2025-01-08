// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
    //   onClick={onClick}
      className={`py-3 px-6 font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
