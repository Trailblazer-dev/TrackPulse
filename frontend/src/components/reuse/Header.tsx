import { Menu, Bell, Settings, LogOut } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ThemeToggle from '../common/ThemeToggle'
import type { HeaderConfig } from './headerConfigs'

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

  // Helper to render auth links
  const renderAuthLink = (link: { text: string; href: string; variant?: 'primary' | 'secondary' }, index: number) => (
    <a
      key={index}
      href={link.href}
      className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 transform hover:scale-105 ${
        link.variant === 'primary'
          ? 'auth-button-primary text-white shadow-themed-sm'
          : 'auth-button-secondary text-themed hover:text-white border border-themed/20'
      }`}
    >
      {link.text}
    </a>
  )

  // Reusable icon button component
  const IconButton = ({ 
    icon: Icon, 
    title, 
    onClick, 
    className 
  }: { 
    icon: LucideIcon, 
    title: string, 
    onClick?: () => void, 
    className: string 
  }) => (
    <button 
      className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${className}`}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
    </button>
  )

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
      case 'auth':
        return {
          header: 'header-auth shadow-themed-sm',
          logo: 'text-primary font-bold',
          nav: 'text-muted hover:text-primary',
          userMenu: 'surface hover:bg-themed/5 border border-themed/20',
          badge: 'bg-primary/10 text-primary border border-primary/20'
        }
      default:
        return {
          header: 'header-guest shadow-themed-md',
          logo: 'text-primary font-bold',
          nav: 'text-muted hover:text-primary',
          userMenu: 'surface hover:bg-themed/5 border border-themed/20',
          badge: 'surface text-primary border border-themed/20'
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
            {/* Sidebar Toggle Button - Mobile/Tablet (hide for auth pages) */}
            {headerConfig.theme !== 'auth' && (
              <button
                onClick={headerConfig.onSidebarToggle}
                className={`md:hidden p-1.5 sm:p-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${themeClasses.userMenu}`}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            
            {/* Logo and Breadcrumb Navigation */}
            <a href="/" className="flex items-center space-x-2 sm:space-x-3 group auth-header-logo">
              <img 
                src={headerConfig.logo.src}
                alt={headerConfig.logo.alt}
                className="h-6 sm:h-8 w-auto transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex items-center space-x-2">
                <span className={`hidden sm:block text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${themeClasses.logo}`}>
                  {headerConfig.customTitle || headerConfig.logo.text}
                </span>
                {headerConfig.user?.role && (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase transition-all duration-200 ${themeClasses.badge}`}>
                    {headerConfig.user.role}
                  </span>
                )}
              </div>
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {/* User Menu for authenticated users */}
            {headerConfig.user && (
              <>
                <IconButton
                  icon={Bell}
                  title="Notifications"
                  className={themeClasses.userMenu}
                />
                <IconButton
                  icon={Settings}
                  title="Settings"
                  className={themeClasses.userMenu}
                />
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${themeClasses.badge}`}>
                    {headerConfig.user.avatar}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block transition-colors duration-200 ${themeClasses.logo}`}>
                    {headerConfig.user.name}
                  </span>
                </div>
                <IconButton
                  icon={LogOut}
                  title="Logout"
                  className={themeClasses.userMenu}
                />
              </>
            )}

            {/* Auth buttons and navigation */}
            {!headerConfig.hideAuthButtons && (
              <>
                {headerConfig.showAuthButtons && headerConfig.authLinks ? (
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {headerConfig.authLinks.map(renderAuthLink)}
                  </div>
                ) : headerConfig.theme === 'auth' && (
                  <a 
                    href="/" 
                    className="text-sm text-muted hover:text-primary transition-all duration-200 flex items-center space-x-1 transform hover:scale-105"
                  >
                    <span>← Home</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header