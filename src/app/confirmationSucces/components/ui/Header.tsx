// src/components/ui/Header.tsx
import React from 'react';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <div className={`text-center mt-4 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
};

export default Header;
