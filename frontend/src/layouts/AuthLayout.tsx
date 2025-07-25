import React from 'react'
import Header from '../components/reuse/Header'
import { createAuthHeaderConfig } from '../components/reuse/headerConfigs'

interface AuthLayoutProps {
  children: React.ReactNode
  pageType: 'signin' | 'register' | 'forgot-password' | 'reset-password'
  title?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, pageType, title }) => {
  const headerConfig = createAuthHeaderConfig(pageType)
  
  // Override title if provided
  if (title) {
    headerConfig.customTitle = title
  }

  return (
    <div className="min-h-screen bg-themed">
      {/* Reusable Header with theme toggle */}
      <Header config={headerConfig} />
      
      {/* Main Content with proper spacing for fixed header */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
