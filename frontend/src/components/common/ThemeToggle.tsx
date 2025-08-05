import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import ThemeTransitionOverlay from './ThemeTransitionOverlay'

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    // Check the initial theme on mount
    setIsDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    // Show transition overlay
    setShowTransition(true)
    
    // Toggle the dark class
    document.documentElement.classList.toggle('dark')
    
    // Update state
    const newThemeIsDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(newThemeIsDark)
    
    // Store preference
    localStorage.setItem('trackpulse-theme', newThemeIsDark ? 'dark' : 'light')
    
    // Hide transition overlay after animation
    setTimeout(() => setShowTransition(false), 600)
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="h-9 w-9 flex items-center justify-center rounded-lg transition-all duration-200 transform hover:scale-105 bg-themed/5 hover:bg-themed/10 border border-themed/10"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-blue-600" />
        )}
      </button>
      
      <ThemeTransitionOverlay isVisible={showTransition} theme={isDarkMode ? 'dark' : 'light'} />
    </>
  )
}

export default ThemeToggle