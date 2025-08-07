import type { ReactNode } from 'react'
import { useState } from 'react'
import Header from '../components/reuse/Header'
import Sidebar from '../components/reuse/Sidebar'
import Footer from '../components/reuse/Footer'
import { Users, BarChart3, FileText, Database, Settings, ClipboardList } from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  const adminHeaderConfig = {
    theme: 'admin' as const,
    logo: {
      src: '/logo.png',
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    user: {
      name: 'Admin User',
      avatar: 'A',
      role: 'ADMIN'
    },
    onSidebarToggle: handleSidebarToggle,
    isSidebarOpen: isSidebarOpen
  }

  const adminSidebarConfig = {
    theme: 'admin' as const,
    logo: {
      src: '/logo.png',
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    navigation: [
      { name: 'Dashboard', href: '/admin', icon: BarChart3, current: false },
      { name: 'Users Management', href: '/admin/users', icon: Users, current: false, badge: '1.2K' },
      { name: 'System Metrics', href: '/admin/metrics', icon: BarChart3, current: false },
      { name: 'Audit Logs', href: '/admin/audit-logs', icon: FileText, current: false, badge: 'New' },
      { name: 'Data Management', href: '/admin/data-management', icon: Database, current: false },
      { name: 'Report Builder', href: '/admin/report-builder', icon: ClipboardList, current: false },
      { name: 'System Settings', href: '/admin/settings', icon: Settings, current: false }
    ],
    stats: [
      { label: 'Server Status', value: 'Online', color: 'green' as const },
      { label: 'Active Users', value: '1,247', color: 'blue' as const },
      { label: 'Pending Tasks', value: '3', color: 'yellow' as const }
    ],
    helpSection: {
      title: 'System Controls',
      description: 'Monitor and manage your TrackPulse platform',
      buttonText: 'View Logs',
      buttonHref: '/admin/audit-logs'
    }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header - Fixed at top */}
      <Header config={adminHeaderConfig} />
      
      {/* Sidebar - Fixed position */}
      <Sidebar 
        config={adminSidebarConfig}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      
      {/* Main Content Area - With left margin for fixed sidebar */}
      <div className="md:ml-64 flex flex-col min-h-screen transition-all duration-300 overflow-x-hidden">
        <main className="flex-1 pt-16 overflow-x-hidden">
          <div className="p-4 sm:p-8 max-w-full overflow-hidden">
            {children}
          </div>
          
          {/* Footer - Part of scrollable content */}
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
