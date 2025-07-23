import React, { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light')
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('trackpulse-theme') as Theme
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    setThemeState(initialTheme)
    applyTheme(initialTheme)
  }, [])

  // Apply theme to document root
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    
    // Add transition class for smooth animation
    root.style.setProperty('--theme-transition', 'all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    
    // Announce theme change for screen readers
    const announcement = `Theme switched to ${newTheme} mode`
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.style.position = 'absolute'
    announcer.style.left = '-10000px'
    announcer.style.width = '1px'
    announcer.style.height = '1px'
    announcer.style.overflow = 'hidden'
    announcer.textContent = announcement
    
    document.body.appendChild(announcer)
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
    
    // Debug log
    console.log('Theme applied:', newTheme, 'Classes:', root.className)
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setIsTransitioning(true)
    setThemeState(newTheme)
    localStorage.setItem('trackpulse-theme', newTheme)
    applyTheme(newTheme)
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('trackpulse-theme')
      if (!savedTheme) {
        const systemTheme = e.matches ? 'dark' : 'light'
        setThemeState(systemTheme)
        applyTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    isTransitioning,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext