from rest_framework import serializers
from .models import ReportTemplate, GeneratedReport

class ReportTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportTemplate
        fields = '__all__'

class GeneratedReportSerializer(serializers.ModelSerializer):
    template_name = serializers.CharField(source='template.name', read_only=True)
    
    class Meta:
        model = GeneratedReport
        fields = [
            'id', 'user', 'template', 'template_name', 'name', 
            'report_type', 'status', 'file_path', 'parameters', 
            'created_at', 'updated_at', 'scheduled_for'
        ]
        read_only_fields = ['user', 'status', 'file_path', 'created_at', 'updated_at']
