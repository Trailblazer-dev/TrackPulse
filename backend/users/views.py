from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .models import UserProfile
from .serializers import UserRegistrationSerializer, UserProfileSerializer, UserSerializer
from .tokens import CustomTokenObtainPairSerializer

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user and return JWT tokens
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Generate JWT tokens using custom serializer
        refresh = CustomTokenObtainPairSerializer.get_token(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id': str(user.user_id),
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Authenticate user and return JWT tokens using custom serializer
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if email and password:
        user = authenticate(username=email, password=password)
        if user:
            try:
                # Use the custom serializer to generate tokens
                refresh = CustomTokenObtainPairSerializer.get_token(user)
                access_token = refresh.access_token
                
                # Manually add the custom claims to the response
                return Response({
                    'refresh': str(refresh),
                    'access': str(access_token),
                    'user_id': str(user.user_id),
                    'username': user.username,
                    'email': user.email
                }, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"JWT Token generation error: {e}")
                return Response({
                    'error': 'Token generation failed'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({
        'error': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout user - with JWT, we just return success since tokens are stateless
    """
    # With JWT, logout is handled on the client side by discarding tokens
    # You could also implement a blacklist if needed
    return Response({
        'message': 'Successfully logged out'
    }, status=status.HTTP_200_OK)
    
        
        
        
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
