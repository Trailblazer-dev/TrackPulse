from django.test import TestCase
from models import Artist, Album, Genre, Track, Customer, Invoice, InvoiceLine
from datetime import datetime
from decimal import Decimal


class ChinookModelTests(TestCase):
    def setUp(self):
        # Core entities
        self.artist = Artist.objects.create(name="AC/DC")
        self.album = Album.objects.create(title="Back in Black", artist=self.artist)
        self.genre = Genre.objects.create(name="Rock")

        # Track
        self.track = Track.objects.create(
            name="Hells Bells",
            album=self.album,
            media_type_id=1,
            genre=self.genre,
            composer="Angus Young",
            milliseconds=300000,
            bytes=5120000,
            unit_price=Decimal("0.99")
        )

        # Customer
        self.customer = Customer.objects.create(
            first_name="John",
            last_name="Doe",
            email="john@example.com"
        )

        # Invoice
        self.invoice = Invoice.objects.create(
            customer=self.customer,
            invoice_date=datetime.now(),
            total=Decimal("1.98")
        )

        # InvoiceLine
        self.invoice_line = InvoiceLine.objects.create(
            invoice=self.invoice,
            track=self.track,
            unit_price=Decimal("0.99"),
            quantity=2
        )

    def test_artist_str(self):
        self.assertEqual(str(self.artist), "AC/DC")

    def test_album_str(self):
        self.assertEqual(str(self.album), "Back in Black")
        self.assertEqual(self.album.artist.name, "AC/DC")

    def test_genre_str(self):
        self.assertEqual(str(self.genre), "Rock")

    def test_track_str(self):
        self.assertEqual(str(self.track), "Hells Bells")

    def test_track_duration_property(self):
        self.assertEqual(self.track.duration_seconds, 300)

    def test_customer_str(self):
        self.assertEqual(str(self.customer), "John Doe")

    def test_invoice_str(self):
        self.assertIn("Invoice", str(self.invoice))
        self.assertIn("John Doe", str(self.invoice))

    def test_invoice_line_str(self):
        self.assertIn("Invoice Line", str(self.invoice_line))

    def test_invoice_line_total_price(self):
        self.assertEqual(self.invoice_line.total_price, Decimal("1.98"))

    def test_foreign_keys_integrity(self):
        self.assertEqual(self.invoice.customer, self.customer)
        self.assertEqual(self.invoice_line.track, self.track)
        self.assertEqual(self.invoice_line.invoice, self.invoice)
        self.assertEqual(self.track.album, self.album)
        self.assertEqual(self.track.genre, self.genre)
