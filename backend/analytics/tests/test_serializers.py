# backend/tests/test_serializers.py

from django.test import TestCase
from models import Artist, Album, Track, Invoice
from serializers import (
    ArtistSerializer,
    AlbumSerializer,
    TrackSerializer,
    InvoiceSerializer,
    SalesAnalyticsSerializer,
    TopCustomerSerializer,
    DashboardSummarySerializer
)
from datetime import datetime
from decimal import Decimal


class SerializerTestCase(TestCase):
    def setUp(self):
        # Core models
        self.artist = Artist.objects.create(name="Test Artist")
        self.album = Album.objects.create(title="Test Album", artist=self.artist)
        self.track = Track.objects.create(title="Test Track", album=self.album, duration=210)
        self.invoice = Invoice.objects.create(amount=Decimal('99.99'), created_at=datetime.now())

    def test_artist_serializer(self):
        serializer = ArtistSerializer(instance=self.artist)
        data = serializer.data
        self.assertEqual(data["name"], "Test Artist")

    def test_album_serializer(self):
        serializer = AlbumSerializer(instance=self.album)
        data = serializer.data
        self.assertEqual(data["title"], "Test Album")
        self.assertEqual(data["artist"], self.artist.id)

    def test_track_serializer(self):
        serializer = TrackSerializer(instance=self.track)
        data = serializer.data
        self.assertEqual(data["title"], "Test Track")
        self.assertEqual(data["duration"], 210)

    def test_invoice_serializer(self):
        serializer = InvoiceSerializer(instance=self.invoice)
        data = serializer.data
        self.assertEqual(str(data["amount"]), "99.99")

    def test_sales_analytics_serializer(self):
        payload = {"total_sales": "3500.50", "total_customers": 45}
        serializer = SalesAnalyticsSerializer(data=payload)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["total_sales"], Decimal("3500.50"))

    def test_top_customer_serializer(self):
        payload = {"name": "Alice", "total_spent": "1250.00"}
        serializer = TopCustomerSerializer(data=payload)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["name"], "Alice")

    def test_dashboard_summary_serializer(self):
        payload = {
            "sales_count": 120,
            "revenue": "50000.00",
            "active_users": 22,
        }
        serializer = DashboardSummarySerializer(data=payload)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["revenue"], Decimal("50000.00"))
