import type { ReactNode } from 'react'
import { useState } from 'react'
import Header from '../components/reuse/Header'
import Sidebar from '../components/reuse/Sidebar'
import Footer from '../components/reuse/Footer'
import { header } from '../utils/guest/guest'

interface GuestLayoutProps {
  children: ReactNode
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  const guestHeaderConfig = {
    theme: 'guest' as const,
    logo: {
      src: header.logo,
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    
    showAuthButtons: true,
    authLinks: header.links.map(link => ({
      text: link.text,
      href: link.href,
      variant: link.text === 'Sign In' ? 'secondary' as const : 'primary' as const
    })),
    onSidebarToggle: handleSidebarToggle,
    isSidebarOpen: isSidebarOpen
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed at top */}
      <Header config={guestHeaderConfig} />
      
      {/* Sidebar - Fixed position */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      
      {/* Main Content Area - With left margin for fixed sidebar */}
      <div className="ml-0 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <main className="flex-1 pt-14 sm:pt-16">
          {children}
          
          {/* Footer - Part of scrollable content */}
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default GuestLayout
