from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from analytics.models import Artist, Album, Genre, Track
from .models import ContactMessage, NewsletterSubscription

class GuestAPITests(APITestCase):
    def setUp(self):
        # Create some sample data for ExploreView
        self.artist = Artist.objects.create(name="Test Artist")
        self.album = Album.objects.create(title="Test Album", artist=self.artist)
        self.genre = Genre.objects.create(name="Test Genre")
        self.track = Track.objects.create(
            name="Test Track",
            album=self.album,
            genre=self.genre,
            media_type_id=1,
            milliseconds=300000,
            unit_price=0.99
        )

    def test_explore_view(self):
        """Test that ExploreView is accessible and returns data."""
        url = reverse('explore')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('artists', response.data)
        self.assertIn('albums', response.data)
        self.assertIn('tracks', response.data)
        self.assertTrue(len(response.data['artists']) > 0)

    def test_explore_search(self):
        """Test that ExploreView filtering by query parameter works."""
        url = reverse('explore')
        # Search for something that exists
        response = self.client.get(url, {'q': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data['artists']) > 0)
        self.assertEqual(response.data['artists'][0]['name'], "Test Artist")

        # Search for something that doesn't exist
        response = self.client.get(url, {'q': 'NonExistent'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['artists']), 0)
        self.assertEqual(len(response.data['albums']), 0)
        self.assertEqual(len(response.data['tracks']), 0)

    def test_contact_view(self):
        """Test that ContactMessageView is accessible and creates a message."""
        url = reverse('contact')
        data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'Hello, I have a question.'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.first().name, 'John Doe')

    def test_newsletter_subscribe_view(self):
        """Test that NewsletterSubscriptionView is accessible and creates a subscription."""
        url = reverse('newsletter-subscribe')
        data = {
            'email': 'jane@example.com'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsletterSubscription.objects.count(), 1)
        self.assertEqual(NewsletterSubscription.objects.first().email, 'jane@example.com')

    def test_newsletter_duplicate_subscription(self):
        """Test that subscribing with an already registered email returns a bad request."""
        url = reverse('newsletter-subscribe')
        email = 'duplicate@example.com'
        NewsletterSubscription.objects.create(email=email)
        
        data = {'email': email}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(NewsletterSubscription.objects.count(), 1)
