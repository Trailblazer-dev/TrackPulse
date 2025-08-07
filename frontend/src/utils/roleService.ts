/**
 * Role management service for prototype/development purposes
 * This simulates authentication for different user roles
 */

export type UserRole = 'admin' | 'user' | 'guest';

const ROLE_STORAGE_KEY = 'trackpulse_user_role';

export const roleService = {
  /**
   * Get the current user role from local storage
   * Defaults to 'guest' if not set
   */
  getCurrentRole(): UserRole {
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    if (storedRole === 'admin' || storedRole === 'user') {
      return storedRole;
    }
    return 'guest';
  },

  /**
   * Set the current user role in local storage
   */
  setCurrentRole(role: UserRole): void {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
    
    // Dispatch a custom event so components can react to role changes
    window.dispatchEvent(new CustomEvent('userrolechange', { 
      detail: { role }
    }));
  },

  /**
   * Check if user has a specific role
   */
  hasRole(role: UserRole): boolean {
    return this.getCurrentRole() === role;
  },

  /**
   * Clear the stored role (logout)
   */
  clearRole(): void {
    localStorage.removeItem(ROLE_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('userrolechange', { 
      detail: { role: 'guest' }
    }));
  }
};
