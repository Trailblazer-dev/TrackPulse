// Header configuration utilities for different page types
import { rheader, lheader, fpheader, rpheader } from '../../utils/auth'

export interface HeaderConfig {
  theme: 'guest' | 'user' | 'admin' | 'auth'
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
  // New props for auth pages
  hideAuthButtons?: boolean
  showBackToHome?: boolean
  customTitle?: string
}

// Helper function to create auth page header configurations
export const createAuthHeaderConfig = (pageType: 'signin' | 'register' | 'forgot-password' | 'reset-password'): HeaderConfig => {
  switch (pageType) {
    case 'signin':
      return {
        theme: 'auth',
        ...lheader,
        customTitle: 'Sign In',
        showAuthButtons: true,
        hideAuthButtons: false
      }
    case 'register':
      return {
        theme: 'auth',
        ...rheader,
        customTitle: 'Create Account',
        showAuthButtons: true,
        hideAuthButtons: false
      }
    case 'forgot-password':
      return {
        theme: 'auth',
        ...fpheader,
        customTitle: 'Reset Password',
        showAuthButtons: true,
        hideAuthButtons: false
      }
    case 'reset-password':
      return {
        theme: 'auth',
        ...rpheader,
        customTitle: 'New Password',
        showAuthButtons: true,
        hideAuthButtons: false
      }
    default:
      return {
        theme: 'auth',
        logo: {
          src: '/logo.png',
          alt: 'TrackPulse Logo',
          text: 'TrackPulse'
        },
        showAuthButtons: true,
        authLinks: []
      }
  }
}

// Default guest header configuration
export const defaultGuestHeaderConfig: HeaderConfig = {
  theme: 'guest',
  logo: {
    src: '/logo.png',
    alt: 'TrackPulse Logo',
    text: 'TrackPulse'
  },
  showAuthButtons: true,
  authLinks: [
    { text: 'Sign In', href: '/signin', variant: 'secondary' },
    { text: 'Register', href: '/register', variant: 'primary' }
  ]
}
