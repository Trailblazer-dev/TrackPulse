# 🚀 Step-by-Step Guide: Creating API Endpoints for TrackPulse

## 📋 Overview

This guide will walk you through implementing robust API endpoints for your TrackPulse Analytics project. We'll cover everything from basic CRUD operations to advanced analytics endpoints.

## 🛠️ Prerequisites

1. **Django Project Setup** ✅
2. **Django REST Framework Installed** ✅
3. **Models Created** ✅
4. **Database Migrated** ✅

## 📁 Project Structure

```
backend/
├── analytics/
│   ├── models.py          # Database models
│   ├── serializers.py     # Data serialization
│   ├── views.py          # API logic
│   ├── urls.py           # URL routing
│   └── admin.py          # Admin interface
├── trackpulse_analytics/
│   ├── settings.py       # Project settings
│   └── urls.py           # Main URL config
└── manage.py
```

## 🔧 Step 1: Install Required Dependencies

First, install the required packages:

```bash
pip install django-filter
```

Update your `requirements.txt`:

```
django-filter==23.3
```

## ⚙️ Step 2: Configure Settings

Add to your `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'corsheaders',
    'django_filters',  # Add this
    'analytics',
]

# Add REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}
```

## 🗂️ Step 3: Understanding the Models

Your models represent the Chinook database structure:

```python
# Key relationships:
# Artist -> Album -> Track
# Customer -> Invoice -> InvoiceLine -> Track
# Genre -> Track
```

## 🔄 Step 4: Create Serializers

Serializers convert model instances to JSON and vice versa:

```python
# analytics/serializers.py
from rest_framework import serializers
from .models import Artist, Album, Track, Customer, Invoice

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['artist_id', 'name']

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)

    class Meta:
        model = Album
        fields = ['album_id', 'title', 'artist']

# Add calculated fields
class TrackSerializer(serializers.ModelSerializer):
    duration_seconds = serializers.ReadOnlyField()

    class Meta:
        model = Track
        fields = ['track_id', 'name', 'duration_seconds']
```

## 🎯 Step 5: Create ViewSets

ViewSets provide the API endpoints:

```python
# analytics/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class ArtistViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']

    @action(detail=False, methods=['get'])
    def top_artists(self, request):
        # Custom endpoint for top artists
        top_artists = Artist.objects.annotate(
            total_sales=Sum('album__track__invoiceline__invoice__total')
        ).order_by('-total_sales')[:10]

        serializer = self.get_serializer(top_artists, many=True)
        return Response(serializer.data)
```

## 🔗 Step 6: Configure URLs

Set up URL routing:

```python
# analytics/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, AlbumViewSet, TrackViewSet

router = DefaultRouter()
router.register(r'artists', ArtistViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'tracks', TrackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

# trackpulse_analytics/urls.py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('analytics.urls')),
    path('api/auth/', include('users.urls')),
]
```

## 📊 Step 7: Create Analytics Endpoints

Advanced analytics endpoints for business insights:

```python
class AnalyticsViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def dashboard_summary(self, request):
        total_customers = Customer.objects.count()
        total_revenue = Invoice.objects.aggregate(
            Sum('total')
        )['total__sum'] or 0

        return Response({
            'total_customers': total_customers,
            'total_revenue': total_revenue,
        })

    @action(detail=False, methods=['get'])
    def sales_overview(self, request):
        # Monthly sales data
        monthly_sales = Invoice.objects.annotate(
            month=TruncMonth('invoice_date')
        ).values('month').annotate(
            total_sales=Sum('total')
        ).order_by('month')

        return Response(list(monthly_sales))
```

## 🔍 Step 8: Add Advanced Filtering

Implement powerful filtering capabilities:

```python
class TrackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Track.objects.select_related('album__artist', 'genre')
    serializer_class = TrackSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    # Filter by related fields
    filterset_fields = ['genre', 'album', 'album__artist']

    # Search across multiple fields
    search_fields = ['name', 'album__title', 'album__artist__name']

    # Allow ordering by various fields
    ordering_fields = ['name', 'unit_price', 'milliseconds']
```

## 🧪 Step 9: Test Your API

### Using Django Shell

```python
python manage.py shell

# Test queries
from analytics.models import Artist, Album, Track
from django.db.models import Sum, Count

# Get top artists by sales
top_artists = Artist.objects.annotate(
    total_sales=Sum('album__track__invoiceline__invoice__total')
).order_by('-total_sales')[:5]

for artist in top_artists:
    print(f"{artist.name}: ${artist.total_sales}")
```

### Using curl

```bash
# Get all artists
curl http://localhost:8000/api/artists/

# Get top artists
curl http://localhost:8000/api/artists/top_artists/

# Search tracks
curl "http://localhost:8000/api/tracks/?search=rock"

# Get dashboard summary
curl http://localhost:8000/api/analytics/dashboard_summary/
```

## 🚀 Step 10: Run and Test

1. **Run migrations**:

```bash
python manage.py makemigrations
python manage.py migrate
```

2. **Create superuser**:

```bash
python manage.py createsuperuser
```

3. **Start development server**:

```bash
python manage.py runserver
```

4. **Test endpoints**:
   - Visit `http://localhost:8000/api/` for API root
   - Visit `http://localhost:8000/admin/` for admin interface

## 🔧 Step 11: Performance Optimization

### Use select_related for ForeignKey relationships:

```python
# Instead of this (causes N+1 queries):
tracks = Track.objects.all()

# Use this (single query with JOINs):
tracks = Track.objects.select_related('album__artist', 'genre')
```

### Use prefetch_related for reverse relationships:

```python
# For getting albums with their tracks:
albums = Album.objects.prefetch_related('track_set')
```

### Add database indexes:

```python
class Track(models.Model):
    name = models.CharField(max_length=200, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['genre', 'album']),
        ]
```

## 📈 Step 12: Add Custom Analytics

### Top Tracks by Sales:

```python
@action(detail=False, methods=['get'])
def top_tracks(self, request):
    top_tracks = Track.objects.annotate(
        total_sold=Sum('invoiceline__quantity'),
        total_revenue=Sum('invoiceline__invoice__total')
    ).order_by('-total_sold')[:10]

    serializer = self.get_serializer(top_tracks, many=True)
    return Response(serializer.data)
```

### Genre Distribution:

```python
@action(detail=False, methods=['get'])
def genre_distribution(self, request):
    genre_data = Genre.objects.annotate(
        track_count=Count('track'),
        total_sales=Sum('track__invoiceline__invoice__total')
    ).order_by('-total_sales')

    return Response(GenreAnalyticsSerializer(genre_data, many=True).data)
```

## 🛡️ Step 13: Add Authentication

### Token Authentication:

```python
# Create token for user
from rest_framework.authtoken.models import Token
token = Token.objects.create(user=user)

# Use in requests
headers = {'Authorization': f'Token {token.key}'}
```

### Permission Classes:

```python
class ArtistViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
```

## 📝 Step 14: Document Your API

Create clear documentation:

````markdown
## Artists Endpoint

### GET /api/artists/

Returns paginated list of all artists.

**Parameters:**

- `search`: Search by artist name
- `ordering`: Sort by name or artist_id
- `page`: Page number

**Response:**

```json
{
  "count": 275,
  "results": [
    {
      "artist_id": 1,
      "name": "AC/DC"
    }
  ]
}
```
````

## 🎯 Common Patterns

### 1. List View with Filtering

```python
class TrackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Track.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['genre']
    search_fields = ['name']
```

### 2. Detail View with Related Data

```python
class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Album.objects.select_related('artist')
    serializer_class = AlbumSerializer
```

### 3. Custom Action

```python
@action(detail=False, methods=['get'])
def custom_endpoint(self, request):
    data = self.get_queryset().filter(custom_logic=True)
    serializer = self.get_serializer(data, many=True)
    return Response(serializer.data)
```

### 4. Analytics with Aggregation

```python
@action(detail=False, methods=['get'])
def analytics(self, request):
    result = MyModel.objects.aggregate(
        total=Sum('field'),
        count=Count('id'),
        avg=Avg('field')
    )
    return Response(result)
```

## 🚨 Troubleshooting

### Common Issues:

1. **Import Error**: Make sure all dependencies are installed
2. **Migration Error**: Run `python manage.py makemigrations` first
3. **500 Error**: Check Django debug output for detailed error
4. **CORS Error**: Add `corsheaders` to INSTALLED_APPS and middleware

### Debug Tips:

```python
# Add to views for debugging
import logging
logger = logging.getLogger(__name__)

def my_view(request):
    logger.info(f"Request: {request.GET}")
    # ... rest of view
```

## 🎉 Next Steps

1. **Add more analytics endpoints**
2. **Implement caching for better performance**
3. **Add API versioning**
4. **Create automated tests**
5. **Add API documentation with Swagger/OpenAPI**
6. **Implement rate limiting**
7. **Add monitoring and logging**

## 📚 Additional Resources

- [Django REST Framework Documentation](https://www.django-rest-framework.org/)
- [Django Filter Documentation](https://django-filter.readthedocs.io/)
- [Django QuerySet API](https://docs.djangoproject.com/en/4.2/ref/models/querysets/)
- [REST API Design Best Practices](https://restfulapi.net/)

Congratulations! You now have a comprehensive API for your TrackPulse Analytics project! 🎉
