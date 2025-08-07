# TrackPulse Database Extension Guide

## Overview

This document outlines the necessary database extensions to the Chinook database to support TrackPulse's authentication and user management system. These extensions will run alongside the existing Chinook dataset while maintaining separation between the authentication system and Chinook's customer data.

## Current Database Structure

The Chinook database currently includes tables for music data (Artists, Albums, Tracks), customers, invoices, etc. However, it lacks proper tables for:

1. User authentication (separate from Chinook customers)
2. Basic role-based access control
3. User preferences and settings

## Required Database Extensions

### 1. User Account Table

Create a `user_account` table completely separate from the Customer model:

```sql
CREATE TABLE user_account (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'guest'))
);
```

This table:
- Is completely separate from the Chinook `customer` table
- Stores authentication information (username, password hash)
- Directly stores the user's role for simplicity
- Tracks basic user metadata (active status, join date, last login)

### 2. Permission Table

Create a simplified `permission` table to define granular permissions:

```sql
CREATE TABLE permission (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    resource_type VARCHAR(50) NOT NULL
);
```

Example permissions:
- `view_sales_data`: View sales analytics
- `edit_track_metadata`: Edit track information
- `manage_users`: Create and modify user accounts
- `view_customer_details`: Access customer information
- `run_reports`: Generate and download reports

### 3. Role Permission Junction Table

Create a simplified `role_permission` junction table to assign permissions to roles:

```sql
CREATE TABLE role_permission (
    role_name VARCHAR(20) NOT NULL CHECK (role_name IN ('admin', 'user', 'guest')),
    permission_id INTEGER REFERENCES permission(permission_id) ON DELETE CASCADE,
    PRIMARY KEY (role_name, permission_id)
);
```

This allows:
- Defining which permissions are granted to each role
- Simple lookup of permissions by role name

### 4. User Settings Table

Create a `user_setting` table for user preferences:

```sql
CREATE TABLE user_setting (
    user_id INTEGER REFERENCES user_account(user_id) ON DELETE CASCADE,
    setting_key VARCHAR(50) NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, setting_key)
);
```

This stores:
- UI preferences
- Dashboard configurations
- Notification settings
- Other customization options

## Role-Based Access Control Implementation

### Admin Role Permissions

The `admin` role should have access to:

1. **User Management**
   - Create, update, and deactivate user accounts
   - Reset user passwords

2. **Content Management**
   - Add, edit, or remove music metadata (artists, albums, tracks)
   - Manage genre classifications

3. **Analytics Access**
   - View all analytics dashboards
   - Generate reports
   - Export data

4. **System Configuration**
   - Configure system settings
   - View logs

### User Role Permissions

The `user` role should have access to:

1. **Limited Content Access**
   - View music metadata
   - Cannot modify most content

2. **Limited Analytics**
   - View basic statistics and trends
   - No access to sensitive data

### Guest Role Permissions

The `guest` role should have access to:

1. **Public Content**
   - View public dashboards only
   - Access demo features
   - No access to real data or sensitive information

## Integration with Django

In Django, you can implement this simplified database structure using models:

```python
# In users/models.py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_active', True)
        return self.create_user(username, email, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
        ('guest', 'Guest'),
    )
    
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    
    objects = UserAccountManager()
    
    # Add required fields for AbstractBaseUser
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']
    
    @property
    def is_staff(self):
        return self.role == 'admin'

class Permission(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class RolePermission(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
        ('guest', 'Guest'),
    )
    
    role_name = models.CharField(max_length=20, choices=ROLE_CHOICES)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('role_name', 'permission')

class UserSetting(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    setting_key = models.CharField(max_length=50)
    setting_value = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'setting_key')
```

## Initial Data Setup

When implementing these tables, you should initialize them with default roles and permissions:

1. Insert the three roles (admin, user, guest) into role_permissions table
2. Define core permissions
3. Assign appropriate permissions to each role
4. Create an initial admin user

## Frontend Integration

The frontend should:

1. Use JWT or session authentication to identify users
2. Conditionally render UI components based on user roles
3. Display appropriate error messages when users attempt unauthorized actions
4. Customize navigation based on user permissions

## Security Considerations

1. Implement proper password hashing using bcrypt or Argon2
2. Use prepared statements for all database queries to prevent SQL injection
3. Apply HTTPS for all API communications
4. Implement proper CSRF protection
5. Add rate limiting for authentication endpoints
6. Log all sensitive operations

## Conclusion

This simplified database extension provides a straightforward framework for user authentication and basic role-based access control in the TrackPulse application. By implementing these tables and relationships, you'll support the three user roles needed for the application while maintaining security and data integrity.
    class Meta:
        unique_together = ('user', 'role')

class Permission(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    granted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('role', 'permission')

class UserSetting(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    setting_key = models.CharField(max_length=50)
    setting_value = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'setting_key')
```

## Initial Data Setup

When implementing these tables, you should initialize them with default roles and permissions:

1. Create default roles (admin, analyst, manager, user, guest)
2. Define core permissions
3. Assign appropriate permissions to each role
4. Create an initial admin user with the admin role

## Frontend Integration

The frontend should:

1. Use JWT or session authentication to identify users
2. Conditionally render UI components based on user roles and permissions
3. Include role management interfaces for administrators
4. Display appropriate error messages when users attempt unauthorized actions
5. Customize navigation based on user permissions

## Security Considerations

1. Implement proper password hashing using bcrypt or Argon2
2. Use prepared statements for all database queries to prevent SQL injection
3. Apply HTTPS for all API communications
4. Implement proper CSRF protection
5. Add rate limiting for authentication endpoints
6. Log all permission changes and sensitive operations
7. Regularly audit user roles and permissions

## Conclusion

This database extension provides a comprehensive framework for user authentication, role-based access control, and permission management in the TrackPulse application. By implementing these tables and relationships, you'll support the various user roles needed for the application while maintaining security and data integrity.
