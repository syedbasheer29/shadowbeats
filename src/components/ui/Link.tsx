import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const Link: React.FC<LinkProps> = ({ href, children, active = false }) => {
  return (
    <a 
      href={href}
      className={`relative text-lg transition-all duration-300 ${
        active 
          ? 'text-white font-medium' 
          : 'text-gray-400 hover:text-white'
      } group`}
    >
      {children}
      <span 
        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full ${
          active ? 'w-full' : ''
        }`} 
      />
    </a>
  );
};