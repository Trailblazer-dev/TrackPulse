import { Users, BarChart3, FileText, Database, Settings } from 'lucide-react'

export const adminConfig = {
  // Header configuration for admin users
  header: {
    theme: 'admin', // admin theme (red accents)
    showAuthButtons: false, // authenticated admins don't need login/register
    showUserMenu: true, // show admin dropdown menu
    userAvatar: 'A',
    userName: 'Admin User',
    showAdminBadge: true
  },

  // Sidebar configuration for admin users
  sidebar: {
    theme: 'admin',
    logo: {
      src: '/logo.png',
      alt: 'TrackPulse Logo',
      text: 'TrackPulse'
    },
    navigation: [
      {
        name: 'Dashboard',
        href: '/admin',
        icon: BarChart3,
        current: false
      },
      {
        name: 'Users Management',
        href: '/admin/users',
        icon: Users,
        current: false
      },
      {
        name: 'System Metrics',
        href: '/admin/metrics',
        icon: BarChart3,
        current: false
      },
      {
        name: 'Audit Logs',
        href: '/admin/audit-logs',
        icon: FileText,
        current: false
      },
      {
        name: 'Data Management',
        href: '/admin/data-management',
        icon: Database,
        current: false
      },
      {
        name: 'System Settings',
        href: '/admin/settings',
        icon: Settings,
        current: false
      }
    ],
    systemStatus: [
      {
        label: 'Server Status',
        value: 'Online',
        status: 'green',
        icon: 'dot'
      },
      {
        label: 'Active Users',
        value: '1,247',
        color: 'blue'
      },
      {
        label: 'Pending Tasks',
        value: '3',
        color: 'yellow'
      }
    ],
    quickActions: [
      {
        label: 'System Backup',
        action: 'backup',
        variant: 'primary'
      },
      {
        label: 'View Logs',
        action: 'logs',
        variant: 'secondary'
      }
    ]
  }
}
