import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'pulse' | 'dots' | 'branded';
  showText?: boolean;
  text?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md',
  variant = 'branded',
  showText = true,
  text = 'Loading...',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const renderSpinnerVariant = () => {
    switch (variant) {
      case 'pulse':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} rounded-full animate-pulse spinner-pulse`} />
            <div className={`absolute inset-2 rounded-full animate-ping spinner-pulse-inner`} />
          </div>
        );

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full animate-bounce spinner-dots dots-delay-${index}`}
              />
            ))}
          </div>
        );

      case 'branded':
        return (
          <div className="relative">
            {/* Outer rotating ring */}
            <div className={`${sizeClasses[size]} rounded-full border-4 spinner-branded-outer`} />
            
            {/* Inner pulsing core */}
            <div className="absolute inset-4 rounded-full spinner-branded-inner" />
            
            {/* TrackPulse logo hint */}
            <div className="absolute inset-6 rounded-full spinner-branded-core" />
          </div>
        );

      default: // 'default'
        return (
          <div className={`${sizeClasses[size]} border-4 rounded-full animate-spin spinner-default`} />
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${className}`}>
      <div className="relative">
        {renderSpinnerVariant()}
        
        {showText && (
          <div 
            className={`mt-6 text-center animate-fade-in spinner-text ${
              size === 'sm' ? 'text-sm' : 
              size === 'lg' || size === 'xl' ? 'text-lg' : 'text-base'
            }`}
          >
            {text}
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 rounded-full animate-bounce spinner-dot spinner-delay-0" />
                <div className="w-1 h-1 rounded-full animate-bounce spinner-dot spinner-delay-1" />
                <div className="w-1 h-1 rounded-full animate-bounce spinner-dot spinner-delay-2" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background subtle animation */}
      <div className="absolute inset-0 -z-10 opacity-20 spinner-background" />
    </div>
  );
};

export default Spinner;
