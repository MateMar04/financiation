from .models import VisitStatus
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = VisitStatus.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProjectSerializer
