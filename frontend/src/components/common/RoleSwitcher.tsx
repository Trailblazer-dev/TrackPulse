import  { useState, useEffect } from 'react';
import { roleService, type UserRole } from '../../utils/roleService';
import { Shield, User, UserCog } from 'lucide-react';

export const RoleSwitcher = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(roleService.getCurrentRole());
  
  useEffect(() => {
    const handleRoleChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setCurrentRole(customEvent.detail.role);
    };
    
    window.addEventListener('userrolechange', handleRoleChange);
    return () => {
      window.removeEventListener('userrolechange', handleRoleChange);
    };
  }, []);
  
  const handleRoleChange = (role: UserRole) => {
    roleService.setCurrentRole(role);
    
    // Redirect to the appropriate landing page based on role
    switch (role) {
      case 'admin':
        window.location.href = '/admin';
        break;
      case 'user':
        window.location.href = '/dashboard';
        break;
      case 'guest':
        window.location.href = '/';
        break;
    }
  };
  
  return (
    <div className="surface p-4 border border-themed/10 rounded-lg shadow-themed-md">
      <h3 className="text-lg font-semibold text-themed mb-3">Demo Role Switcher</h3>
      <p className="text-sm text-muted mb-4">Select a role to experience different views of the application.</p>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => handleRoleChange('guest')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentRole === 'guest'
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>Guest</span>
        </button>
        
        <button
          onClick={() => handleRoleChange('user')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentRole === 'user'
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
          }`}
        >
          <User className="h-4 w-4" />
          <span>User</span>
        </button>
        
        <button
          onClick={() => handleRoleChange('admin')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentRole === 'admin'
              ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
          }`}
        >
          <UserCog className="h-4 w-4" />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
