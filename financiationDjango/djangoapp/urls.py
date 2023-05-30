from rest_framework import routers
from .api import ProjectViewSet


router = routers.DefaultRouter()
router.register('api/djangoapp', ProjectViewSet, 'djangoapp')

urlpatterns = router.urls