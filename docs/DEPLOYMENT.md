# Deployment Guide

## Overview

This guide covers deploying TrackPulse Analytics to various platforms, with a focus on Render.com for production deployment.

## Deployment Options

### 1. Render (Recommended)
- **Backend**: Web Service
- **Frontend**: Static Site
- **Database**: PostgreSQL (optional upgrade from SQLite)

### 2. Vercel + Railway
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Railway PostgreSQL

### 3. Heroku
- **Full Stack**: Single Heroku app
- **Database**: Heroku PostgreSQL

### 4. AWS
- **Frontend**: S3 + CloudFront
- **Backend**: EC2 or ECS
- **Database**: RDS

## Render Deployment (Recommended)

### Prerequisites
- GitHub account with repository
- Render account
- Environment variables ready

### Backend Deployment

1. **Prepare Backend for Production**

   Update `backend/trackpulse_analytics/settings.py`:
   ```python
   import dj_database_url
   
   # Production database
   if not DEBUG:
       DATABASES['default'] = dj_database_url.parse(
           os.environ.get('DATABASE_URL')
       )
   
   # Static files
   STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
   STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
   ```

2. **Create Web Service on Render**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `trackpulse-backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn trackpulse_analytics.wsgi:application`
     - **Python Version**: `3.10.0`

3. **Environment Variables**
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=your-app-name.onrender.com
   DATABASE_URL=postgresql://... (from Render PostgreSQL)
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
   ```

4. **Database Setup**
   - Create PostgreSQL database on Render
   - Copy DATABASE_URL to backend environment variables
   - Run migrations after deployment:
     ```bash
     python manage.py migrate
     python manage.py createsuperuser
     ```

### Frontend Deployment

1. **Update Frontend Configuration**

   Update `frontend/src/services/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: process.env.NODE_ENV === 'production' 
       ? 'https://your-backend-url.onrender.com/api/v1'
       : 'http://localhost:8000/api/v1',
     withCredentials: true,
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

2. **Create Static Site on Render**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `trackpulse-frontend`
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Publish Directory**: `frontend/dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_ENVIRONMENT=production
   ```

### Domain Setup

1. **Custom Domain (Optional)**
   - Add custom domain in Render settings
   - Update DNS records
   - SSL certificate auto-generated

2. **CORS Configuration**
   Update backend CORS settings:
   ```python
   CORS_ALLOWED_ORIGINS = [
       'https://your-custom-domain.com',
       'https://your-frontend.onrender.com',
   ]
   ```

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "trackpulse_analytics.wsgi:application"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - DATABASE_URL=postgresql://user:password@db:5432/trackpulse
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:8000

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=trackpulse
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Vercel + Railway Deployment

### Frontend on Vercel

1. **Connect GitHub Repository**
   - Import project on Vercel
   - Set framework preset to "Vite"
   - Set root directory to `frontend`

2. **Build Settings**
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-railway-backend.railway.app
   ```

### Backend on Railway

1. **Create New Project**
   - Connect GitHub repository
   - Select backend folder

2. **Configure Variables**
   ```
   SECRET_KEY=your-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-app.railway.app
   DATABASE_URL=${{ DATABASE_URL }}
   ```

3. **Add PostgreSQL**
   - Add PostgreSQL service
   - Variables auto-configured

## Environment Configuration

### Production Environment Variables

**Backend (.env)**
```
SECRET_KEY=super-secret-key-for-production
DEBUG=False
ALLOWED_HOSTS=your-domain.com,your-app.onrender.com
DATABASE_URL=postgresql://user:password@host:port/database
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

**Frontend (.env.production)**
```
VITE_API_URL=https://your-backend-domain.com
VITE_ENVIRONMENT=production
VITE_SENTRY_DSN=your-sentry-dsn (optional)
```

### Security Configuration

1. **HTTPS Enforcement**
   ```python
   # settings.py (production)
   SECURE_SSL_REDIRECT = True
   SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
   SECURE_HSTS_SECONDS = 31536000
   SECURE_HSTS_INCLUDE_SUBDOMAINS = True
   SECURE_HSTS_PRELOAD = True
   ```

2. **CORS Security**
   ```python
   CORS_ALLOWED_ORIGINS = [
       'https://yourdomain.com',
   ]
   CORS_ALLOW_CREDENTIALS = True
   ```

3. **Content Security Policy**
   ```python
   CSP_DEFAULT_SRC = ("'self'",)
   CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'")
   CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
   ```

## Database Migration

### SQLite to PostgreSQL

1. **Export SQLite Data**
   ```bash
   python manage.py dumpdata --exclude auth.permission --exclude contenttypes > data.json
   ```

2. **Update Database Settings**
   ```python
   DATABASES = {
       'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
   }
   ```

3. **Import to PostgreSQL**
   ```bash
   python manage.py migrate
   python manage.py loaddata data.json
   ```

## Monitoring and Logging

### Error Tracking
```python
# settings.py
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=os.environ.get('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
```

### Logging Configuration
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

## Performance Optimization

### Backend Optimizations

1. **Database Connections**
   ```python
   DATABASES['default']['CONN_MAX_AGE'] = 600
   ```

2. **Caching**
   ```python
   CACHES = {
       'default': {
           'BACKEND': 'django_redis.cache.RedisCache',
           'LOCATION': os.environ.get('REDIS_URL'),
           'OPTIONS': {
               'CLIENT_CLASS': 'django_redis.client.DefaultClient',
           }
       }
   }
   ```

### Frontend Optimizations

1. **Build Optimization**
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             charts: ['chart.js', 'react-chartjs-2'],
           },
         },
       },
     },
   });
   ```

2. **Compression**
   ```nginx
   # nginx.conf
   gzip on;
   gzip_types text/css application/javascript application/json;
   ```

## Backup and Recovery

### Database Backup
```bash
# Create backup
pg_dump $DATABASE_URL > backup.sql

# Restore backup
psql $DATABASE_URL < backup.sql
```

### Automated Backups
```bash
# Cron job for daily backups
0 2 * * * pg_dump $DATABASE_URL | gzip > backups/backup_$(date +\%Y\%m\%d).sql.gz
```

## Rollback Strategy

1. **Database Migrations**
   ```bash
   python manage.py migrate app_name previous_migration
   ```

2. **Application Rollback**
   - Use git tags for releases
   - Revert to previous commit
   - Redeploy

3. **Frontend Rollback**
   - Revert git commit
   - Trigger new deployment

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ALLOWED_ORIGINS
   - Verify frontend URL in backend settings

2. **Static Files Not Loading**
   - Run `python manage.py collectstatic`
   - Check STATIC_ROOT and STATIC_URL

3. **Database Connection Errors**
   - Verify DATABASE_URL
   - Check database credentials

4. **Build Failures**
   - Check Node.js version
   - Verify package.json dependencies

### Debug Mode
```python
# Temporary debug for production issues
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
```

## Health Checks

### Backend Health Check
```python
# views.py
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy'})

# urls.py
path('health/', health_check, name='health_check'),
```

### Frontend Health Check
```javascript
// Add to index.html
<script>
  window.healthCheck = () => ({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
</script>
```

This deployment guide covers all major deployment scenarios and should help you successfully deploy TrackPulse Analytics to production.
