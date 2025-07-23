import { Sun, Moon, Loader2 } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme()
  
  const handleToggle = async () => {
    toggleTheme()
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`
        relative p-3 rounded-xl group focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 transition-all duration-300 ease-out
        ${isTransitioning ? 'scale-95' : 'hover:scale-105'}
        surface border shadow-sm hover:shadow-md
        ${isTransitioning ? 'cursor-wait' : 'cursor-pointer'}
      `}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      aria-live="polite"
    >
      <div className="relative w-6 h-6">
        {/* Loading Spinner */}
        {isTransitioning && (
          <Loader2 
            className="absolute top-0 left-0 w-6 h-6 animate-spin"
            style={{ color: 'var(--color-primary)' }}
          />
        )}
        
        {/* Sun Icon */}
        <Sun 
          className={`
            absolute top-0 left-0 w-6 h-6 text-yellow-500
            transform transition-all duration-500 ease-out
            ${!isTransitioning && theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-180 scale-75 opacity-0'
            }
          `}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            absolute top-0 left-0 w-6 h-6 text-blue-400
            transform transition-all duration-500 ease-out
            ${!isTransitioning && theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-180 scale-75 opacity-0'
            }
          `}
        />
      </div>
      
      {/* Enhanced Tooltip */}
      <div 
        className={`
          absolute -bottom-10 left-1/2 transform -translate-x-1/2 
          px-3 py-1.5 rounded-lg text-xs font-medium
          opacity-0 group-hover:opacity-100 transition-all duration-300
          pointer-events-none whitespace-nowrap z-50
          shadow-lg
        `}
        style={{
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {isTransitioning 
          ? 'Switching theme...' 
          : `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
        }
        
        {/* Tooltip Arrow */}
        <div 
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--color-border)',
          }}
        />
      </div>
    </button>
  )
}

export default ThemeToggle