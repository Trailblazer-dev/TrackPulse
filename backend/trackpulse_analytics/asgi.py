"""
ASGI config for trackpulse_analytics project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trackpulse_analytics.settings')

application = get_asgi_application()
