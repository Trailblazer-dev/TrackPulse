import React from 'react'

interface ThemeTransitionOverlayProps {
  isVisible: boolean
  theme: 'light' | 'dark'
}

const ThemeTransitionOverlay: React.FC<ThemeTransitionOverlayProps> = ({ isVisible, theme }) => {
  if (!isVisible) return null

  return (
    <div
      className={`
        fixed inset-0 z-[9999] pointer-events-none
        transition-opacity duration-300 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.4) 50%, transparent 100%)'
          : 'radial-gradient(circle at center, rgba(245, 247, 250, 0.7) 0%, rgba(245, 247, 250, 0.4) 50%, transparent 100%)',
      }}
    >
      {/* Animated ripple effect (The circle see when one toggle the theme) */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`
            w-32 h-32 rounded-full border-2 animate-theme-ripple
            ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'}
          `}
          style={{
            animationDuration: '600ms',
            animationIterationCount: '1',
          }}
        />
        <div
          className={`
            absolute inset-0 w-32 h-32 rounded-full border animate-pulse
            ${theme === 'dark' ? 'border-blue-300' : 'border-blue-500'}
          `}
          style={{
            animationDuration: '400ms',
            animationIterationCount: '1',
          }}
        />
      </div>

      {/* Theme transition text for accessibility */}
      <div
        className={`
          absolute bottom-8 left-1/2 transform -translate-x-1/2
          px-4 py-2 rounded-lg font-medium text-sm
          ${theme === 'dark' 
            ? 'bg-slate-800 text-slate-200 border border-slate-600' 
            : 'bg-white text-slate-800 border border-slate-300'
          }
          shadow-lg animate-fade-in-up
        `}
        style={{
          animation: 'fadeInUp 400ms ease-out forwards',
        }}
      >
        Switching to {theme} mode...
      </div>
    </div>
  )
}

export default ThemeTransitionOverlay
