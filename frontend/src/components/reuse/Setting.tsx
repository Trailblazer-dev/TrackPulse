import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, Lock, Bell, PaintBucket, Code, Globe, Key } from 'lucide-react'
import { userSettings } from '../../utils/settings'
import { adminSettings } from '../../utils/settings'

interface TabDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const Setting = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form data for various settings
  const [formData, setFormData] = useState({
    // Profile settings
    username: userSettings.profile.username || '',
    email: userSettings.profile.email || '',
    bio: userSettings.profile.bio || '',
    avatar: userSettings.profile.avatar || '',
    
    // Preference settings
    theme: userSettings.preferences.theme || 'light',
    notifications: userSettings.preferences.notifications || false,
    
    // Security settings
    twoFactorAuthentication: userSettings.security.twoFactorAuthentication || false,
    loginAlerts: userSettings.security.loginAlerts || false,
    
    // Admin settings
    siteName: adminSettings.site.name || '',
    siteDescription: adminSettings.site.description || '',
    maxUsers: adminSettings.userManagement.maxUsers || 1000,
    enableSSL: adminSettings.security.enableSSL || true,
    passwordMinLength: adminSettings.security.passwordPolicy.minLength || 8,
    passwordRequireSpecialChars: adminSettings.security.passwordPolicy.requireSpecialChars || true
  });
  
  // Check if user is admin and set current theme
  useEffect(() => {
    // Check if user is on admin route
    setIsAdmin(location.pathname.includes('/admin'));
    
    // Check for dark mode
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Clean up
    return () => observer.disconnect();
  }, [location.pathname]);

  // Define tabs based on user role
  const tabs: TabDefinition[] = [
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <PaintBucket className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
    { id: 'admin', label: 'System Settings', icon: <Globe className="h-5 w-5" />, adminOnly: true },
    { id: 'api', label: 'API Access', icon: <Code className="h-5 w-5" /> }
  ];

  // Filter tabs based on user role
  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  // Generic input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
    // Here you would typically send the updated settings to your API
    
    // If theme was changed, apply it
    if (formData.theme === 'dark' && !isDarkMode) {
      document.documentElement.classList.add('dark');
    } else if (formData.theme === 'light' && isDarkMode) {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setFormData({
      ...formData,
      theme: newTheme
    });
    
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-themed mb-6">Settings</h1>
      
      {/* Tabs Navigation */}
      <div className="mb-8 border-b border-themed/10">
        <nav className="flex flex-wrap -mb-px space-x-8">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-themed hover:border-themed/20'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
            <h2 className="text-xl font-semibold text-themed mb-4">Profile Information</h2>
            <div className="space-y-4">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-themed mb-2">Profile Picture</label>
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {formData.username?.charAt(0) || 'U'}
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 border border-themed/20 rounded-lg text-sm font-medium text-themed hover:bg-themed/5"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>
              
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-themed mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-themed mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                />
              </div>
              
              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-themed mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                  placeholder="Tell us about yourself or your music business..."
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
            <h2 className="text-xl font-semibold text-themed mb-4">Appearance Settings</h2>
            <div className="space-y-5">
              {/* Theme Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-themed mb-3">Theme</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Light Theme Option */}
                  <div
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                      formData.theme === 'light' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData({...formData, theme: 'light'})}
                  >
                    <div className="h-32 bg-gradient-to-br from-gray-50 to-blue-50 p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="h-3 bg-blue-100 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="p-3 bg-white border-t border-gray-200">
                      <div className="font-medium text-gray-900">Light Theme</div>
                      <div className="text-xs text-gray-500">Bright mode with blue accents</div>
                    </div>
                    {formData.theme === 'light' && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-white p-1 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Dark Theme Option */}
                  <div
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                      formData.theme === 'dark' ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData({...formData, theme: 'dark'})}
                  >
                    <div className="h-32 bg-gradient-to-br from-gray-900 to-blue-900 p-4 border border-gray-700">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="h-3 bg-blue-700 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="p-3 bg-gray-800 border-t border-gray-700">
                      <div className="font-medium text-gray-100">Dark Theme</div>
                      <div className="text-xs text-gray-400">Dark mode with blue accents</div>
                    </div>
                    {formData.theme === 'dark' && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-white p-1 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Theme Toggle */}
              <div className="flex items-center justify-between py-3 border-t border-themed/10">
                <div>
                  <div className="font-medium text-themed">Current theme</div>
                  <div className="text-sm text-muted">
                    {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-4 py-2 border border-themed/20 rounded-lg text-sm font-medium text-themed hover:bg-themed/5"
                >
                  Toggle to {isDarkMode ? 'Light' : 'Dark'}
                </button>
              </div>

              {/* Color Accent Preference */}
              <div className="py-3 border-t border-themed/10">
                <label className="block text-sm font-medium text-themed mb-2">Color Accent</label>
                <div className="flex flex-wrap gap-2">
                  {['blue', 'purple', 'green', 'red', 'amber'].map((color) => (
                    <div 
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                        color === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      style={{ 
                        backgroundColor: 
                          color === 'blue' ? '#3B82F6' : 
                          color === 'purple' ? '#8B5CF6' : 
                          color === 'green' ? '#10B981' : 
                          color === 'red' ? '#EF4444' : 
                          '#F59E0B'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t border-themed/10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Appearance Settings
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
            <h2 className="text-xl font-semibold text-themed mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-themed/10">
                <div>
                  <div className="font-medium text-themed">Email Notifications</div>
                  <div className="text-sm text-muted">Receive updates about your account via email</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${formData.notifications ? 'bg-blue-600 dark:bg-blue-500' : ''}`}>
                    <div className={`absolute w-4 h-4 bg-white dark:bg-gray-200 rounded-full top-1 transition-transform ${formData.notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="py-3 border-b border-themed/10">
                <div className="font-medium text-themed mb-2">Notification Types</div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accountNotifications"
                      className="h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
                      defaultChecked
                    />
                    <label htmlFor="accountNotifications" className="ml-2 text-sm text-themed">
                      Account activity
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="streamNotifications"
                      className="h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
                      defaultChecked
                    />
                    <label htmlFor="streamNotifications" className="ml-2 text-sm text-themed">
                      New streams and analytics
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reportNotifications"
                      className="h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
                      defaultChecked
                    />
                    <label htmlFor="reportNotifications" className="ml-2 text-sm text-themed">
                      Report completion
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketingNotifications"
                      className="h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
                    />
                    <label htmlFor="marketingNotifications" className="ml-2 text-sm text-themed">
                      Marketing and promotions
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* Security Settings */}
      {activeTab === 'security' && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
            <h2 className="text-xl font-semibold text-themed mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-themed/10">
                <div>
                  <div className="font-medium text-themed">Two-Factor Authentication</div>
                  <div className="text-sm text-muted">Add an extra layer of security to your account</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    id="twoFactorAuthentication"
                    name="twoFactorAuthentication"
                    checked={formData.twoFactorAuthentication}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${formData.twoFactorAuthentication ? 'bg-blue-600 dark:bg-blue-500' : ''}`}>
                    <div className={`absolute w-4 h-4 bg-white dark:bg-gray-200 rounded-full top-1 transition-transform ${formData.twoFactorAuthentication ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-themed/10">
                <div>
                  <div className="font-medium text-themed">Login Alerts</div>
                  <div className="text-sm text-muted">Get notified when someone logs into your account</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    id="loginAlerts"
                    name="loginAlerts"
                    checked={formData.loginAlerts}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${formData.loginAlerts ? 'bg-blue-600 dark:bg-blue-500' : ''}`}>
                    <div className={`absolute w-4 h-4 bg-white dark:bg-gray-200 rounded-full top-1 transition-transform ${formData.loginAlerts ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="py-3 border-b border-themed/10">
                <button
                  type="button"
                  className="px-4 py-2 border border-themed/20 rounded-lg text-sm font-medium text-themed hover:bg-themed/5"
                >
                  Change Password
                </button>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Security Settings
                </button>
              </div>
            </div>
          </div>
          
          <div className="surface rounded-xl shadow-themed-md p-6 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-4">Danger Zone</h2>
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">
              Once you delete your account, all of your data will be permanently removed.
              This action cannot be undone.
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              Delete Account
            </button>
          </div>
        </form>
      )}
      
      {/* Admin Settings - Only visible to admin users */}
      {activeTab === 'admin' && isAdmin && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
            <h2 className="text-xl font-semibold text-themed mb-4">System Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-themed mb-1">Site Name</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                />
              </div>
              
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-themed mb-1">Site Description</label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="maxUsers" className="block text-sm font-medium text-themed mb-1">Maximum Users</label>
                <input
                  type="number"
                  id="maxUsers"
                  name="maxUsers"
                  value={formData.maxUsers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-t border-themed/10">
                <div>
                  <div className="font-medium text-themed">Enable SSL</div>
                  <div className="text-sm text-muted">Enforce HTTPS connections for security</div>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    id="enableSSL"
                    name="enableSSL"
                    checked={formData.enableSSL}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${formData.enableSSL ? 'bg-blue-600 dark:bg-blue-500' : ''}`}>
                    <div className={`absolute w-4 h-4 bg-white dark:bg-gray-200 rounded-full top-1 transition-transform ${formData.enableSSL ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-themed mt-4">Password Policy</h3>
              
              <div>
                <label htmlFor="passwordMinLength" className="block text-sm font-medium text-themed mb-1">Minimum Password Length</label>
                <input
                  type="number"
                  id="passwordMinLength"
                  name="passwordMinLength"
                  min="6"
                  max="24"
                  value={formData.passwordMinLength}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-themed"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="passwordRequireSpecialChars"
                  name="passwordRequireSpecialChars"
                  checked={formData.passwordRequireSpecialChars}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
                />
                <label htmlFor="passwordRequireSpecialChars" className="ml-2 text-sm text-themed">
                  Require special characters in passwords
                </label>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save System Settings
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* API Settings */}
      {activeTab === 'api' && (
        <div className="space-y-6 max-w-3xl">
          <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
            <h2 className="text-xl font-semibold text-themed mb-4">API Access</h2>
            
            <p className="text-muted mb-6">
              Use these API keys to access TrackPulse data programmatically. Keep your API keys secure and do not share them.
            </p>
            
            <div className="space-y-6">
              <div className="bg-themed/5 p-4 rounded-lg border border-themed/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-themed">API Key</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-sm text-primary font-medium"
                    >
                      Show
                    </button>
                    <button
                      type="button"
                      className="text-sm text-primary font-medium"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded font-mono text-sm text-muted select-none">
                  ••••••••••••••••••••••••••••••••
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>Created: June 15, 2023</span>
                  <span>Last used: 2 days ago</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Generate New API Key
                </button>
                
                <a
                  href="/api/docs"
                  className="px-4 py-2 border border-themed/20 rounded-lg text-sm font-medium text-themed hover:bg-themed/5 text-center"
                >
                  API Documentation
                </a>
              </div>
              
              <div className="pt-4 border-t border-themed/10">
                <h3 className="font-medium text-themed mb-2">Rate Limits</h3>
                <p className="text-sm text-muted mb-3">
                  Your current plan allows up to 1,000 API calls per day.
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="mt-1 text-xs text-muted flex justify-between">
                  <span>450 / 1,000 calls used today</span>
                  <span>Resets in 8 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Setting