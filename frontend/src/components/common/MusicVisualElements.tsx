import React from 'react';

interface VinylRecordProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
  duration?: number;
}

export const VinylRecord: React.FC<VinylRecordProps> = ({ 
  size = 'md', 
  className = '', 
  animated = true,
  duration = 8
}) => {
  const sizeClasses = {
    sm: 'w-40 h-40',
    md: 'w-60 h-60',
    lg: 'w-80 h-80'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer vinyl record */}
      <div 
        className={`absolute inset-0 rounded-full border-4 border-gray-800/30 dark:border-white/20 ${animated ? 'animate-spin-slow' : ''}`}
        style={animated ? {animationDuration: `${duration}s`} : {}}
      >
        {/* Concentric rings */}
        <div className="absolute inset-4 rounded-full border-2 border-gray-800/40 dark:border-white/30"></div>
        <div className="absolute inset-12 rounded-full border-2 border-gray-800/40 dark:border-white/30"></div>
        <div className="absolute inset-20 rounded-full border-2 border-gray-800/40 dark:border-white/30"></div>
        
        {/* Center hole */}
        <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-gray-800/70 dark:bg-white/70"></div>
        
        {/* Label */}
        <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/80 to-indigo-600/80 dark:from-blue-600/80 dark:to-indigo-700/80 flex items-center justify-center">
          <div className="text-white font-bold text-xs text-center">
            TrackPulse
            <div className="text-[8px] opacity-80">Music Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MusicIconProps {
  type: 'note' | 'play' | 'volume' | 'mic' | 'headphones';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export const MusicIcon: React.FC<MusicIconProps> = ({ 
  type, 
  size = 'md', 
  className = '',
  animated = true
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };
  
  const renderIcon = () => {
    switch (type) {
      case 'note':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        );
      case 'play':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        );
      case 'volume':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        );
      case 'mic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        );
      case 'headphones':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`${sizeClasses[size]} ${className} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 
    flex items-center justify-center shadow-lg dark:shadow-black/30 ${animated ? 'animate-icon-pulse' : ''}`}>
      {renderIcon()}
    </div>
  );
};

interface WaveformProps {
  className?: string;
  animated?: boolean;
  barCount?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ 
  className = '', 
  animated = true,
  barCount = 8
}) => {
  return (
    <div className={`flex items-center space-x-0.5 h-6 ${className}`}>
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          className={`w-1 bg-gradient-to-t from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-sm ${
            animated ? 'animate-waveform' : 'h-3'
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.8s',
            height: animated ? undefined : `${Math.max(2, Math.sin(index) * 16 + 10)}px`
          }}
        ></div>
      ))}
    </div>
  );
};

export default {
  VinylRecord,
  MusicIcon,
  Waveform
};

