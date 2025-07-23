import type { ReactNode } from 'react'
import { useState } from 'react'
import Header from '../components/reuse/Header'
import Sidebar from '../components/reuse/Sidebar'
import Footer from '../components/reuse/Footer'
import { BarChart3, Music, BookOpen, Heart, User as UserIcon, Home } from 'lucide-react'

interface UserLayoutProps {
  children: ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  const userHeaderConfig = {
    theme: 'user' as const,
    logo: {
      src: '/logo.png',
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    user: {
      name: 'User Name',
      avatar: 'U',
      role: 'USER'
    },
    onSidebarToggle: handleSidebarToggle,
    isSidebarOpen: isSidebarOpen
  }

  const userSidebarConfig = {
    theme: 'user' as const,
    logo: {
      src: '/logo.png',
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    navigation: [
      { name: 'Dashboard', href: '/dashboard', icon: Home, current: false },
      { name: 'My Tracks', href: '/tracks', icon: Music, current: false },
      { name: 'Playlists', href: '/playlists', icon: BookOpen, current: false },
      { name: 'Analytics', href: '/analytics', icon: BarChart3, current: false },
      { name: 'Favorites', href: '/favorites', icon: Heart, current: false },
      { name: 'Profile', href: '/profile', icon: UserIcon, current: false }
    ],
    stats: [
      { label: 'Tracks Played', value: '247', color: 'blue' as const },
      { label: 'Playlists', value: '12', color: 'green' as const },
      { label: 'Hours Listened', value: '89', color: 'purple' as const }
    ],
    helpSection: {
      title: 'Your Activity',
      description: 'Track your music listening habits and discover insights',
      buttonText: 'View Analytics',
      buttonHref: '/analytics'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed at top */}
      <Header config={userHeaderConfig} />
      
      {/* Sidebar - Fixed position */}
      <Sidebar 
        config={userSidebarConfig}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      
      {/* Main Content Area - With left margin for fixed sidebar */}
      <div className="md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <main className="flex-1 pt-16">
          <div className="p-8">
            {children}
          </div>
          
          {/* Footer - Part of scrollable content */}
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default UserLayout
