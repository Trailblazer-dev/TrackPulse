import React from 'react';
import { Star } from 'lucide-react';
import AvatarIcon from '../../assets/AvatarIcon';

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  avatarVariant?: 'male1' | 'female1' | 'male2' | 'female2' | 'diverse1' | 'diverse2';
  theme?: 'light' | 'dark';
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  rating,
  comment,
  avatarVariant = 'male1',
  theme = 'light',
  className = ''
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : theme === 'dark'
            ? 'text-gray-600'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div 
      className={`
        p-6 rounded-xl border transition-all duration-300 hover:shadow-lg
        ${theme === 'dark' 
          ? 'bg-slate-800 border-slate-700 text-slate-100' 
          : 'bg-white border-gray-200 text-gray-800'
        }
        ${className}
      `}
    >
      {/* Header with avatar and rating */}
      <div className="flex items-center gap-4 mb-4">
        <AvatarIcon 
          variant={avatarVariant} 
          className="w-12 h-12 flex-shrink-0" 
          theme={theme}
        />
        <div className="flex-1">
          <h4 className={`font-semibold text-lg ${
            theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
          }`}>
            {name}
          </h4>
          <div className="flex items-center gap-1 mt-1">
            {renderStars()}
            <span className={`ml-2 text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}>
              {rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* Comment */}
      <blockquote className={`text-sm leading-relaxed ${
        theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
      }`}>
        "{comment}"
      </blockquote>

      {/* Verified badge */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-opacity-20">
        <div className={`w-2 h-2 rounded-full ${
          theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
        }`} />
        <span className={`text-xs font-medium ${
          theme === 'dark' ? 'text-green-400' : 'text-green-600'
        }`}>
          Verified User
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
