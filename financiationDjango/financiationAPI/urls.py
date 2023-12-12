from django.urls import path, re_path

from . import views

urlpatterns = [
    # Locations
    path('locations', views.LocationApiView.as_view(), name='locations'),

    # City Departments
    path('city-departments', views.getCityDepartments, name='cityDepartments'),

    # Agreements
    path('agreements', views.AgreementApiView.as_view(), name='agreements'),

    # Groups
    path('groups', views.GroupApiView.as_view(), name='groups'),
    path('groups/<int:id>', views.getGroupById, name='group'),
    path('groups/user/<int:id>', views.getUserGroup, name='currenGroup'),
    path('creategroup', views.CreateGroupApiView.as_view(), name='createGroup'),
    path('groups/delete/<int:id>', views.deleteGroupById, name='delete_group'),

    # Agreements
    path('agreements', views.AgreementApiView.as_view(), name='agreements'),

    # Contacted Referrers
    path('contacted-referrers', views.ContactedRederrerApiView.as_view(), name='contactedReferrers'),
    path('contacted-referrers-emails', views.getContactedReferrersEmails, name='contactedReferrerEmails'),
    path('contacted-referrers-phones', views.getContactedReferrersPhones, name='contactedReferrerPhones'),

    # Addresses
    path('addresses', views.getAddresses, name='addresses'),

    # Visits
    path('visits', views.VisitApiView.as_view(), name='visits'),
    path('visits/<int:id>', views.getVisitById, name='visit'),
    path('visits/put/<int:id>', views.putVisitById, name='put_visit'),
    path('visits/latest/requests', views.getLatestVisitRequestCount, name='latestRequests'),
    path('visits/latest', views.getLatestVisits, name='latestVisits'),
    path('visits/delete/<int:id>', views.deleteVisitById, name='deletevisit'),

    # Users
    path('users/<int:id>', views.getUserById, name='user'),
    path('users', views.getUsers, name='users'),
    path('users/put/<int:id>', views.putUserbyId, name='put_user'),
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

    # Divisions
    path('divisions', views.getDivisions, name='divisions'),

    # FAQs
    path('faqs', views.getDivisionsFaqs, name='faqs'),

    # Whys
    path('whys', views.getWhys, name='whys'),

    # Coordinators
    path('coordinators', views.CoordinatorApiView.as_view(), name='coordinators'),
    path('coordinators/<int:id>', views.getCoordinator, name='coordinator'),
    path('groups/<int:id>/coordinators', views.getGroupCoordinators, name='groupCoordinators'),
    path('groups/<int:groupId>/coordinators/delete/<int:id>', views.deletecoordinatorById, name='deletecoordinator'),

    # Advisors
    path('advisors', views.AdvisorApiView.as_view(), name='advisors'),
    path('advisors/<int:id>', views.getAdvisor, name='advisor'),
    path('groups/<int:id>/advisors', views.getGroupAdvisors, name='groupAdvisors'),
    path('groups/<int:groupId>/advisors/delete/<int:id>', views.deleteadvisorById, name='deleteAdvisor'),
    path('user/<int:id>/advisor', views.getAdvisorByUserId, name='getAdvisorByUser'),

    # Roles
    path('roles', views.getRoles, name='roles'),
    path('roles/<int:id>', views.getRolesById, name='userStatuses'),

    # Requests
    path('requests', views.RequestApiView.as_view(), name='requests'),

    # Statuses
    path('visit-statuses', views.getVisitSatuses, name='visitStatuses'),
    path('request-statuses', views.getRequestStatuses, name='requestStatuses'),
    path('user-statuses', views.getUserStatuses, name='userStatuses'),
    path('user-statuses/<int:id>', views.getStatusesById, name='userStatuses'),

    # Reports
    re_path(r'reports$', views.getRequests, name='report'),
    re_path(r'reports/total-requests$', views.getTotalRequests, name='report'),
    re_path(r'reports/total-requests-by-advisors$', views.getTotalRequestsByAdvisor, name='report'),
    re_path(r'reports/total-requests-by-divisions$', views.getTotalRequestsByDivisions, name='report'),
    re_path(r'reports/total-requests-by-faqs$', views.getTotalRequestsByFaq, name='report'),
    re_path(r'reports/total-requests-by-locations$', views.getTotalRequestsByLocation, name='report'),
    re_path(r'reports/total-requests-by-visits$', views.getTotalRequestsByVisits, name='report'),
    path('top-three-advisors', views.getTopThreeAdvisors, name='top-three'),

    # EditarProfilePic
    path('update-profile-picture/<int:id>', views.ProfilePictureView.as_view(), name='ProfilePicture'),

    #mayors
    path('mayors/<int:id>', views.getMayorById, name='mayor'),
    path('mayors/delete/<int:id>', views.deleteMayorById, name='delete_mayor'),
    path('mayors/put/<int:id>', views.putMayorById, name='put_mayor'),
    path('mayors', views.MayorApiView.as_view(), name='mayors'),
    path('mayors-emails', views.getMayorsEmails, name='mayorEmails'),
    path('mayors-phones', views.getMayorsPhones, name='getMayorPhones'),
]
