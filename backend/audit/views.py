from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AuditLog
from .serializers import AuditLogSerializer
from users.permissions import IsAdmin
from django.db.models import Count
from django.db.models.functions import TruncDay
from django.utils import timezone
from datetime import timedelta

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsAdmin]
    filterset_fields = ['action', 'resource_type', 'user']
    search_fields = ['resource_id', 'details']
    ordering_fields = ['timestamp', 'action', 'resource_type']

    @action(detail=False, methods=['get'])
    def visualizations(self, request):
        # Activity over the last 7 days
        last_7_days = timezone.now() - timedelta(days=7)
        daily_activity = self.get_queryset().filter(
            timestamp__gte=last_7_days
        ).annotate(
            day=TruncDay('timestamp')
        ).values('day').annotate(
            count=Count('id')
        ).order_by('day')

        # Activity by resource type
        by_resource = self.get_queryset().values('resource_type').annotate(
            count=Count('id')
        ).order_by('-count')

        # Activity by action
        by_action = self.get_queryset().values('action').annotate(
            count=Count('id')
        ).order_by('-count')

        return Response({
            'daily_activity': daily_activity,
            'by_resource': by_resource,
            'by_action': by_action
        })

    @action(detail=False, methods=['get'])
    def export(self, request):
        # In a real app, this would generate CSV/PDF
        # For now, just return a message and the data
        logs = self.get_queryset()[:100]
        serializer = self.get_serializer(logs, many=True)
        return Response({
            'message': 'Export started. You will be notified when it is ready.',
            'data': serializer.data
        })
