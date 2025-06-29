from rest_framework import serializers
from .models import Artist, Album, Genre, Track, Customer, Invoice, InvoiceLine


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['artist_id', 'name']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['genre_id', 'name']


class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)
    
    class Meta:
        model = Album
        fields = ['album_id', 'title', 'artist']


class TrackSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    duration_seconds = serializers.ReadOnlyField()
    
    class Meta:
        model = Track
        fields = [
            'track_id', 'name', 'album', 'genre', 'composer',
            'milliseconds', 'duration_seconds', 'bytes', 'unit_price'
        ]


class CustomerSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Customer
        fields = [
            'customer_id', 'first_name', 'last_name', 'full_name',
            'company', 'address', 'city', 'state', 'country',
            'postal_code', 'phone', 'email'
        ]
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class InvoiceLineSerializer(serializers.ModelSerializer):
    track = TrackSerializer(read_only=True)
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = InvoiceLine
        fields = ['invoice_line_id', 'track', 'unit_price', 'quantity', 'total_price']


class InvoiceSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    invoice_lines = InvoiceLineSerializer(source='invoiceline_set', many=True, read_only=True)
    
    class Meta:
        model = Invoice
        fields = [
            'invoice_id', 'customer', 'invoice_date', 'billing_address',
            'billing_city', 'billing_state', 'billing_country',
            'billing_postal_code', 'total', 'invoice_lines'
        ]


# Analytics-specific serializers
class SalesAnalyticsSerializer(serializers.Serializer):
    """Serializer for sales analytics data"""
    period = serializers.CharField()
    total_sales = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_orders = serializers.IntegerField()
    average_order_value = serializers.DecimalField(max_digits=10, decimal_places=2)


class GenreAnalyticsSerializer(serializers.Serializer):
    """Serializer for genre analytics data"""
    genre_name = serializers.CharField()
    total_sales = serializers.DecimalField(max_digits=15, decimal_places=2)
    track_count = serializers.IntegerField()
    percentage = serializers.DecimalField(max_digits=5, decimal_places=2)


class CountryAnalyticsSerializer(serializers.Serializer):
    """Serializer for country analytics data"""
    country = serializers.CharField()
    total_sales = serializers.DecimalField(max_digits=15, decimal_places=2)
    customer_count = serializers.IntegerField()
    average_customer_value = serializers.DecimalField(max_digits=10, decimal_places=2)
