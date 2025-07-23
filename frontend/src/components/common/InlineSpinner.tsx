import React from 'react';

interface InlineSpinnerProps {
  size?: 'xs' | 'sm' | 'md';
  variant?: 'default' | 'dots' | 'pulse';
  className?: string;
}

const InlineSpinner: React.FC<InlineSpinnerProps> = ({ 
  size = 'sm',
  variant = 'default',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full animate-bounce spinner-dot dots-delay-${index}`}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} rounded-full animate-pulse spinner-pulse`} />
        );

      default:
        return (
          <div className={`${sizeClasses[size]} border-2 rounded-full animate-spin spinner-default`} />
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {renderSpinner()}
    </div>
  );
};

export default InlineSpinner;
