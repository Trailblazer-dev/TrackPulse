from django.db.models import Sum, Count, Avg, Q
from django.db.models.functions import TruncMonth, TruncYear
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Artist, Album, Genre, Track, Customer, Invoice, InvoiceLine
from .serializers import (
    ArtistSerializer, AlbumSerializer, GenreSerializer, TrackSerializer,
    CustomerSerializer, InvoiceSerializer, SalesAnalyticsSerializer,
    GenreAnalyticsSerializer, CountryAnalyticsSerializer
)


class ArtistViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Artist model"""
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'artist_id']
    ordering = ['name']

    @action(detail=False, methods=['get'])
    def top_artists(self, request):
        """Get top artists by total sales"""
        top_artists = Artist.objects.annotate(
            total_sales=Sum('album__track__invoiceline__invoice__total'),
            total_tracks=Count('album__track', distinct=True),
            total_albums=Count('album', distinct=True)
        ).filter(total_sales__isnull=False).order_by('-total_sales')[:10]
        
        # Add calculated fields to serializer data
        data = []
        for artist in top_artists:
            artist_data = ArtistSerializer(artist).data
            artist_data.update({
                'total_sales': artist.total_sales,
                'total_tracks': artist.total_tracks,
                'total_albums': artist.total_albums
            })
            data.append(artist_data)
        
        return Response(data)


class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Album model"""
    queryset = Album.objects.select_related('artist').all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['artist']
    search_fields = ['title', 'artist__name']
    ordering_fields = ['title', 'album_id']
    ordering = ['title']

    @action(detail=False, methods=['get'])
    def top_albums(self, request):
        """Get top-selling albums"""
        top_albums = Album.objects.annotate(
            total_sales=Sum('track__invoiceline__invoice__total'),
            track_count=Count('track', distinct=True)
        ).filter(total_sales__isnull=False).order_by('-total_sales')[:10]
        
        data = []
        for album in top_albums:
            album_data = AlbumSerializer(album).data
            album_data.update({
                'total_sales': album.total_sales,
                'track_count': album.track_count
            })
            data.append(album_data)
        
        return Response(data)


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Genre model"""
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'genre_id']
    ordering = ['name']


class TrackViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Track model"""
    queryset = Track.objects.select_related('album__artist', 'genre').all()
    serializer_class = TrackSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['genre', 'album', 'album__artist']
    search_fields = ['name', 'album__title', 'album__artist__name', 'composer']
    ordering_fields = ['name', 'unit_price', 'milliseconds']
    ordering = ['name']

    @action(detail=False, methods=['get'])
    def top_tracks(self, request):
        """Get top-selling tracks"""
        top_tracks = Track.objects.annotate(
            total_sold=Sum('invoiceline__quantity'),
            total_revenue=Sum('invoiceline__invoice__total')
        ).filter(total_sold__isnull=False).order_by('-total_sold')[:10]
        
        data = []
        for track in top_tracks:
            track_data = TrackSerializer(track).data
            track_data.update({
                'total_sold': track.total_sold,
                'total_revenue': track.total_revenue
            })
            data.append(track_data)
        
        return Response(data)

    @action(detail=False, methods=['get'])
    def by_genre(self, request):
        """Get tracks filtered by genre"""
        genre_id = request.query_params.get('genre_id')
        if not genre_id:
            return Response({'error': 'genre_id parameter is required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        tracks = self.queryset.filter(genre_id=genre_id)
        serializer = self.get_serializer(tracks, many=True)
        return Response(serializer.data)


class CustomerViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Customer model"""
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['country', 'city', 'state']
    search_fields = ['first_name', 'last_name', 'email', 'company']
    ordering_fields = ['first_name', 'last_name', 'email', 'customer_id']
    ordering = ['last_name', 'first_name']

    @action(detail=False, methods=['get'])
    def top_customers(self, request):
        """Get top customers by total spending"""
        top_customers = Customer.objects.annotate(
            total_spent=Sum('invoice__total'),
            total_orders=Count('invoice', distinct=True)
        ).filter(total_spent__isnull=False).order_by('-total_spent')[:10]
        
        data = []
        for customer in top_customers:
            customer_data = CustomerSerializer(customer).data
            customer_data.update({
                'total_spent': customer.total_spent,
                'total_orders': customer.total_orders
            })
            data.append(customer_data)
        
        return Response(data)

    @action(detail=False, methods=['get'])
    def by_country(self, request):
        """Get customers by country"""
        country = request.query_params.get('country')
        if not country:
            return Response({'error': 'country parameter is required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        customers = self.queryset.filter(country__iexact=country)
        serializer = self.get_serializer(customers, many=True)
        return Response(serializer.data)


class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Invoice model"""
    queryset = Invoice.objects.select_related('customer').all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['customer', 'billing_country']
    search_fields = ['customer__first_name', 'customer__last_name', 'customer__email']
    ordering_fields = ['invoice_date', 'total', 'invoice_id']
    ordering = ['-invoice_date']

    @action(detail=False, methods=['get'])
    def recent_orders(self, request):
        """Get recent orders"""
        limit = int(request.query_params.get('limit', 10))
        recent_invoices = self.queryset.order_by('-invoice_date')[:limit]
        serializer = self.get_serializer(recent_invoices, many=True)
        return Response(serializer.data)


class AnalyticsViewSet(viewsets.ViewSet):
    """ViewSet for analytics endpoints"""
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def sales_overview(self, request):
        """Get sales overview analytics"""
        # Get date range parameters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        queryset = Invoice.objects.all()
        if start_date:
            queryset = queryset.filter(invoice_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(invoice_date__lte=end_date)
        
        # Monthly sales data
        monthly_sales = queryset.annotate(
            month=TruncMonth('invoice_date')
        ).values('month').annotate(
            total_sales=Sum('total'),
            total_orders=Count('invoice_id'),
            average_order_value=Avg('total')
        ).order_by('month')

        # Convert to list and format data
        data = []
        for item in monthly_sales:
            data.append({
                'period': item['month'].strftime('%Y-%m'),
                'total_sales': item['total_sales'] or 0,
                'total_orders': item['total_orders'] or 0,
                'average_order_value': item['average_order_value'] or 0
            })

        serializer = SalesAnalyticsSerializer(data, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def genre_analysis(self, request):
        """Get genre-based analytics"""
        genre_data = Genre.objects.annotate(
            total_sales=Sum('track__invoiceline__invoice__total'),
            track_count=Count('track', distinct=True)
        ).filter(total_sales__isnull=False).order_by('-total_sales')

        # Calculate total sales for percentage calculation
        total_revenue = sum(item.total_sales for item in genre_data if item.total_sales)

        data = []
        for genre in genre_data:
            percentage = (genre.total_sales / total_revenue * 100) if total_revenue > 0 else 0
            data.append({
                'genre_name': genre.name,
                'total_sales': genre.total_sales,
                'track_count': genre.track_count,
                'percentage': round(percentage, 2)
            })

        serializer = GenreAnalyticsSerializer(data, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def country_analysis(self, request):
        """Get country-based analytics"""
        country_data = Customer.objects.values('country').annotate(
            total_sales=Sum('invoice__total'),
            customer_count=Count('customer_id', distinct=True),
            average_customer_value=Avg('invoice__total')
        ).filter(
            total_sales__isnull=False,
            country__isnull=False
        ).order_by('-total_sales')

        data = []
        for item in country_data:
            data.append({
                'country': item['country'],
                'total_sales': item['total_sales'] or 0,
                'customer_count': item['customer_count'] or 0,
                'average_customer_value': item['average_customer_value'] or 0
            })

        serializer = CountryAnalyticsSerializer(data, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def dashboard_summary(self, request):
        """Get dashboard summary statistics"""
        total_customers = Customer.objects.count()
        total_tracks = Track.objects.count()
        total_artists = Artist.objects.count()
        total_albums = Album.objects.count()
        total_revenue = Invoice.objects.aggregate(Sum('total'))['total__sum'] or 0
        total_orders = Invoice.objects.count()
        avg_order_value = Invoice.objects.aggregate(Avg('total'))['total__avg'] or 0

        # Get recent activity
        recent_orders = Invoice.objects.order_by('-invoice_date')[:5]
        recent_orders_data = []
        for order in recent_orders:
            recent_orders_data.append({
                'invoice_id': order.invoice_id,
                'customer_name': f"{order.customer.first_name} {order.customer.last_name}",
                'total': order.total,
                'date': order.invoice_date.strftime('%Y-%m-%d')
            })

        data = {
            'total_customers': total_customers,
            'total_tracks': total_tracks,
            'total_artists': total_artists,
            'total_albums': total_albums,
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'average_order_value': round(avg_order_value, 2) if avg_order_value else 0,
            'recent_orders': recent_orders_data
        }

        return Response(data)

    @action(detail=False, methods=['get'])
    def yearly_comparison(self, request):
        """Get year-over-year comparison"""
        yearly_data = Invoice.objects.annotate(
            year=TruncYear('invoice_date')
        ).values('year').annotate(
            total_sales=Sum('total'),
            total_orders=Count('invoice_id'),
            average_order_value=Avg('total')
        ).order_by('year')

        data = []
        for item in yearly_data:
            data.append({
                'year': item['year'].strftime('%Y'),
                'total_sales': item['total_sales'] or 0,
                'total_orders': item['total_orders'] or 0,
                'average_order_value': item['average_order_value'] or 0
            })

        return Response(data)

    @action(detail=False, methods=['get'])
    def search_analytics(self, request):
        """Search across all entities"""
        query = request.query_params.get('q', '')
        if not query:
            return Response({'error': 'q parameter is required'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        # Search across different models
        artists = Artist.objects.filter(name__icontains=query)[:5]
        albums = Album.objects.filter(title__icontains=query)[:5]
        tracks = Track.objects.filter(name__icontains=query)[:5]
        customers = Customer.objects.filter(
            Q(first_name__icontains=query) | 
            Q(last_name__icontains=query) | 
            Q(email__icontains=query)
        )[:5]

        data = {
            'artists': ArtistSerializer(artists, many=True).data,
            'albums': AlbumSerializer(albums, many=True).data,
            'tracks': TrackSerializer(tracks, many=True).data,
            'customers': CustomerSerializer(customers, many=True).data,
            'total_results': artists.count() + albums.count() + tracks.count() + customers.count()
        }

        return Response(data)
