import React from 'react';

interface AvatarIconProps {
  variant?: 'male1' | 'female1' | 'male2' | 'female2' | 'diverse1' | 'diverse2';
  className?: string;
  theme?: 'light' | 'dark';
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ 
  variant = 'male1', 
  className = "w-10 h-10", 
  theme = 'light' 
}) => {
  const bgColor = theme === 'dark' ? 'var(--bg-accent)' : 'var(--bg-surface)';
  
  const avatarVariants = {
    male1: {
      skinColor: '#F4C2A1',
      hairColor: '#654321',
      shirtColor: '#4A90E2',
      hasBeard: false,
      hairStyle: 'short'
    },
    female1: {
      skinColor: '#F4C2A1',
      hairColor: '#8B4513',
      shirtColor: '#E74C3C',
      hasBeard: false,
      hairStyle: 'long'
    },
    male2: {
      skinColor: '#D4A574',
      hairColor: '#2C1810',
      shirtColor: '#27AE60',
      hasBeard: true,
      hairStyle: 'short'
    },
    female2: {
      skinColor: '#F4C2A1',
      hairColor: '#FFD700',
      shirtColor: '#9B59B6',
      hasBeard: false,
      hairStyle: 'medium'
    },
    diverse1: {
      skinColor: '#8D5524',
      hairColor: '#1A1A1A',
      shirtColor: '#F39C12',
      hasBeard: false,
      hairStyle: 'curly'
    },
    diverse2: {
      skinColor: '#C68642',
      hairColor: '#4A4A4A',
      shirtColor: '#1ABC9C',
      hasBeard: true,
      hairStyle: 'medium'
    }
  };

  const avatar = avatarVariants[variant];

  const renderHair = () => {
    switch (avatar.hairStyle) {
      case 'long':
        return (
          <>
            <path 
              d="M8 18C8 12.4772 12.4772 8 20 8C27.5228 8 32 12.4772 32 18C32 16 30 14 28 14C26 12 24 12 20 12C16 12 14 12 12 14C10 14 8 16 8 18Z" 
              fill={avatar.hairColor}
            />
            <path 
              d="M12 22C12 20 13 18 15 18C17 18 19 20 20 22C21 20 23 18 25 18C27 18 28 20 28 22C28 24 26 26 24 26C22 26 20 24 20 22C20 24 18 26 16 26C14 26 12 24 12 22Z" 
              fill={avatar.hairColor}
            />
          </>
        );
      case 'medium':
        return (
          <path 
            d="M9 18C9 12.4772 13.4772 8 20 8C26.5228 8 31 12.4772 31 18C31 16 29 14 27 14C25 12 23 12 20 12C17 12 15 12 13 14C11 14 9 16 9 18Z" 
            fill={avatar.hairColor}
          />
        );
      case 'curly':
        return (
          <>
            <circle cx="15" cy="12" r="3" fill={avatar.hairColor} />
            <circle cx="20" cy="10" r="3" fill={avatar.hairColor} />
            <circle cx="25" cy="12" r="3" fill={avatar.hairColor} />
            <circle cx="13" cy="16" r="2" fill={avatar.hairColor} />
            <circle cx="27" cy="16" r="2" fill={avatar.hairColor} />
          </>
        );
      default: // short
        return (
          <path 
            d="M11 18C11 12.4772 15.4772 8 20 8C24.5228 8 29 12.4772 29 18C29 16 27 14 25 14C23 12 22 12 20 12C18 12 17 12 15 14C13 14 11 16 11 18Z" 
            fill={avatar.hairColor}
          />
        );
    }
  };

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
      <circle cx="20" cy="18" r="9" fill={avatar.skinColor} />
      
      {/* Hair */}
      {renderHair()}
      
      {/* Eyes */}
      <circle cx="16.5" cy="16.5" r="1.2" fill="#2D3748" />
      <circle cx="23.5" cy="16.5" r="1.2" fill="#2D3748" />
      
      {/* Eye highlights */}
      <circle cx="16.8" cy="16.2" r="0.4" fill="#FFFFFF" />
      <circle cx="23.8" cy="16.2" r="0.4" fill="#FFFFFF" />
      
      {/* Eyebrows */}
      <path d="M15 14.5L18 14.8" stroke="#654321" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M22 14.8L25 14.5" stroke="#654321" strokeWidth="0.8" strokeLinecap="round" />
      
      {/* Nose */}
      <ellipse cx="20" cy="19" rx="0.8" ry="1.2" fill={avatar.skinColor} stroke="#00000020" strokeWidth="0.3" />
      
      {/* Mouth */}
      <path 
        d="M17.5 21.5C18.5 22.2 21.5 22.2 22.5 21.5" 
        stroke="#B8860B" 
        strokeWidth="1" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Beard (if applicable) */}
      {avatar.hasBeard && (
        <path 
          d="M15 22C16 24 18 25 20 25C22 25 24 24 25 22C24 26 22 27 20 27C18 27 16 26 15 22Z" 
          fill={avatar.hairColor}
        />
      )}
      
      {/* Body/Shirt */}
      <path 
        d="M8 35C8 30 10 28 14 28H26C30 28 32 30 32 35V38C32 39.1046 31.1046 40 30 40H10C8.89543 40 8 39.1046 8 38V35Z" 
        fill={avatar.shirtColor}
      />
      
      {/* Neck */}
      <rect x="18" y="25" width="4" height="5" fill={avatar.skinColor} />
      
      {/* Shirt collar */}
      <path 
        d="M14 28L18 25L22 25L26 28L24 30L20 27L16 30Z" 
        fill={avatar.shirtColor}
        stroke={theme === 'dark' ? '#FFFFFF20' : '#00000020'}
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default AvatarIcon;
