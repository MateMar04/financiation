from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),

    # Advisees
    path('advisees', views.getAdvisees, name='advisees'),
    path('advisees/<int:id>', views.getAdvisee, name='advisee'),
    path('advisees', views.postAdvisee, name='postAdvisee'),

    # Locations
    path('locations', views.getLocations, name='locations'),

    # City Departments
    path('city-departments', views.getCityDepartments, name='cityDepartments'),

    # Groups
    path('groups', views.getGroups, name='groups'),
    path('groups', views.postGroup, name='postGroup'),

    # Agreements
    path('agreements', views.getAgreements, name='agreements'),

    # Contacted Referrers
    path('contacted-referrers', views.getContactedReferrers, name='contactedReferrers'),
    path('contacted-referrers-emails', views.getContactedReferrersEmails, name='contactedReferrerEmails'),
    path('contacted-referrers-phones', views.getContactedReferrersPhones, name='contactedReferrerPhones'),

    # Addresses
    path('addresses', views.getAddresses, name='addresses'),

    # Logos
    path('logos', views.getLogos, name='logos'),

    # Visits
    path('visits', views.getVisits, name='visits'),
    path('visits', views.postVisit, name='postVisit'),

    # Users
    path('users', views.getUsers, name='users'),
    path('advisor-users', views.getAdvisorUsers, name='advisorUsers'),
    path('coordinator-users', views.getCoordinatorUsers, name='coordinatorUsers'),
    path('groups/<int:id>/coordinator-users', views.getGroupCoordinatorUsers, name='getGroupCoordinatorUsers'),
    path('groups/<int:id>/advisor-users', views.getGroupAdvisorUsers, name='getGroupAdvisorUsers'),

    # Vehicles
    path('vehicles', views.getVehicles, name='vehicles'),
    path('vehicle-brands', views.getVehicleBrands, name='vehicleBrand'),
    path('vehicle-models', views.getVehicleModels, name='vehicleModels'),
    path('vehicle-plates', views.getVehiclePlates, name='vehiclePlates'),

    # Politic Parties
    path('politic-parties', views.getPoliticParties, name='politicParties'),

    # Mayors
    path('mayors', views.getMayors, name='mayors'),
    path('mayors-emails', views.getMayorsEmails, name='mayorEmails'),
    path('mayors-phones', views.getMayorsPhones, name='getMayorPhones'),

    # Ministry Departments
    path('ministry-departments', views.getMinistryDepartments, name='ministryDepartments'),

    # FAQs
    path('faqs', views.getFaqs, name='faqs'),

    # Coordinators
    path('coordinators', views.getCoordinators, name='coordinators'),
    path('coordinators/<int:id>', views.getCoordinator, name='coordinator'),
    path('groups/<int:id>/coordinators', views.getGroupCoordinators, name='groupCoordinators'),
    path('coordinators', views.postCoordinator, name='postCoordinator'),

    # Advisors
    path('advisors', views.getAdvisors, name='advisors'),
    path('advisors/<int:id>', views.getAdvisor, name='advisor'),
    path('groups/<int:id>/advisors', views.getGroupAdvisors, name='groupAdvisors'),
    path('advisors', views.postAdvisor, name='postAdvisor'),

    # Roles
    path('roles', views.getRoles, name='roles'),

    # Requests
    path('requests', views.getRequests, name='requests'),
    path('requests', views.postRequest, name='postRequest'),

    # Statuses
    path('visit-statuses', views.getVisitSatuses, name='visitStatuses'),
    path('request-statuses', views.getRequestStatuses, name='requestStatuses'),
    path('user-statuses', views.getUserStatuses, name='userStatuses'),
]
