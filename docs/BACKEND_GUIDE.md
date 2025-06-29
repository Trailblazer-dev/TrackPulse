# TrackPulse Analytics - Backend Guide

This document provides a comprehensive guide to the TrackPulse Analytics Django backend.

## Table of Contents
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)

## Project Structure

```
backend/
├── manage.py                    # Django management script
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Docker configuration
├── .env.example                 # Environment variables template
├── db.sqlite3                   # SQLite database (development)
├── Chinook_PostgreSql.sql       # Sample data for PostgreSQL
├── trackpulse_analytics/        # Main Django project
│   ├── __init__.py
│   ├── settings.py              # Django settings
│   ├── urls.py                  # Main URL configuration
│   ├── wsgi.py                  # WSGI application
│   └── asgi.py                  # ASGI application
├── analytics/                   # Analytics Django app
│   ├── __init__.py
│   ├── admin.py                 # Django admin configuration
│   ├── apps.py                  # App configuration
│   ├── models.py                # Database models
│   ├── serializers.py           # DRF serializers
│   ├── views.py                 # API views
│   ├── urls.py                  # App URL patterns
│   ├── tests.py                 # Unit tests
│   └── migrations/              # Database migrations
└── users/                       # Users Django app
    ├── __init__.py
    ├── admin.py                 # Django admin configuration
    ├── apps.py                  # App configuration
    ├── models.py                # User and UserProfile models
    ├── serializers.py           # User serializers
    ├── views.py                 # User API views
    ├── urls.py                  # User URL patterns
    └── migrations/              # Database migrations
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Virtual environment tool (venv, virtualenv, conda)

### Local Development Setup

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://127.0.0.1:8000/`

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration (for production)
DATABASE_URL=postgresql://user:password@localhost:5432/trackpulse

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Email Configuration (optional)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Key Settings

- **Custom User Model**: `AUTH_USER_MODEL = 'users.User'`
- **Database**: SQLite for development, PostgreSQL for production
- **Authentication**: Token-based authentication using DRF
- **CORS**: Configured for frontend communication
- **Static Files**: Handled by WhiteNoise in production

## Database Models

### Analytics App Models

#### Artist
```python
class Artist(models.Model):
    artist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120, null=True, blank=True)
```

#### Album
```python
class Album(models.Model):
    album_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=160)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
```

#### Genre
```python
class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120, null=True, blank=True)
```

#### Track
```python
class Track(models.Model):
    track_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True, blank=True)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True)
    composer = models.CharField(max_length=220, null=True, blank=True)
    milliseconds = models.IntegerField()
    bytes = models.IntegerField(null=True, blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
```

#### Customer
```python
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=20)
    company = models.CharField(max_length=80, null=True, blank=True)
    address = models.CharField(max_length=70, null=True, blank=True)
    city = models.CharField(max_length=40, null=True, blank=True)
    state = models.CharField(max_length=40, null=True, blank=True)
    country = models.CharField(max_length=40, null=True, blank=True)
    postal_code = models.CharField(max_length=10, null=True, blank=True)
    phone = models.CharField(max_length=24, null=True, blank=True)
    fax = models.CharField(max_length=24, null=True, blank=True)
    email = models.CharField(max_length=60)
```

### Users App Models

#### User (Custom)
```python
class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
```

#### UserProfile
```python
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    theme_preference = models.CharField(max_length=10, default='auto')
    default_date_range = models.CharField(max_length=20, default='30days')
```

## API Endpoints

### Authentication Endpoints

#### POST /api/v1/users/auth/register/
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "token": "abc123...",
  "user_id": 1,
  "username": "johndoe",
  "email": "john@example.com"
}
```

#### POST /api/v1/users/auth/login/
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "admin@trackpulse.com",
  "password": "admin"
}
```

**Response:**
```json
{
  "token": "342798cd057a0f3d50723434559f696e916ff918",
  "user_id": 1,
  "username": "admin",
  "email": "admin@trackpulse.com"
}
```

#### POST /api/v1/users/auth/logout/
Logout user (requires authentication).

**Headers:**
```
Authorization: Token abc123...
```

### User Management Endpoints

#### GET /api/v1/users/me/
Get current user information.

#### GET /api/v1/users/profile/
Get user profile details.

#### PUT /api/v1/users/profile/
Update user profile.

#### GET /api/v1/users/detail/
Get user account details.

### Analytics Endpoints

#### GET /api/v1/analytics/
Get analytics overview.

#### GET /api/v1/analytics/artists/
List all artists.

#### GET /api/v1/analytics/artists/{id}/
Get specific artist details.

#### GET /api/v1/analytics/albums/
List all albums.

#### GET /api/v1/analytics/albums/{id}/
Get specific album details.

#### GET /api/v1/analytics/tracks/
List all tracks.

#### GET /api/v1/analytics/tracks/{id}/
Get specific track details.

#### GET /api/v1/analytics/customers/
List all customers.

#### GET /api/v1/analytics/customers/{id}/
Get specific customer details.

#### GET /api/v1/analytics/genres/
List all genres.

#### GET /api/v1/analytics/invoices/
List all invoices.

#### GET /api/v1/analytics/sales-overview/
Get sales analytics overview.

#### GET /api/v1/analytics/top-tracks/
Get top-selling tracks.

#### GET /api/v1/analytics/genre-distribution/
Get genre distribution analytics.

## Authentication

The API uses Token-based authentication. Include the token in the Authorization header:

```http
Authorization: Token your-token-here
```

### Getting a Token

1. **Register a new account:**
   ```bash
   curl -X POST http://127.0.0.1:8000/api/v1/users/auth/register/ \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "email": "test@example.com",
       "password": "testpass123",
       "first_name": "Test",
       "last_name": "User"
     }'
   ```

2. **Login with existing account:**
   ```bash
   curl -X POST http://127.0.0.1:8000/api/v1/users/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@trackpulse.com",
       "password": "admin"
     }'
   ```

### Using the Token

```bash
curl -X GET http://127.0.0.1:8000/api/v1/users/me/ \
  -H "Authorization: Token your-token-here"
```

## Development

### Adding New Models

1. Create model in appropriate app's `models.py`
2. Create and run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Adding New API Endpoints

1. Create serializer in `serializers.py`
2. Create view in `views.py`
3. Add URL pattern in `urls.py`

### Database Management

#### Create Migration
```bash
python manage.py makemigrations [app_name]
```

#### Apply Migrations
```bash
python manage.py migrate
```

#### Reset Database (Development)
```bash
# Delete database file
rm db.sqlite3

# Remove migration files (keep __init__.py)
rm */migrations/0*.py

# Create new migrations and migrate
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Django Admin

Access at `http://127.0.0.1:8000/admin/` with superuser credentials.

## Testing

### Running Tests
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test analytics
python manage.py test users

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

### Writing Tests
Create test files in each app's `tests.py`:

```python
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()

class UserAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_user_registration(self):
        url = '/api/v1/users/auth/register/'
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass123',
            'first_name': 'New',
            'last_name': 'User'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
```

## Deployment

### Environment Setup

1. **Set production environment variables**
2. **Configure database (PostgreSQL recommended)**
3. **Set up static file serving**
4. **Configure email backend**
5. **Set up logging**

### Docker Deployment

```bash
# Build image
docker build -t trackpulse-backend .

# Run container
docker run -p 8000:8000 --env-file .env trackpulse-backend
```

### Production Checklist

- [ ] Set `DEBUG = False`
- [ ] Configure secure `SECRET_KEY`
- [ ] Set up PostgreSQL database
- [ ] Configure email backend
- [ ] Set up logging
- [ ] Configure static file serving
- [ ] Set up SSL/HTTPS
- [ ] Configure monitoring
- [ ] Set up backup strategy
- [ ] Review security settings

### Common Issues

#### Migration Conflicts
```bash
python manage.py migrate --fake-initial
```

#### Static Files Not Loading
```bash
python manage.py collectstatic
```

#### CORS Issues
Check `CORS_ALLOWED_ORIGINS` in settings.py

#### Database Connection Errors
Verify database credentials and connectivity

For more information, see the [API Documentation](API_DOCS.md) and [Deployment Guide](DEPLOYMENT.md).
