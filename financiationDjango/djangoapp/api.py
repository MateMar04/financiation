from .models import Visit
from rest_framework import viewsets, permissions
from .serializers import VisitSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Visit.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = VisitSerializer
