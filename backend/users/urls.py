from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    register, login, logout, user_info, 
    UserProfileView, UserDetailView, TrackBookmarkViewSet
)

router = DefaultRouter()
router.register(r'bookmarks', TrackBookmarkViewSet, basename='bookmarks')

urlpatterns = [
    path('auth/register/', register, name='user-register'),
    path('auth/login/', login, name='user-login'),
    path('auth/logout/', logout, name='user-logout'),
    path('me/', user_info, name='user-info'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('detail/', UserDetailView.as_view(), name='user-detail'),
    path('auth/jwt/', include('users.jwt_urls')),
    path('', include(router.urls)),
]
