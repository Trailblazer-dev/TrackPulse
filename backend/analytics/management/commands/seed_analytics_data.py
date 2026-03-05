import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from analytics.models import Artist, Album, Genre, Track, Customer, Invoice, InvoiceLine
from reports.models import ReportTemplate, GeneratedReport
from audit.models import AuditLog
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with sample analytics data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')
        
        # ... (rest of the handle remains same until # 7)

        # 1. Create Genres
        genres_names = ['Rock', 'Pop', 'Jazz', 'Metal', 'Hip-Hop', 'Classical', 'Blues', 'Reggae', 'Country', 'Electronic']
        genre_objs = []
        for name in genres_names:
            genre, _ = Genre.objects.get_or_create(name=name)
            genre_objs.append(genre)
        self.stdout.write(f'Created {len(genre_objs)} genres.')

        # 2. Create Artists
        artist_names = [
            'The Rolling Stones', 'Led Zeppelin', 'Miles Davis', 'Metallica', 'Eminem',
            'Ludwig van Beethoven', 'B.B. King', 'Bob Marley', 'Johnny Cash', 'Daft Punk',
            'Pink Floyd', 'Queen', 'The Beatles', 'AC/DC', 'Nirvana'
        ]
        artist_objs = []
        for name in artist_names:
            artist, _ = Artist.objects.get_or_create(name=name)
            artist_objs.append(artist)
        self.stdout.write(f'Created {len(artist_objs)} artists.')

        # 3. Create Albums and Tracks
        track_objs = []
        if Album.objects.count() == 0:
            for artist in artist_objs:
                for i in range(random.randint(2, 4)):
                    album = Album.objects.create(
                        title=f'{artist.name} - Greatest Hits Vol {i+1}',
                        artist=artist
                    )
                    for j in range(random.randint(8, 12)):
                        track = Track.objects.create(
                            name=f'{artist.name} - Track {i+1}-{j+1}',
                            album=album,
                            genre=random.choice(genre_objs),
                            media_type_id=1,
                            milliseconds=random.randint(180000, 420000),
                            bytes=random.randint(3000000, 8000000),
                            unit_price=0.99
                        )
                        track_objs.append(track)
            self.stdout.write(f'Created {Album.objects.count()} albums and {len(track_objs)} tracks.')
        else:
            track_objs = list(Track.objects.all())

        # 4. Create Customers
        countries = ['USA', 'Canada', 'Brazil', 'France', 'Germany', 'United Kingdom', 'Norway', 'Australia', 'Japan', 'India']
        customer_objs = []
        if Customer.objects.count() == 0:
            for i in range(30):
                customer = Customer.objects.create(
                    first_name=f'First{i+1}',
                    last_name=f'Last{i+1}',
                    email=f'customer{i+1}@example.com',
                    country=random.choice(countries),
                    city='Sample City',
                    address='123 Sample St'
                )
                customer_objs.append(customer)
            self.stdout.write(f'Created {len(customer_objs)} customers.')
        else:
            customer_objs = list(Customer.objects.all())

        # 5. Create Invoices and InvoiceLines
        if Invoice.objects.count() == 0:
            for customer in customer_objs:
                for i in range(random.randint(1, 5)):
                    invoice_date = timezone.now() - timedelta(days=random.randint(0, 365*2))
                    invoice = Invoice.objects.create(
                        customer=customer,
                        invoice_date=invoice_date,
                        total=0,
                        billing_country=customer.country
                    )
                    
                    invoice_total = 0
                    selected_tracks = random.sample(track_objs, random.randint(1, 10))
                    for track in selected_tracks:
                        quantity = random.randint(1, 2)
                        unit_price = track.unit_price
                        InvoiceLine.objects.create(
                            invoice=invoice,
                            track=track,
                            unit_price=unit_price,
                            quantity=quantity
                        )
                        invoice_total += unit_price * quantity
                    
                    invoice.total = invoice_total
                    invoice.save()
            self.stdout.write(f'Created {Invoice.objects.count()} invoices.')

        # 6. Create Report Templates
        templates = [
            {'name': 'Revenue Summary', 'description': 'Financial overview with key metrics', 'category': 'Financial'},
            {'name': 'Artist Performance', 'description': 'Detailed artist streaming and revenue stats', 'category': 'Analytics'},
            {'name': 'Audience Demographics', 'description': 'Listener age, location, and platform breakdown', 'category': 'Analytics'},
            {'name': 'Content Performance', 'description': 'Track and album performance metrics', 'category': 'Performance'},
            {'name': 'Royalty Distribution', 'description': 'Breakdown of royalty payments', 'category': 'Financial'}
        ]
        template_objs = []
        for t in templates:
            template, _ = ReportTemplate.objects.get_or_create(
                name=t['name'],
                defaults={'description': t['description'], 'category': t['category']}
            )
            template_objs.append(template)
        self.stdout.write(f'Created {len(template_objs)} report templates.')

        # 7. Create some reports for the admin user
        admin = User.objects.filter(role='admin').first()
        if admin:
            # Recent reports
            for i in range(5):
                GeneratedReport.objects.create(
                    user=admin,
                    template=random.choice(template_objs),
                    name=f"Admin Report {i+1}",
                    report_type="Financial",
                    status="COMPLETED"
                )
            # Scheduled reports
            for i in range(3):
                GeneratedReport.objects.create(
                    user=admin,
                    template=random.choice(template_objs),
                    name=f"Scheduled Admin Report {i+1}",
                    report_type="Analytics",
                    status="SCHEDULED",
                    scheduled_for=timezone.now() + timedelta(days=random.randint(1, 30))
                )
            self.stdout.write('Created mock reports for admin user.')

        # 8. Create mock audit logs
        if admin:
            actions = ['LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT']
            resources = ['USER', 'REPORT', 'TRACK', 'ALBUM', 'ARTIST']
            for i in range(20):
                AuditLog.objects.create(
                    user=admin,
                    action=random.choice(actions),
                    resource_type=random.choice(resources),
                    resource_id=str(random.randint(1, 100)),
                    details={'info': f'Mock audit log entry {i+1}'},
                    ip_address='127.0.0.1'
                )
            self.stdout.write('Created mock audit logs.')

        self.stdout.write(self.style.SUCCESS('Successfully seeded all data.'))
