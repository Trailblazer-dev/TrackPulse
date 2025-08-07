import type { ReactNode } from 'react'
import { useState } from 'react'
import Header from '../components/reuse/Header'
import Sidebar from '../components/reuse/Sidebar'
import Footer from '../components/reuse/Footer'

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

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header - Fixed at top */}
      <Header
        config={{
          theme: 'user',
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
        }}
      />

      {/* Sidebar - Fixed position */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* Main Content Area - With left margin for fixed sidebar */}
      <div className="md:ml-64 flex flex-col min-h-screen transition-all duration-300 overflow-x-hidden">
        <main className="flex-1 pt-16 overflow-x-hidden">
          <div className="p-4 sm:p-8 max-w-full">
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
