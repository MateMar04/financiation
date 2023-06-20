from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),

    # GETs
    path('advised/', views.getAdvised, name='advised'),
    path('advised/<str:pk>/', views.getOneAdvised, name='oneAdvised'),
    path('locality/', views.getLocalities, name='getLocalities'),
    path('group/', views.getGroups, name='getGroups'),
    path('visit-status/', views.getVisitSatuses, name='getVisitStatuses'),
    path('agreement/', views.getAgreements, name='getAgreements'),
    path('contacted-referrer/', views.getContactedReferrers, name='getContactedReferrers'),
    path('address/', views.getAddresses, name='getAddresses'),
    path('logo/', views.getLogos, name='getLogos'),
    path('visit/', views.getVisits, name='getVisits'),
    path('ministry-department/', views.getMinistryDepartments, name='getMinistryDepartments'),

    # POSTs
    path('visit/add/', views.postVisit, name='postVisit'),
    path('group/add/', views.postGroup, name='postGroup'),
    path('request/add/', views.postRequest, name='postRequest')
]
