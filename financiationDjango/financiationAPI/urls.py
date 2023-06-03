from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('advised/', views.getAdvised, name='advised'),
    path('advised/<str:pk>/', views.getOneAdvised, name='oneAdvised'),
]
