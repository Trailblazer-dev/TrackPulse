from django.db.models import Count, Sum
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ContactMessage, NewsletterSubscription
from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer
from analytics.models import Artist, Album, Track
from analytics.serializers import ArtistSerializer, AlbumSerializer, TrackSerializer

class ContactMessageView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

class NewsletterSubscriptionView(generics.CreateAPIView):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    permission_classes = [permissions.AllowAny]

class ExploreView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        try:
            search_query = request.query_params.get('q', None)
            
            if search_query:
                artists = Artist.objects.filter(name__icontains=search_query).annotate(
                    track_count=Count('album__track', distinct=True),
                    album_count=Count('album', distinct=True)
                )[:10]
                albums = Album.objects.filter(title__icontains=search_query)[:10]
                tracks = Track.objects.filter(name__icontains=search_query).annotate(
                    total_sales=Sum('invoiceline__quantity')
                )[:10]
            else:
                # Get a sample of artists, albums, and tracks
                artists = Artist.objects.order_by('?').annotate(
                    track_count=Count('album__track', distinct=True),
                    album_count=Count('album', distinct=True)
                )[:10]
                albums = Album.objects.order_by('?')[:20]
                tracks = Track.objects.order_by('?').annotate(
                    total_sales=Sum('invoiceline__quantity')
                )[:50]

            # Serialize the data
            artist_data = []
            for artist in artists:
                data = ArtistSerializer(artist).data
                data['track_count'] = getattr(artist, 'track_count', 0)
                data['album_count'] = getattr(artist, 'album_count', 0)
                artist_data.append(data)

            album_serializer = AlbumSerializer(albums, many=True)
            
            track_data = []
            for track in tracks:
                data = TrackSerializer(track).data
                data['total_sales'] = getattr(track, 'total_sales', 0)
                track_data.append(data)

            # Prepare the response data
            response_data = {
                'artists': artist_data,
                'albums': album_serializer.data,
                'tracks': track_data,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)