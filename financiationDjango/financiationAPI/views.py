from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


# Create your views here.

class RequestApiView(APIView):
    def get(self, request, *args, **kwargs):
        requests = Request.objects.all()
        serializer = RequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        visit = Visit.objects.get(id=data['id_visit'])
        advised = Advised.objects.get(id=data['id_advised'])
        advisor = Advisor.objects.get(id=data['id_advisor'])
        ministryDepartment = MinistryDepartment.objects.get(id=data['id_ministry_department'])
        faq = Faq.objects.get(id=data['id_faq'])
        requestStatus = RequestStatus.objects.get(id=data['id_status'])

        request = Request.objects.create(
            id_visit=visit,
            id_advised=advised,
            id_advisor=advisor,
            id_ministry_department=ministryDepartment,
            id_faq=faq,
            id_status=requestStatus,
        )

        serializer = RequestSerializer(request, many=False)
        return Response(serializer.data)


class VisitApiView(APIView):
    def get(self, request, *args, **kwargs):
        visits = Visit.objects.all()
        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        locality = Locality.objects.get(id=data['id_locality'])
        group = Group.objects.get(id=data['id_group'])
        visit_status = VisitStatus.objects.get(id=data['id_visit_status'])
        contacted_referrer = ContactedReferrer.objects.get(id=data['id_contacted_referrer'])
        address = Address.objects.get(id=data['id_address'])

        visit = Visit.objects.create(
            flyer=data['flyer'],
            distance=data['distance'],
            travel_time=data['travel_time'],
            visit_date=data['visit_date'],
            civil_registration=data['civil_registration'],
            accommodation=data['accommodation'],
            modernization_fund=data['modernization_fund'],
            start_time=data['start_time'],
            finish_time=data['finish_time'],
            place_name=data['place_name'],
            id_locality=locality,
            id_group=group,
            id_visit_status=visit_status,
            id_contacted_referrer=contacted_referrer,
            id_address=address,
        )

        for i in data['id_agreement']:
            agreement = Agreement.objects.get(id=i)
            visit.id_agreement.add(agreement)

        for j in data['id_logo']:
            logo = Logo.objects.get(id=j)
            visit.id_logo.add(logo)

        serializer = VisitSerializer(visit, many=False)
        return Response(serializer.data)


class AdiviseeApiView(APIView):

    def get(self, request, *args, **kwargs):
        advised = Advised.objects.all()
        serializer = AdvisedSerializer(advised, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        advised = Advised.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            ssn=data['ssn']
        )
        serializer = AdvisedSerializer(advised, many=False)
        return Response(serializer.data)


class GroupApiView(APIView):
    def get(self, request, *args, **kwargs):
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        group = Group.objects.create(
            name=data['name']
        )
        serializer = GroupSerializer(group, many=False)
        return Response(serializer.data)


class CoordinatorApiView(APIView):
    def get(self, request, *args, **kwargs):
        coordinators = Coordinator.objects.all()
        serializer = CoordinatorSerializer(coordinators, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        user = UserAccount.objects.get(id=data['id_user'])
        group = Group.objects.get(id=data['id_group'])

        coordinator = Coordinator.objects.create(
            id_user=user,
            id_group=group
        )

        serializer = CoordinatorSerializer(coordinator, many=False)
        return Response(serializer.data)


class AdvisorApiView(APIView):
    def get(self, request, *args, **kwargs):
        advisors = Advisor.objects.all()
        serializer = AdvisorSerializer(advisors, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        user = UserAccount.objects.get(id=data['id_user'])
        group = Group.objects.get(id=data['id_group'])

        advisor = Advisor.objects.create(
            id_user=user,
            id_group=group,
        )

        serializer = AdvisorSerializer(advisor, many=False)
        return Response(serializer.data)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/api/advised/',
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': None,
            'description': 'Returns an array of advised'
        },
        {
            'Endpoint': '/api/advised/id/',
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': None,
            'description': 'Returns an advised'
        },
        {
            'Endpoint': '/auth/jwt/verify',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'uid': '',
                'token': '',
                'new_password': '',
                're_new_password': ''
            },
            'description': 'Authenticates the user account'
        },
        {
            'Endpoint': '/auth/users/me/',
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': None,
            'description': 'Returns the user account'
        },
        {
            'Endpoint': '/auth/users/id/',
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': None,
            'description': 'Returns an user account'
        },
        {
            'Endpoint': '/auth/users/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'first_name': '',
                'last_name': '',
                'email': '',
                'ssn': '',
                'username': '',
                'phone_number': '',
                'password': '',
                're_password': ''
            },
            'description': 'Creates an Account'
        },
        {
            'Endpoint': '/auth/users/activation/uid/token/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'uid': '',
                'token': ''
            },
            'description': 'Activates an Account'
        },
        {
            'Endpoint': '/auth/jwt/create/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'username': '',
                'password': '',
            },
            'description': 'Returns a new JWT'
        },
        {
            'Endpoint': '/auth/jwt/refresh/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'refresh': ''
            },
            'description': 'Returns a new access token'
        },
        {
            'Endpoint': '/auth/users/reset_password/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'username': '',
                'email': ''
            },
            'description': 'Sends an email to reset password'
        },
        {
            'Endpoint': 'auth/users/reset_password_confirm/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'uid': '',
                'token': '',
                'new_password': '',
                're_new_password': ''
            },
            'description': 'Resets account password'
        },
        {
            'Endpoint': '/api/visit/add',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'flyer': '',
                'distance': '',
                'travel_time': '',
                'visit_date': '',
                'civil_registration': '',
                'accommodation': '',
                'modernization_fund': '',
                'start_time': '',
                'finish_time': '',
                'place_name': '',
                'id_locality': '',
                'id_group': '',
                'id_visit_status': '',
                'id_agreement': '',
                'id_contacted_referrer': '',
                'id_address': '',
                'id_logo': ''
            },
            'description': 'Adds a visit'
        },
        {
            'Endpoint': '/api/group/add',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'name': ''
            },
            'description': 'Adds a visit'
        },
        {
            'Endpoint': 'api/request/add/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'id_visit': '',
                'id_advised': '',
                'id_advisor': '',
                'id_ministry_department': '',
                'id_faq': '',
                'id_status': ''
            },
            'description': 'Sends a request'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getAdvisee(request, id):
    advised = Advised.objects.get(id=id)
    serializer = AdvisedSerializer(advised, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getLocations(request):
    localities = Locality.objects.all()
    serializer = LocalitySerializer(localities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMinistryDepartments(request):
    departments = MinistryDepartment.objects.all()
    serializer = MinistryDepartmentSerializer(departments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getFaqs(request):
    faqs = Faq.objects.all()
    serializer = FaqSerializer(faqs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVisitSatuses(request):
    visit_statuses = VisitStatus.objects.all()
    serializer = VisitStatusSerializer(visit_statuses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAgreements(request):
    agreements = Agreement.objects.all()
    serializer = AgreementSerializer(agreements, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getContactedReferrers(request):
    contacted_referrers = ContactedReferrer.objects.all()
    serializer = ContactedReferrerSerializer(contacted_referrers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAddresses(request):
    addresses = Address.objects.all()
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getLogos(request):
    logos = Logo.objects.all()
    serializer = LogoSerializer(logos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUsers(request):
    useraccount = UserAccount.objects.all()
    serializer = UserAccountSerializer(useraccount, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVehicles(request):
    vehicles = Vehicles.objects.all()
    serializer = VehiclesSerializer(vehicles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRequestStatus(request):
    requeststatus = RequestStatus.objects.all()
    serializer = RequestStatusSerializer(requeststatus, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getContactedReferrersEmails(request):
    contactedreferreremail = ContactedReferrerEmail.objects.all()
    serializer = ContactedReferrerEmailSerializer(contactedreferreremail, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getContactedReferrersPhones(request):
    contactedreferrerphone = ContactedReferrerPhone.objects.all()
    serializer = ContactedReferrerPhoneSerializer(contactedreferrerphone, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMayorsEmails(request):
    mayoremail = MayorEmail.objects.all()
    serializer = MayorEmailSerializer(mayoremail, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMayorsPhones(request):
    mayorphone = MayorPhone.objects.all()
    serializer = MayorPhoneSerializer(mayorphone, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCoordinator(request, id):
    coordinator = Coordinator.objects.get(id=id)
    serializer = CoordinatorSerializer(coordinator, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getAdvisor(request, id):
    advisor = Advisor.objects.get(id=id)
    serializer = AdvisorSerializer(advisor, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCityDepartments(request):
    cityDepartment = CityDepartment.objects.all()
    serializer = CityDepartmentSerializer(cityDepartment, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUserStatuses(request):
    userStatus = UserStatus.objects.all()
    serializer = UserStatusSerializer(userStatus, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMayors(request):
    mayor = Mayor.objects.all()
    serializer = MayorSerializer(mayor, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVehicleBrands(request):
    vehicleBrand = VehicleBrand.objects.all()
    serializer = VehicleBrandSerializer(vehicleBrand, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVehicleModels(request):
    vehicleModel = VehicleModel.objects.all()
    serializer = VehicleModelSerializer(vehicleModel, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPoliticParties(request):
    politicParty = PoliticParty.objects.all()
    serializer = PoliticPartySerializer(politicParty, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVehiclePlates(request):
    vehiclePlate = VehiclePlate.objects.all()
    serializer = VehiclePlateSerializer(vehiclePlate, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRoles(request):
    role = Role.objects.all()
    serializer = RoleSerializer(role, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRequestStatuses(request):
    requestStatus = RequestStatus.objects.all()
    serializer = RequestStatusSerializer(requestStatus, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupAdvisors(request, id):
    advisors = Advisor.objects.filter(id_group__id=id)
    serializer = AdvisorSerializer(advisors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupCoordinators(request, id):
    coordinators = Coordinator.objects.filter(id_group__id=id)
    serializer = CoordinatorSerializer(coordinators, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAdvisorUsers(request):
    users = User.objects.filter(advisor__isnull=False)
    serializer = UserAccountSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCoordinatorUsers(request):
    users = User.objects.filter(coordinator__isnull=False)
    serializer = UserAccountSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupCoordinatorUsers(request, id):
    users = User.objects.filter(coordinator__id_group__id=id)
    serializer = UserAccountSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupAdvisorUsers(request, id):
    users = User.objects.filter(advisor__id_group__id=id)
    serializer = UserAccountSerializer(users, many=True)
    return Response(serializer.data)
