from django.contrib import admin
from .models import Artist, Album, Genre, Track, Customer, Invoice, InvoiceLine


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['artist_id', 'name']
    search_fields = ['name']
    ordering = ['name']


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['album_id', 'title', 'artist']
    list_filter = ['artist']
    search_fields = ['title', 'artist__name']
    ordering = ['title']


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['genre_id', 'name']
    search_fields = ['name']
    ordering = ['name']


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ['track_id', 'name', 'album', 'genre', 'unit_price']
    list_filter = ['genre', 'album__artist']
    search_fields = ['name', 'composer', 'album__title']
    ordering = ['name']


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id', 'first_name', 'last_name', 'email', 'country']
    list_filter = ['country', 'state']
    search_fields = ['first_name', 'last_name', 'email']
    ordering = ['last_name', 'first_name']


class InvoiceLineInline(admin.TabularInline):
    model = InvoiceLine
    extra = 0
    readonly_fields = ['track', 'unit_price', 'quantity']


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_id', 'customer', 'invoice_date', 'total']
    list_filter = ['invoice_date', 'billing_country']
    search_fields = ['customer__first_name', 'customer__last_name', 'customer__email']
    ordering = ['-invoice_date']
    inlines = [InvoiceLineInline]


@admin.register(InvoiceLine)
class InvoiceLineAdmin(admin.ModelAdmin):
    list_display = ['invoice_line_id', 'invoice', 'track', 'unit_price', 'quantity']
    list_filter = ['invoice__invoice_date']
    search_fields = ['track__name', 'invoice__customer__last_name']
