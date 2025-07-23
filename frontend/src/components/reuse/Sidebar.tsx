import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { sidebar } from '../../utils/guest/guest'
import { useState, useEffect } from 'react'

interface SidebarConfig {
  theme: 'guest' | 'user' | 'admin'
  logo?: {
    src: string
    alt: string
    text: string
  }
  navigation: Array<{
    name: string
    href: string
    icon: LucideIcon
    current?: boolean
    badge?: string
  }>
  stats?: Array<{
    label: string
    value: string
    color: 'blue' | 'green' | 'purple' | 'red' | 'yellow'
    icon?: LucideIcon
  }>
  systemStatus?: Array<{
    label: string
    value: string
    status?: 'green' | 'red' | 'yellow'
    color?: string
  }>
  helpSection?: {
    title: string
    description: string
    buttonText: string
    buttonHref: string
  }
}

interface SidebarProps {
  config?: SidebarConfig
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar = ({ config, isOpen = false, onClose }: SidebarProps) => {
  // State to track active navigation item
  const [activeItem, setActiveItem] = useState('/')
  
  // Get current path on component mount and when location changes
  useEffect(() => {
    const currentPath = window.location.pathname
    setActiveItem(currentPath)
    
    // Listen for browser back/forward button
    const handlePopState = () => {
      setActiveItem(window.location.pathname)
    }
    
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Handle navigation click
  const handleNavClick = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setActiveItem(href)
    
    // Update browser URL without page refresh
    window.history.pushState({}, '', href)
    
    // Dispatch a custom event to notify other components of route change
    window.dispatchEvent(new PopStateEvent('popstate'))
    
    // Close mobile sidebar when navigating
    if (onClose) {
      onClose()
    }
  }
  
  // Default guest configuration using guest.ts
  const defaultConfig: SidebarConfig = {
    theme: 'guest',
    
    navigation: sidebar.links.map(link => ({
      name: link.text,
      href: link.href,
      icon: link.icon,
      current: activeItem === link.href // Set current based on active state
    })),
    stats: [
      { label: 'Active Users', value: '5K+', color: 'blue' },
      { label: 'Countries', value: '59', color: 'green' }
    ],
    helpSection: {
      title: 'Need Help?',
      description: 'Explore our comprehensive analytics platform',
      buttonText: 'Learn More',
      buttonHref: '/about'
    }
  }
  
  // Update config navigation with current active state
  const updatedConfig = config ? {
    ...config,
    navigation: config.navigation.map(item => ({
      ...item,
      current: activeItem === item.href
    }))
  } : defaultConfig
  
  const sidebarConfig = updatedConfig

  const getThemeClasses = () => {
    switch (sidebarConfig.theme) {
      case 'admin':
        return {
          sidebar: 'surface shadow-lg',
          logo: 'text-primary',
          navItem: 'sidebar-nav-item',
          navIcon: 'sidebar-nav-icon',
          navText: 'sidebar-nav-text',
          navActiveIcon: 'text-red-600',
          accent: 'red',
          helpBg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          helpButton: 'bg-red-600 hover:bg-red-700 text-white'
        }
      case 'user':
        return {
          sidebar: 'surface shadow-lg',
          logo: 'text-primary',
          navItem: 'sidebar-nav-item',
          navIcon: 'sidebar-nav-icon',
          navText: 'sidebar-nav-text',
          navActiveIcon: 'text-blue-600 dark:text-blue-400',
          accent: 'blue',
          helpBg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          helpButton: 'bg-blue-600 hover:bg-blue-700 text-white'
        }
      default:
        return {
          sidebar: 'surface shadow-lg',
          logo: 'text-primary',
          navItem: 'sidebar-nav-item',
          navIcon: 'sidebar-nav-icon',
          navText: 'sidebar-nav-text',
          navActiveIcon: 'text-blue-600 dark:text-blue-400',
          accent: 'blue',
          helpBg: 'surface border border-muted',
          helpButton: 'btn-primary'
        }
    }
  }

  const getStatColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-700 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-700/30 dark:text-blue-300',
      green: 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700/30 dark:text-green-300',
      purple: 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-700/30 dark:text-purple-300',
      red: 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-700 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-700/30 dark:text-red-300',
      yellow: 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700/30 dark:text-yellow-300'
    }
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const themeClasses = getThemeClasses()

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`w-64 h-screen fixed top-14 sm:top-16 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${themeClasses.sidebar} border-r border-gray-200 dark:border-gray-700/50 backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent dark:from-transparent dark:via-blue-900/10 dark:to-transparent pointer-events-none"></div>
        <div className="flex flex-col h-full overflow-hidden relative z-10">
        {/* Subtle header connection gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent dark:via-blue-600/30"></div>
        
        {/* no logo here it already in header */}

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarConfig.navigation.map((item, index) => {
            const IconComponent = item.icon
            const isActive = activeItem === item.href
            return (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`${themeClasses.navItem} relative flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group hover:shadow-sm ${
                  isActive ? 'active bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {/* Rectangle indicator */}
                <div className="sidebar-nav-indicator"></div>
                
                <div className="flex items-center justify-between w-full ml-1">
                  <div className="flex items-center">
                    <IconComponent className={`h-5 w-5 mr-3 transition-all duration-200 group-hover:scale-110 ${themeClasses.navIcon} ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : ''
                    }`} />
                    <span className={`font-medium transition-colors duration-200 ${themeClasses.navText} ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : ''
                    }`}>{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-200 group-hover:scale-105 ${
                        isActive 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 ${themeClasses.navIcon} ${
                      isActive ? 'opacity-100 text-blue-600 dark:text-blue-400' : ''
                    }`} />
                  </div>
                </div>
              </a>
            )
          })}
        </nav>

        {/* Stats Section */}
        {sidebarConfig.stats && sidebarConfig.stats.length > 0 && (
          <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700/50">
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 sidebar-section-title text-gray-500 dark:text-gray-400">
              Quick Stats
            </h3>
            <div className="space-y-2">
              {sidebarConfig.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`relative p-3 rounded-xl border transition-all duration-200 cursor-pointer group hover:shadow-md hover:-translate-y-0.5 ${getStatColorClasses(stat.color)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{stat.label}</span>
                    <div className="flex items-center space-x-2">
                      {stat.icon && (
                        <stat.icon className="h-3 w-3 transition-all duration-200 group-hover:scale-110 group-hover:rotate-6" />
                      )}
                      <span className="text-sm font-bold">{stat.value}</span>
                    </div>
                  </div>
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-30 transition-opacity duration-200 stat-card-border"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        {sidebarConfig.helpSection && (
          <div className={`p-3 m-3 rounded-xl transition-all duration-300 ${themeClasses.helpBg} border border-gray-200 dark:border-gray-700/50`}>
            <h4 className="text-xs font-semibold mb-2 sidebar-section-title text-gray-700 dark:text-gray-300">
              {sidebarConfig.helpSection.title}
            </h4>
            <p className="text-xs mb-3 sidebar-section-title text-gray-600 dark:text-gray-400 leading-relaxed">
              {sidebarConfig.helpSection.description}
            </p>
            <a 
              href={sidebarConfig.helpSection.buttonHref}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:shadow-sm transform hover:-translate-y-0.5 hover:scale-105 inline-block font-medium ${themeClasses.helpButton}`}
            >
              {sidebarConfig.helpSection.buttonText}
            </a>
          </div>
        )}
      </div>
    </aside>
    </>
  )
}

export default Sidebar