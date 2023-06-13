from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('advised/', views.getAdvised, name='advised'),
    path('advised/<str:pk>/', views.getOneAdvised, name='oneAdvised'),
    path('visit/add/', views.postVisit, name='postVisit'),
    path('group/add/', views.postGroup, name='postGroup'),
]
