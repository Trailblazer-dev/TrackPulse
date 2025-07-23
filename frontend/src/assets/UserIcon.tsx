import React from 'react';

interface UserIconProps {
  className?: string;
  theme?: 'light' | 'dark';
}

const UserIcon: React.FC<UserIconProps> = ({ className = "w-10 h-10", theme = 'light' }) => {
  const fillColor = theme === 'dark' ? 'var(--color-text-muted)' : 'var(--color-muted)';
  const bgColor = theme === 'dark' ? 'var(--bg-accent)' : 'var(--bg-surface)';
  const skinColor = theme === 'dark' ? '#D4A574' : '#F4C2A1';
  const hairColor = theme === 'dark' ? '#8B4513' : '#654321';
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill={bgColor} />
      
      {/* Face */}
      <circle cx="20" cy="18" r="10" fill={skinColor} />
      
      {/* Hair */}
      <path 
        d="M10 18C10 12.4772 14.4772 8 20 8C25.5228 8 30 12.4772 30 18C30 16 28 14 26 14C24 12 22 12 20 12C18 12 16 12 14 14C12 14 10 16 10 18Z" 
        fill={hairColor}
      />
      
      {/* Eyes */}
      <circle cx="16.5" cy="16" r="1.5" fill="#2D3748" />
      <circle cx="23.5" cy="16" r="1.5" fill="#2D3748" />
      
      {/* Eye highlights */}
      <circle cx="16.8" cy="15.7" r="0.5" fill="#FFFFFF" />
      <circle cx="23.8" cy="15.7" r="0.5" fill="#FFFFFF" />
      
      {/* Nose */}
      <path 
        d="M19 18.5C19 19.3284 19.6716 20 20.5 20C21.3284 20 22 19.3284 22 18.5" 
        stroke={fillColor} 
        strokeWidth="0.5" 
        fill="none"
      />
      
      {/* Mouth */}
      <path 
        d="M17.5 21.5C18.5 22.5 21.5 22.5 22.5 21.5" 
        stroke={fillColor} 
        strokeWidth="1" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Body/Shirt */}
      <path 
        d="M8 35C8 30 10 28 14 28H26C30 28 32 30 32 35V38C32 39.1046 31.1046 40 30 40H10C8.89543 40 8 39.1046 8 38V35Z" 
        fill={theme === 'dark' ? '#4A5568' : '#718096'}
      />
      
      {/* Neck */}
      <rect x="18" y="26" width="4" height="4" fill={skinColor} />
    </svg>
  );
};

export default UserIcon;
