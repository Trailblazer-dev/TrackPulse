import { Menu, Bell, Settings, LogOut, ChevronDown, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import ThemeToggle from '../common/ThemeToggle'
import { header as guestHeader } from '../../utils/guest/guest'
import { header as userHeader } from '../../utils/user/user'
import { header as adminHeader } from '../../utils/admin/admin'
import type { HeaderConfig } from './headerConfigs'
import { roleService } from '../../utils/roleService'

interface HeaderProps {
  config?: HeaderConfig
}

const Header = ({ config }: HeaderProps) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout action
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    roleService.clearRole();
    setIsProfileDropdownOpen(false);
    
    // Use window.location instead of navigate hook
    window.location.href = '/';
  };
  
  // Determine which header config to use based on route if not explicitly provided
  let headerConfig: any = config
  if (!headerConfig) {
    const path = window.location.pathname
    const userPrefixes = ['/dashboard', '/analytics', '/reports', '/bookmarks', '/settings']
    const adminPrefixes = ['/admin', '/admin/users', '/admin/metrics', '/admin/data-management', '/admin/report-builder', '/admin/audit-logs']
    
    const currentRole = roleService.getCurrentRole();
    
    if (adminPrefixes.some(prefix => path.startsWith(prefix))) {
      headerConfig = {
        theme: 'admin',
        logo: {
          src: adminHeader.logo,
          alt: 'TrackPulse Logo',
          text: 'TrackPulse'
        },
        user: {
          name: adminHeader.profile?.name ?? 'Admin',
          avatar: adminHeader.profile?.avatar ?? 'A',
          role: adminHeader.profile?.showAdminBadge ? 'ADMIN' : undefined,
          dropdown: [
            { text: "Profile", href: "/settings" },
            { text: "Logout", href: "#", action: handleLogout },
          ]
        },
        showAuthButtons: false,
        onSidebarToggle: config?.onSidebarToggle,
        isSidebarOpen: config?.isSidebarOpen
      }
    } else if (userPrefixes.some(prefix => path.startsWith(prefix))) {
      headerConfig = {
        theme: 'user',
        logo: {
          src: userHeader.logo,
          alt: 'TrackPulse Logo',
          text: 'TrackPulse'
        },
        user: {
          name: userHeader.profile?.name ?? 'User',
          avatar: userHeader.profile?.avatar ?? 'U',
          role: currentRole === 'admin' ? 'ADMIN' : 'USER',
          dropdown: [
            { text: "Profile", href: "/settings" },
            { text: "Logout", href: "#", action: handleLogout },
          ]
        },
        showAuthButtons: false,
        onSidebarToggle: config?.onSidebarToggle,
        isSidebarOpen: config?.isSidebarOpen
      }
    } else {
      headerConfig = {
        theme: 'guest',
        logo: {
          src: guestHeader.logo,
          alt: 'TrackPulse Logo',
          text: 'TrackPulse'
        },
        showAuthButtons: true,
        authLinks: guestHeader.links.map(link => ({
          text: link.text,
          href: link.href,
          variant: link.text === 'Sign In' ? 'secondary' : 'primary'
        })),
        onSidebarToggle: config?.onSidebarToggle,
        isSidebarOpen: config?.isSidebarOpen
      }
    }
  }

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

  // Get icon for dropdown menu item
  const getIconForMenuItem = (text: string) => {
    switch (text.toLowerCase()) {
      case 'settings':
      case 'profile':
        return <Settings className="mr-2 h-4 w-4" />;
      case 'logout':
        return <LogOut className="mr-2 h-4 w-4" />;
      default:
        return <User className="mr-2 h-4 w-4" />;
    }
  };

  const getThemeClasses = () => {
    // Use guest header colors for all types for uniformity
    // Only keep different badge colors to distinguish user types
    const baseClasses = {
      header: 'header-guest bg-white dark:bg-slate-900 shadow-themed-md border-b border-gray-200 dark:border-gray-700/50',
      logo: 'text-primary font-bold',
      nav: 'text-muted hover:text-primary',
      userMenu: 'surface hover:bg-themed/5 border border-themed/20 shadow-themed-sm',
      dropdown: 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700/80 shadow-lg dark:shadow-gray-900/40'
    };

    // Only modify badge appearance based on user type
    switch (headerConfig.theme) {
      case 'admin':
        return {
          ...baseClasses,
          badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800/50'
        }
      case 'user':
        return {
          ...baseClasses,
          badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50'
        }
      case 'auth':
        return {
          ...baseClasses,
          badge: 'bg-primary/10 text-primary border border-primary/20'
        }
      default:
        return {
          ...baseClasses,
          badge: 'bg-primary/10 text-primary border border-primary/20'
        }
    }
  }

  // Check if dark mode is active
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is active on mount and when theme changes
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial check
    checkDarkMode();
    
    // Create an observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);

  const themeClasses = getThemeClasses();
  
  // Generate dropdown classes with proper dark mode enforcement when needed
  const dropdownClasses = isDarkMode 
    ? `absolute right-0 mt-2 w-56 rounded-lg py-1 bg-slate-800 border border-gray-700 shadow-lg shadow-gray-900/40 z-50` 
    : `absolute right-0 mt-2 w-56 rounded-lg py-1 bg-white border border-gray-100 shadow-lg z-50`;
    
  const dropdownHeaderClasses = isDarkMode 
    ? `px-4 py-3 border-b border-gray-700` 
    : `px-4 py-3 border-b border-gray-100`;
    
  const dropdownItemClasses = isDarkMode 
    ? `flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer` 
    : `flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer`;

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
                onError={(e) => {
                  console.error("Logo failed to load", headerConfig.logo.src);
                  // Fallback to text
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex items-center space-x-2">
                <span className={`hidden sm:block text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${themeClasses.logo}`}>
                  {headerConfig.customTitle || headerConfig.logo.text}
                </span>
              </div>
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Theme Toggle - Always visible */}
            <div className="p-0.5 sm:p-1">
              <ThemeToggle />
            </div>

            {/* User Menu for authenticated users */}
            {headerConfig.user && (
              <>
                <IconButton
                  icon={Bell}
                  title="Notifications"
                  className={themeClasses.userMenu}
                />
                
                {/* Profile Dropdown Menu */}
                <div className="relative z-50" ref={dropdownRef}>
                  <button 
                    className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-themed/5 transition-colors"
                    onClick={() => {
                      console.log("Toggle dropdown");
                      setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${themeClasses.badge}`}>
                      {headerConfig.user.avatar}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block transition-colors duration-200 ${themeClasses.logo}`}>
                      {headerConfig.user.name}
                    </span>
                    <ChevronDown 
                      className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200" 
                      style={{ transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  
                  {/* Dropdown Menu with fixed positioning to ensure visibility */}
                  {isProfileDropdownOpen && (
                    <div className={dropdownClasses}>
                      <div className={dropdownHeaderClasses}>
                        <p className={isDarkMode ? "text-sm font-medium text-gray-200" : "text-sm font-medium text-gray-800"}>
                          {headerConfig.user.name}
                        </p>
                      </div>
                      <div className="py-1">
                        {headerConfig.user.dropdown && headerConfig.user.dropdown.length > 0 ? (
                          headerConfig.user.dropdown.map((item: any, index: number) => (
                            item.action ? (
                              <button
                                key={index}
                                onClick={item.action}
                                className={dropdownItemClasses}
                              >
                                {getIconForMenuItem(item.text)}
                                {item.text}
                              </button>
                            ) : (
                              <a
                                key={index}
                                href={item.href}
                                className={dropdownItemClasses}
                              >
                                {getIconForMenuItem(item.text)}
                                {item.text}
                              </a>
                            )
                          ))
                        ) : (
                          <>
                            <a
                              href="/settings"
                              className={dropdownItemClasses}
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </a>
                            <button
                              onClick={handleLogout}
                              className={dropdownItemClasses}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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