
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models



# --- Custom UserAccount Manager ---
class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, username, password, **extra_fields)


# --- Custom UserAccount Model ---
class UserAccount(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    role = models.CharField(max_length=20, default='user', choices=[('admin', 'Admin'), ('user', 'User'), ('guest', 'Guest')])

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'user_account'

    def __str__(self):
        return f"{self.username} ({self.email})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


# --- Permission Model ---
class Permission(models.Model):
    permission_id = models.AutoField(primary_key=True)
    permission_name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=50)

    class Meta:
        db_table = 'permission'

    def __str__(self):
        return self.permission_name


# --- RolePermission Model ---
class RolePermission(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=20, choices=[('admin', 'Admin'), ('user', 'User'), ('guest', 'Guest')])
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    class Meta:
        db_table = 'role_permission'
        unique_together = ('role', 'permission')

    def __str__(self):
        return f"{self.role} - {self.permission.permission_name}"


# --- UserSetting Model ---
class UserSetting(models.Model):
    id = models.AutoField(primary_key=True)
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    setting_key = models.CharField(max_length=100)
    setting_value = models.CharField(max_length=255)

    class Meta:
        db_table = 'user_setting'
        unique_together = ('user_account', 'setting_key')

    def __str__(self):
        return f"{self.user_account.username}: {self.setting_key}"


class UserProfile(models.Model):
    """User profile model for additional user information"""
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    
    # Preferences
    theme_preference = models.CharField(
        max_length=10,
        choices=[('light', 'Light'), ('dark', 'Dark'), ('auto', 'Auto')],
        default='auto'
    )
    
    # Analytics preferences
    default_date_range = models.CharField(
        max_length=20,
        choices=[
            ('7days', 'Last 7 days'),
            ('30days', 'Last 30 days'),
            ('90days', 'Last 90 days'),
            ('1year', 'Last year'),
        ],
        default='30days'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users_userprofile'

    def __str__(self):
        return f"{self.user.full_name}'s Profile"
