from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from analytics.models import Artist, Album, Genre, Track
from .models import TrackBookmark

User = get_user_model()

class BookmarkAPITests(APITestCase):
    def setUp(self):
        # Create user
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpassword123'
        )
        
        # Create sample data
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
        
        # Authenticate
        self.client.force_authenticate(user=self.user)

    def test_create_bookmark(self):
        """Test creating a track bookmark."""
        url = reverse('bookmarks-list')
        data = {'track': self.track.track_id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TrackBookmark.objects.count(), 1)
        self.assertEqual(TrackBookmark.objects.first().track, self.track)

    def test_duplicate_bookmark(self):
        """Test that bookmarking the same track twice fails."""
        TrackBookmark.objects.create(user=self.user, track=self.track)
        url = reverse('bookmarks-list')
        data = {'track': self.track.track_id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_bookmarks(self):
        """Test listing user's bookmarks."""
        TrackBookmark.objects.create(user=self.user, track=self.track)
        url = reverse('bookmarks-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Handle paginated response
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['track'], self.track.track_id)
        self.assertIn('track_details', results[0])

    def test_remove_bookmark_by_track_id(self):
        """Test removing a bookmark using the track ID."""
        TrackBookmark.objects.create(user=self.user, track=self.track)
        url = reverse('bookmarks-remove-by-track', kwargs={'track_id': self.track.track_id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TrackBookmark.objects.count(), 0)
