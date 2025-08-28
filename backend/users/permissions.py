from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """Allow access only to admin users."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'admin'

class IsUserOrAdmin(permissions.BasePermission):
    """Allow access to users and admins."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) in ['admin', 'user']

class IsGuest(permissions.BasePermission):
    """Allow access only to guests."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'guest'

class HasPermission(permissions.BasePermission):
    """Check if user has a specific permission by name (string). Usage: permission_classes = [HasPermission('manage_users')]
    """
    def __init__(self, perm_name):
        self.perm_name = perm_name
    def has_permission(self, request, view):
        perms = getattr(request.user, 'role', None)
        if not perms:
            return False
        # For extensibility, check role-permission table if needed
        return request.user.role == 'admin' or self.perm_name in getattr(request.user, 'permissions', [])
