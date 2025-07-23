import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import TestimonialCard from '../common/TestimonialCard';

const TestimonialsSection: React.FC = () => {
  const { theme } = useTheme();

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "TrackPulse has revolutionized how we handle our analytics. The insights are incredibly detailed and the interface is so intuitive!",
      avatarVariant: "female1" as const
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Best analytics platform I've used. The real-time data tracking and beautiful visualizations make decision-making so much easier.",
      avatarVariant: "diverse1" as const
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      comment: "Great platform with excellent customer support. The dashboard customization options are fantastic for our team's needs.",
      avatarVariant: "female2" as const
    },
    {
      name: "David Thompson",
      rating: 5,
      comment: "The automated reports and smart alerts have saved us countless hours. TrackPulse is an essential tool for our business.",
      avatarVariant: "male2" as const
    },
    {
      name: "Aisha Patel",
      rating: 5,
      comment: "Incredible value for money. The feature set is comprehensive and the performance is outstanding even with large datasets.",
      avatarVariant: "diverse2" as const
    },
    {
      name: "James Wilson",
      rating: 4,
      comment: "Solid analytics solution with great integration capabilities. The API documentation is clear and implementation was smooth.",
      avatarVariant: "male1" as const
    }
  ];

  return (
    <section className={`py-16 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            What Our Users Say
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Join thousands of satisfied customers who trust TrackPulse for their analytics needs
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
              }`}>
                4.9/5
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                10,000+
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Happy Users
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                99.9%
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Uptime
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              rating={testimonial.rating}
              comment={testimonial.comment}
              avatarVariant={testimonial.avatarVariant}
              theme={theme}
              className="transform hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-200
            ${theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
            hover:shadow-lg transform hover:scale-105
          `}>
            Join Our Happy Customers
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
