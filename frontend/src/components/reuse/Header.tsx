import { Menu, Bell, Settings, LogOut } from 'lucide-react'
import ThemeToggle from '../common/ThemeToggle'

interface HeaderConfig {
  theme: 'guest' | 'user' | 'admin'
  logo: {
    src: string
    alt: string
    text: string
  }
  navigation?: Array<{
    name: string
    href: string
    current?: boolean
  }>
  user?: {
    name: string
    avatar: string
    role?: string
  }
  showAuthButtons?: boolean
  authLinks?: Array<{
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }>
  onSidebarToggle?: () => void
  isSidebarOpen?: boolean
}

interface HeaderProps {
  config?: HeaderConfig
}

const Header = ({ config }: HeaderProps) => {
  // Default guest configuration if none provided
  const defaultConfig: HeaderConfig = {
    theme: 'guest',
    logo: {
      src: '/logo.png',
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    // no need for navigation link that the work of sidebar
    showAuthButtons: true,
    authLinks: [
      { text: 'Sign In', href: '/signin', variant: 'secondary' },
      { text: 'Register', href: '/register', variant: 'primary' }
    ]
  }

  const headerConfig = config || defaultConfig

  const getThemeClasses = () => {
    switch (headerConfig.theme) {
      case 'admin':
        return {
          header: 'header-admin border-b border-red-800',
          logo: 'text-white',
          nav: 'text-red-100 hover:text-white',
          userMenu: 'bg-red-700 hover:bg-red-800',
          badge: 'bg-red-800 text-white'
        }
      case 'user':
        return {
          header: 'header-user border-b border-blue-800',
          logo: 'text-white',
          nav: 'text-blue-100 hover:text-white',
          userMenu: 'bg-blue-700 hover:bg-blue-800',
          badge: 'bg-blue-800 text-white'
        }
      default:
        return {
          header: 'header-guest shadow-md',
          logo: 'text-primary',
          nav: 'text-muted hover:text-primary',
          userMenu: 'surface hover:bg-surface',
          badge: 'surface text-primary'
        }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full ${themeClasses.header}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side - Sidebar toggle and Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Sidebar Toggle Button - Mobile/Tablet */}
            <button
              onClick={headerConfig.onSidebarToggle}
              className={`md:hidden p-1.5 sm:p-2 rounded-lg transition-colors ${themeClasses.userMenu}`}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src={headerConfig.logo.src}
                alt={headerConfig.logo.alt}
                className="h-6 sm:h-8 w-auto"
              />
              <div className="flex items-center space-x-2">
                <span className={`hidden sm:block text-base sm:text-lg lg:text-xl font-bold ${themeClasses.logo}`}>
                  {headerConfig.logo.text}
                </span>
                {headerConfig.user?.role && (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${themeClasses.badge}`}>
                    {headerConfig.user.role}
                  </span>
                )}
              </div>
            </a>
          </div>

          {/* no need for naviation link is coverd in sidebar */}

          {/* Right side content */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu for authenticated users */}
            {headerConfig.user && (
              <>
                <button 
                  className={`p-2 rounded-lg transition-colors ${themeClasses.userMenu}`}
                  title="Notifications"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </button>
                <button 
                  className={`p-2 rounded-lg transition-colors ${themeClasses.userMenu}`}
                  title="Settings"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${themeClasses.badge}`}>
                    {headerConfig.user.avatar}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${themeClasses.logo}`}>
                    {headerConfig.user.name}
                  </span>
                </div>
                <button 
                  className={`p-2 rounded-lg transition-colors ${themeClasses.userMenu}`}
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Auth buttons for guests */}
            {headerConfig.showAuthButtons && headerConfig.authLinks && (
              <div className="flex items-center space-x-1 sm:space-x-2">
                {headerConfig.authLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm ${
                      link.variant === 'primary'
                        ? 'btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'surface border hover:border-blue-300'
                    }`}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header