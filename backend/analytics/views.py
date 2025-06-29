from django.db.models import Sum, Count, Avg, Q
from django.db.models.functions import TruncMonth, TruncYear
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
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


class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Album model"""
    queryset = Album.objects.select_related('artist').all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Genre model"""
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class TrackViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Track model"""
    queryset = Track.objects.select_related('album__artist', 'genre').all()
    serializer_class = TrackSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def top_tracks(self, request):
        """Get top-selling tracks"""
        top_tracks = Track.objects.annotate(
            total_sold=Sum('invoiceline__quantity')
        ).filter(total_sold__isnull=False).order_by('-total_sold')[:10]
        
        serializer = self.get_serializer(top_tracks, many=True)
        return Response(serializer.data)


class CustomerViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Customer model"""
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def top_customers(self, request):
        """Get top customers by total spending"""
        top_customers = Customer.objects.annotate(
            total_spent=Sum('invoice__total')
        ).filter(total_spent__isnull=False).order_by('-total_spent')[:10]
        
        serializer = self.get_serializer(top_customers, many=True)
        return Response(serializer.data)


class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Invoice model"""
    queryset = Invoice.objects.select_related('customer').all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class AnalyticsViewSet(viewsets.ViewSet):
    """ViewSet for analytics endpoints"""
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def sales_overview(self, request):
        """Get sales overview analytics"""
        # Monthly sales data
        monthly_sales = Invoice.objects.annotate(
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
        total_revenue = Invoice.objects.aggregate(Sum('total'))['total__sum'] or 0
        total_orders = Invoice.objects.count()
        avg_order_value = Invoice.objects.aggregate(Avg('total'))['total__avg'] or 0

        data = {
            'total_customers': total_customers,
            'total_tracks': total_tracks,
            'total_artists': total_artists,
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'average_order_value': round(avg_order_value, 2) if avg_order_value else 0
        }

        return Response(data)
