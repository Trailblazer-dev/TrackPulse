from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .models import UserProfile
from .serializers import UserRegistrationSerializer, UserProfileSerializer, UserSerializer

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.user_id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Authenticate user and return token
    """
    email = request.data.get('email')
    # username = request.data.get('username') 
    password = request.data.get('password')
    
    # Try to authenticate with email first (our custom user model uses email as USERNAME_FIELD)
    user = None
    if email and password:
        user = authenticate(username=email, password=password)
    # elif username and password:
    #     # Also try with username for backward compatibility
    #     # First try to find user by username, then authenticate with their email
    #     try:
    #         user_obj = User.objects.get(username=username)
    #         user = authenticate(username=user_obj.email, password=password)
    #     except User.DoesNotExist:
    #         user = None
        

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
    
    return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout user by deleting token
    """
    try:
        request.user.auth_token.delete()
        return Response({
            'message': 'Successfully logged out'
        }, status=status.HTTP_200_OK)
    except:
        return Response({
            'error': 'Error logging out'
        }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Retrieve and update user profile
    """
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile


class UserDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve and update user details
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    """
    Get current user information
    """
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)
    
    return Response({
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'profile': {
            'bio': profile.bio,
            'location': profile.location,
            'birth_date': profile.birth_date,
            'avatar': profile.avatar.url if profile.avatar else None
        }
    }, status=status.HTTP_200_OK)
