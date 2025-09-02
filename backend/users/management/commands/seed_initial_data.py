from django.core.management.base import BaseCommand
from users.models import UserAccount, Permission, RolePermission
from django.conf import settings

class Command(BaseCommand):
    help = 'Seeds initial roles, permissions, and an admin user.'

    def handle(self, *args, **options):
        # Define roles
        roles = ['admin', 'user', 'guest']
        # Define permissions
        permissions = [
            {'name': 'view_sales_data', 'desc': 'View sales analytics', 'resource': 'analytics'},
            {'name': 'edit_track_metadata', 'desc': 'Edit track information', 'resource': 'track'},
            {'name': 'manage_users', 'desc': 'Create and modify user accounts', 'resource': 'user'},
            {'name': 'view_customer_details', 'desc': 'Access customer information', 'resource': 'customer'},
            {'name': 'run_reports', 'desc': 'Generate and download reports', 'resource': 'report'},
        ]
        # Create permissions
        perm_objs = {}
        for perm in permissions:
            obj, _ = Permission.objects.get_or_create(
                permission_name=perm['name'],
                defaults={'description': perm['desc'], 'resource_type': perm['resource']}
            )
            perm_objs[perm['name']] = obj
        # Assign permissions to roles
        role_perms = {
            'admin': permissions,  # all permissions
            'user': [permissions[0], permissions[1], permissions[3]],  # view_sales_data, edit_track_metadata, view_customer_details
            'guest': [permissions[0]],  # view_sales_data only
        }
        for role, perms in role_perms.items():
            for perm in perms:
                RolePermission.objects.get_or_create(role=role, permission=perm_objs[perm['name']])
        # Create initial admin account
        admin_email = 'admin@trackpulse.com'
        admin_username = 'admin'
        admin_password = 'admin1234'  # Change after first login!
        if not UserAccount.objects.filter(email=admin_email).exists():
            admin = UserAccount.objects.create_superuser(
                email=admin_email,
                username=admin_username,
                password=admin_password,
                first_name='Admin',
                last_name='User',
                is_active=True
            )
            self.stdout.write(self.style.SUCCESS(f'Created admin user: {admin_email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin user already exists: {admin_email}'))
        self.stdout.write(self.style.SUCCESS('Initial roles and permissions seeded.'))
