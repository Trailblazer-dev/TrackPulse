from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Artist, Genre, Track, Customer, Invoice


class AnalyticsModelTests(TestCase):
    def setUp(self):
        self.artist = Artist.objects.create(name="Test Artist")
        self.genre = Genre.objects.create(name="Test Genre")
        
    def test_artist_creation(self):
        self.assertEqual(self.artist.name, "Test Artist")
        self.assertEqual(str(self.artist), "Test Artist")

    def test_genre_creation(self):
        self.assertEqual(self.genre.name, "Test Genre")
        self.assertEqual(str(self.genre), "Test Genre")


class AnalyticsAPITests(APITestCase):
    def setUp(self):
        self.artist = Artist.objects.create(name="Test Artist")
        self.genre = Genre.objects.create(name="Rock")
        
    def test_artists_list(self):
        url = reverse('artist-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_genres_list(self):
        url = reverse('genre-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_analytics_dashboard_summary(self):
        url = reverse('analytics-dashboard-summary')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_customers', response.data)
        self.assertIn('total_tracks', response.data)
        self.assertIn('total_artists', response.data)
