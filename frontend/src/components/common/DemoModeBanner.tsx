import  { useState, useEffect } from 'react';
import { roleService, type UserRole } from '../../utils/roleService';
import { AlertTriangle, X } from 'lucide-react';

export const DemoModeBanner = () => {
  const [dismissed, setDismissed] = useState(false);
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
  
  if (dismissed) return null;
  
  const getRoleColor = () => {
    switch (currentRole) {
      case 'admin': return 'bg-red-500';
      case 'user': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className={`${getRoleColor()} text-white px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>
            <strong>Demo Mode:</strong> Currently viewing as 
            <span className="mx-1 font-bold uppercase">{currentRole}</span> 
            - No actual authentication required.
          </span>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="ml-4 p-1 hover:bg-white/20 rounded"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DemoModeBanner;
