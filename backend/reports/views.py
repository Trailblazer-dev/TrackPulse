from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ReportTemplate, GeneratedReport
from .serializers import ReportTemplateSerializer, GeneratedReportSerializer
from django.utils import timezone
import time

class ReportTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ReportTemplate.objects.all()
    serializer_class = ReportTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

class GeneratedReportViewSet(viewsets.ModelViewSet):
    serializer_class = GeneratedReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GeneratedReport.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        recent_reports = self.get_queryset().filter(status='COMPLETED').order_by('-created_at')[:10]
        serializer = self.get_serializer(recent_reports, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def scheduled(self, request):
        scheduled_reports = self.get_queryset().filter(status='SCHEDULED').order_by('scheduled_for')
        serializer = self.get_serializer(scheduled_reports, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def generate(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            report = serializer.save(user=self.request.user, status='IN_PROGRESS')
            
            # In a real app, this would be a Celery task
            # For this MVP, we just mark it as completed after a small delay
            # (Note: In a real request/response, we shouldn't sleep, 
            # but this is just to simulate the backend doing work)
            report.status = 'COMPLETED'
            report.save()
            
            return Response(self.get_serializer(report).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
