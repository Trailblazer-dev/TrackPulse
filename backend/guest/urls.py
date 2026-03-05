from django.urls import path
from .views import ContactMessageView, NewsletterSubscriptionView, ExploreView

urlpatterns = [
    path('contact/', ContactMessageView.as_view(), name='contact'),
    path('newsletter/subscribe/', NewsletterSubscriptionView.as_view(), name='newsletter-subscribe'),
    path('explore/', ExploreView.as_view(), name='explore'),
]
