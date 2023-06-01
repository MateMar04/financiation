from rest_framework import routers
from .api import VisitViewSet


router = routers.DefaultRouter()
router.register('api/djangoapp', VisitViewSet, 'djangoapp')

urlpatterns = router.urls