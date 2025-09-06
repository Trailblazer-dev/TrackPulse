import { hero } from '../../utils/guest/guest'
import { belt } from "../../utils/guest/guest";
import { useTheme } from '../../hooks/useTheme';
import UserIcon from '../../assets/UserIcon';

const Landing = () => {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Main content - margin and padding handled by layout */}
      <main className="min-h-screen bg-surface overflow-x-hidden">
      
      <style>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        /* Ensure smooth layout transitions */
        main {
          transition: margin-left 300ms ease-in-out;
        }
        
        /* Responsive layout adjustments */
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
          }
        }
        
        .hero-section {
          --bg-image: url('/herobg.png');
        }
        .hero-bg {
          background-image: var(--bg-image);
        }
        .gradient-text {
          background: linear-gradient(135deg, #396AFF 0%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-card {
          backdrop-filter: blur(10px);
          background: ${theme === 'dark' 
            ? 'rgba(30, 41, 59, 0.8)' 
            : 'rgba(255, 255, 255, 0.95)'
          };
          border: 1px solid ${theme === 'dark' 
            ? '#475569' 
            : '#718EBF'
          };
        }
        .floating-animation {
          animation: float 6s ease-in-out infinite;
          will-change: transform;
        }
        .floating-delay-1 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
          will-change: transform;
        }
        .floating-delay-2 {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
          will-change: transform;
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(-50%) translateY(-50%) scale(1); 
          }
          33% { 
            transform: translateY(-20px) translateX(-50%) translateY(-50%) scale(1.02); 
          }
          66% { 
            transform: translateY(-10px) translateX(-50%) translateY(-50%) scale(0.98); 
          }
        }
        /* Extra small mobile devices - minimal animation */
        @media (max-width: 480px) {
          .floating-animation,
          .floating-delay-1,
          .floating-delay-2 {
            animation: floatMinimal 4s ease-in-out infinite;
          }
          .floating-delay-1 {
            animation-delay: 0.5s;
          }
          .floating-delay-2 {
            animation-delay: 1s;
          }
          @keyframes floatMinimal {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
            }
            50% { 
              transform: translateY(-3px) scale(1.005); 
            }
          }
        }
        
        /* Mobile-specific animations - reduce movement for better performance */
        @media (min-width: 481px) and (max-width: 640px) {
          .floating-animation {
            animation: floatMobile 3s ease-in-out infinite;
          }
          .floating-delay-1 {
            animation: floatMobile 4s ease-in-out infinite;
            animation-delay: 0.3s;
          }
          .floating-delay-2 {
            animation: floatMobile 5s ease-in-out infinite;
            animation-delay: 0.6s;
          }
          @keyframes floatMobile {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
            }
            50% { 
              transform: translateY(-5px) scale(1.01); 
            }
          }
        }
        
        /* Tablet-specific animations */
        @media (min-width: 641px) and (max-width: 768px) {
          .floating-animation {
            animation: floatTablet 4s ease-in-out infinite;
          }
          .floating-delay-1 {
            animation: floatTablet 5s ease-in-out infinite;
            animation-delay: 0.5s;
          }
          .floating-delay-2 {
            animation: floatTablet 6s ease-in-out infinite;
            animation-delay: 1s;
          }
          @keyframes floatTablet {
            0%, 100% { 
              transform: translateY(0px) translateX(-50%) translateY(-50%) scale(1); 
            }
            50% { 
              transform: translateY(-8px) translateX(-50%) translateY(-50%) scale(1.015); 
            }
          }
        }
        
        /* Desktop animations from 768px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .floating-animation {
            animation: floatDesktop 5s ease-in-out infinite;
          }
          .floating-delay-1 {
            animation: floatDesktop 6s ease-in-out infinite;
            animation-delay: 0.8s;
          }
          .floating-delay-2 {
            animation: floatDesktop 7s ease-in-out infinite;
            animation-delay: 1.2s;
          }
          @keyframes floatDesktop {
            0%, 100% { 
              transform: translateY(0px) translateX(-50%) translateY(-50%) scale(1); 
            }
            33% { 
              transform: translateY(-15px) translateX(-50%) translateY(-50%) scale(1.015); 
            }
            66% { 
              transform: translateY(-8px) translateX(-50%) translateY(-50%) scale(0.99); 
            }
          }
        }
        
        /* Large desktop animations from 1024px */
        @media (min-width: 1025px) {
          .floating-animation {
            animation: floatLargeDesktop 6s ease-in-out infinite;
          }
          .floating-delay-1 {
            animation: floatLargeDesktop 8s ease-in-out infinite;
            animation-delay: 1s;
          }
          .floating-delay-2 {
            animation: floatLargeDesktop 10s ease-in-out infinite;
            animation-delay: 2s;
          }
          @keyframes floatLargeDesktop {
            0%, 100% { 
              transform: translateY(0px) translateX(-50%) translateY(-50%) scale(1); 
            }
            33% { 
              transform: translateY(-20px) translateX(-50%) translateY(-50%) scale(1.02); 
            }
            66% { 
              transform: translateY(-10px) translateX(-50%) translateY(-50%) scale(0.98); 
            }
          }
        }
        .light-hero-section {
          background: 
            ${theme === 'dark' 
              ? `linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 50%, rgba(15, 23, 42, 0.8) 100%),`
              : `linear-gradient(135deg, rgba(245, 247, 250, 0.6) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(245, 247, 250, 0.6) 100%),`
            }
            var(--bg-image);
          background-size: cover;
          background-position: center;
          background-attachment: scroll; /* Changed from fixed for mobile compatibility */
        }
        @media (min-width: 768px) {
          .light-hero-section {
            background-attachment: fixed;
          }
        }
        }
        .dark-mode-overlay {
          background: ${theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.2) 0%, rgba(30, 41, 59, 0.1) 50%, rgba(15, 23, 42, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(139, 92, 246, 0.05) 100%)'
          };
        }
      `}</style>
      
      {/* Hero Section */}
      <section 
        className="hero-section relative min-h-[80vh] sm:min-h-screen flex items-center justify-center light-hero-section -mt-4 overflow-hidden"
      >
        {/* Dynamic background overlay for both themes */}
        <div className="absolute inset-0 dark-mode-overlay"></div>
        
        {/* Animated background elements - theme adaptive - responsive sizing */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 rounded-full blur-2xl floating-animation transform -translate-x-1/2 -translate-y-1/2 ${
            theme === 'dark' ? 'bg-blue-500/10 sm:bg-blue-500/15 md:bg-blue-500/20 lg:bg-blue-500/25 xl:bg-blue-500/30' : 'bg-blue-400/20 sm:bg-blue-400/25 md:bg-blue-400/30 lg:bg-blue-400/35 xl:bg-blue-400/40'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-40 sm:w-64 md:w-80 lg:w-96 xl:w-112 h-40 sm:h-64 md:h-80 lg:h-96 xl:h-112 rounded-full blur-2xl floating-delay-2 transform translate-x-1/2 translate-y-1/2 ${
            theme === 'dark' ? 'bg-purple-500/10 sm:bg-purple-500/15 md:bg-purple-500/20 lg:bg-purple-500/25 xl:bg-purple-500/30' : 'bg-purple-400/20 sm:bg-purple-400/25 md:bg-purple-400/30 lg:bg-purple-400/35 xl:bg-purple-400/40'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 w-24 sm:w-40 md:w-56 lg:w-64 xl:w-80 h-24 sm:h-40 md:h-56 lg:h-64 xl:h-80 rounded-full blur-3xl floating-delay-1 transform -translate-x-1/2 -translate-y-1/2 ${
            theme === 'dark' ? 'bg-indigo-400/8 sm:bg-indigo-400/12 md:bg-indigo-400/15 lg:bg-indigo-400/20 xl:bg-indigo-400/25' : 'bg-indigo-300/15 sm:bg-indigo-300/18 md:bg-indigo-300/20 lg:bg-indigo-300/25 xl:bg-indigo-300/30'
          }`}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 xl:py-16 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Enhanced Text Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Badge/Label */}
              <div className={`inline-flex items-center px-3 sm:px-4 py-2 backdrop-blur-sm rounded-full border ${
                theme === 'dark' 
                  ? 'bg-slate-800/80 border-slate-600 text-blue-400' 
                  : 'surface border-gray-200 text-primary'
              }`}>
                <span className="text-xs sm:text-sm font-medium">🎵 Music Analytics Platform</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                <span className="text-primary">{hero.title.split(' ').slice(0, 2).join(' ')}</span>
                <br />
                <span className="gradient-text">{hero.title.split(' ').slice(2).join(' ')}</span>
              </h1>
              
              {/* Enhanced Description */}
              <p className={`text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl ${
                theme === 'dark' ? 'text-gray-200' : 'text-muted'
              }`}>
                {hero.description}
                <span className={`block mt-2 text-sm sm:text-base font-medium ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Transform your music data into actionable insights with our cutting-edge analytics platform.
                </span>
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <a 
                  href="/register" 
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base sm:text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">{hero.cta1}</span>
                  <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a 
                  href="/explore" 
                  className={`group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-sm font-semibold text-base sm:text-lg rounded-xl border-2 transform hover:scale-105 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/60 text-blue-400 border-slate-600 hover:border-blue-500 hover:bg-slate-700/60'
                      : 'surface text-primary border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <span>{hero.cta2}</span>
                  <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-2 border-white shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white shadow-sm"></div>
                  <div className="border-2 border-white rounded-full shadow-sm">
                    <UserIcon className="w-10 h-10" theme={theme} />
                  </div>
                </div>
                <div className={`text-center sm:text-left ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                  <p className="text-sm font-medium">Trusted by 5,000+ music professionals</p>
                  <div className="flex items-center justify-center sm:justify-start mt-1">
                    <div className="flex text-yellow-500 text-sm">
                      {'★'.repeat(5)}
                    </div>
                    <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hero Image */}
            <div className="flex justify-center lg:justify-end relative mt-8 lg:mt-0">
              {/* Decorative elements - theme adaptive - hidden on mobile for performance */}
              <div className={`hidden sm:block absolute -top-8 -left-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full blur-xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 opacity-20' 
                  : 'bg-gradient-to-r from-blue-200 to-purple-200 opacity-30'
              }`}></div>
              <div className={`hidden sm:block absolute -bottom-8 -right-8 w-20 sm:w-32 h-20 sm:h-32 rounded-full blur-xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-20' 
                  : 'bg-gradient-to-r from-purple-200 to-pink-200 opacity-30'
              }`}></div>
              
              {/* Main image container */}
              <div className={`hero-card relative p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/60 border-slate-600' 
                  : 'bg-white/95 border-gray-300'
              }`}>
                <img 
                  src={hero.img.src} 
                  alt={hero.img.alt}
                  className="max-w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating metrics cards */}
                <div className={`absolute -top-1 sm:-top-2 md:-top-3 lg:-top-4 xl:-top-5 -left-1 sm:-left-2 md:-left-3 lg:-left-4 xl:-left-5 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 lg:p-3 xl:p-4 rounded-md sm:rounded-lg lg:rounded-xl border floating-animation shadow-sm sm:shadow-lg ${
                  theme === 'dark' 
                    ? 'bg-slate-800/90 border-slate-600/80' 
                    : 'bg-white/95 border-gray-200/80'
                }`}>
                  <div className={`text-xs font-semibold leading-tight ${
                    theme === 'dark' 
                      ? 'text-slate-400 drop-shadow-lg' 
                      : 'text-slate-600 drop-shadow-md'
                  }`}>ACTIVE USERS</div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-green-600 leading-tight">+24%</div>
                </div>
                
                <div className={`absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 xl:-bottom-5 -right-1 sm:-right-2 md:-right-3 lg:-right-4 xl:-right-5 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 lg:p-3 xl:p-4 rounded-md sm:rounded-lg lg:rounded-xl border floating-delay-1 shadow-sm sm:shadow-lg ${
                  theme === 'dark' 
                    ? 'bg-slate-800/90 border-slate-600/80' 
                    : 'bg-white/95 border-gray-200/80'
                }`}>
                  <div className={`text-xs font-semibold leading-tight ${
                    theme === 'dark' 
                      ? 'text-slate-400 drop-shadow-lg' 
                      : 'text-slate-600 drop-shadow-md'
                  }`}>REVENUE</div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-blue-600 leading-tight">$2.4M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Belt Section */}
            <section className={`py-8 sm:py-12 lg:py-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} overflow-hidden`}>
              <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Get insights on genres, artists, and global sales
                  </h2>
                  <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Real-time analytics dashboard showing the latest trends in music consumption
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {/* Top Genre Card */}
                  <div className={`p-3 sm:p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'surface border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {/* Circular Icon Background */}
                      <div className="flex-shrink-0">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <belt.card.icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-xs font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>{belt.card.title}</h3>
                          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            {belt.card.genre.percentage}%
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-blue-600">{belt.card.genre.name}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          Leading genre
                        </p>
                      </div>
                    </div>
                  </div>
      
                  {/* Total Sales Card */}
                  <div className={`p-3 sm:p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'surface border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {/* Circular Icon Background */}
                      <div className="flex-shrink-0">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                          <belt.card2.icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-xs font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>{belt.card2.title}</h3>
                          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            Global
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-green-600">{belt.card2.value.amount}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {belt.card2.value.countries}
                        </p>
                      </div>
                    </div>
                  </div>
      
                  {/* Top Country Card */}
                  <div className={`p-3 sm:p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'surface border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {/* Circular Icon Background */}
                      <div className="flex-shrink-0">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <belt.card3.icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-xs font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>{belt.card3.title}</h3>
                          <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                            #1
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-purple-600">{belt.card3.value.country}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {belt.card3.value.purchases} purchases
                        </p>
                      </div>
                    </div>
                  </div>
      
                  {/* Top Artist Card */}
                  <div className={`p-3 sm:p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'surface border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {/* Circular Icon Background */}
                      <div className="flex-shrink-0">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                          <belt.card4.icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-xs font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>{belt.card4.title}</h3>
                          <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            Trending
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-orange-600">{belt.card4.value.artist}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {belt.card4.value.sales}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
      </main>
    </>
  )
}

export default Landing