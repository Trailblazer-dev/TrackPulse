from django.db import models


class Artist(models.Model):
    """Artist model based on Chinook database structure"""
    artist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120, null=False)

    class Meta:
        db_table = 'Artist'
        ordering = ['name']

    def __str__(self):
        return self.name


class Album(models.Model):
    """Album model based on Chinook database structure"""
    album_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=160, null=False)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, db_column='ArtistId')

    class Meta:
        db_table = 'Album'
        ordering = ['title']

    def __str__(self):
        return self.title


class Genre(models.Model):
    """Genre model based on Chinook database structure"""
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120)

    class Meta:
        db_table = 'Genre'
        ordering = ['name']

    def __str__(self):
        return self.name


class Track(models.Model):
    """Track model based on Chinook database structure"""
    track_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, db_column='AlbumId', null=True, blank=True)
    media_type_id = models.IntegerField()
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, db_column='GenreId', null=True, blank=True)
    composer = models.CharField(max_length=220, null=True, blank=True)
    milliseconds = models.IntegerField(null=False)
    bytes = models.IntegerField(null=True, blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    class Meta:
        db_table = 'Track'
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def duration_seconds(self):
        """Convert milliseconds to seconds"""
        return self.milliseconds / 1000 if self.milliseconds else 0


class Customer(models.Model):
    """Customer model based on Chinook database structure"""
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=40, null=False)
    last_name = models.CharField(max_length=20, null=False)
    company = models.CharField(max_length=80, null=True, blank=True)
    address = models.CharField(max_length=70, null=True, blank=True)
    city = models.CharField(max_length=40, null=True, blank=True)
    state = models.CharField(max_length=40, null=True, blank=True)
    country = models.CharField(max_length=40, null=True, blank=True)
    postal_code = models.CharField(max_length=10, null=True, blank=True)
    phone = models.CharField(max_length=24, null=True, blank=True)
    fax = models.CharField(max_length=24, null=True, blank=True)
    email = models.CharField(max_length=60, null=False)
    support_rep_id = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'Customer'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Invoice(models.Model):
    """Invoice model based on Chinook database structure"""
    invoice_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, db_column='CustomerId')
    invoice_date = models.DateTimeField(null=False)
    billing_address = models.CharField(max_length=70, null=True, blank=True)
    billing_city = models.CharField(max_length=40, null=True, blank=True)
    billing_state = models.CharField(max_length=40, null=True, blank=True)
    billing_country = models.CharField(max_length=40, null=True, blank=True)
    billing_postal_code = models.CharField(max_length=10, null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    class Meta:
        db_table = 'Invoice'
        ordering = ['-invoice_date']

    def __str__(self):
        return f"Invoice {self.invoice_id} - {self.customer}"


class InvoiceLine(models.Model):
    """InvoiceLine model based on Chinook database structure"""
    invoice_line_id = models.AutoField(primary_key=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, db_column='InvoiceId')
    track = models.ForeignKey(Track, on_delete=models.CASCADE, db_column='TrackId')
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    quantity = models.IntegerField(null=False)

    class Meta:
        db_table = 'InvoiceLine'

    def __str__(self):
        return f"Invoice Line {self.invoice_line_id}"

    @property
    def total_price(self):
        """Calculate total price for this line item"""
        return self.unit_price * self.quantity
