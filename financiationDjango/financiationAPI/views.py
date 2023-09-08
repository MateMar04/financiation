from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .serializers import UserAccountSerializer
from .utils import in_memory_uploaded_file_to_binary, parse_and_convert, execute_query


# Create your views here.


class ProfilePictureView(APIView):
    def put(self, request, *args, **kwargs):

        data = request.data

        user = UserAccount.objects.get(id=1)

        image = in_memory_uploaded_file_to_binary(data['profile_picture'])

        user.profile_picture = image

        user.save()

        serializer = UserAccountSerializer(user, many=False)

        return Response(serializer.data)

    def get(self, request):
        user_id = request.query_params.get('id_useraccount')

        try:
            user_profile = UserAccount.objects.get(id=5)
        except UserAccount.DoesNotExist:
            return Response({"error": "User not found."}, status=404)

        profile_picture = user_profile.profile_picture

        if profile_picture:
            return Response({"pic": profile_picture})


class RequestApiView(APIView):
    def get(self, request, *args, **kwargs):
        requests = Request.objects.all()
        serializer = RequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        visit = Visit.objects.get(id=data['visit_id'])
        advisor = Advisor.objects.get(id=data['advisor_id'])
        ministryDepartment = MinistryDepartment.objects.get(id=data['ministry_department_id'])
        faq = Faq.objects.get(id=data['faq_id'])
        requestStatus = RequestStatus.objects.get(id=data['status_id'])

        request = Request.objects.create(
            visit_id=visit,
            advisor_id=advisor,
            ministry_department_id=ministryDepartment,
            faq_id=faq,
            status_id=requestStatus,
        )

        serializer = RequestSerializer(request, many=False)
        return Response(serializer.data)


class VisitApiView(APIView):
    def get(self, request, *args, **kwargs):

        locations_ids = parse_and_convert(request.GET.getlist('locs'))

        if isinstance(locations_ids, type(None)):
            visits = Visit.objects.all()[:100]
        else:
            visits = Visit.objects.raw("SELECT * "
                                       "FROM \"financiationAPI_visit\" "
                                       "WHERE location_id IN %s",
                                       [locations_ids])

        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data

        location = Location.objects.get(id=data['location_id'])
        group = Group.objects.get(id=data['group_id'])
        visit_status = VisitStatus.objects.get(id=data['visit_status_id'])
        contacted_referrer = ContactedReferrer.objects.get(id=data['contacted_referrer_id'])
        address = Address.objects.get(id=data['address_id'])

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
            location_id=location,
            group_id=group,
            visit_status_id=visit_status,
            contacted_referrer_id=contacted_referrer,
            address_id=address,
        )

        for i in data['agreement_id']:
            agreement = Agreement.objects.get(id=i)
            visit.agreement_id.add(agreement)

        serializer = VisitSerializer(visit, many=False)
        return Response(serializer.data)


class MayorApiView(APIView):
    def get(self, request, *args, **kwargs):
        mayor = Mayor.objects.all()
        serializer = MayorSerializer(mayor, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        mayor = Mayor.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
        )
        serializer = MayorSerializer(mayor, many=False)
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

        user = UserAccount.objects.get(id=data['user_id'])
        group = Group.objects.get(id=data['group_id'])

        coordinator = Coordinator.objects.create(
            user_id=user,
            group_id=group
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

        user = UserAccount.objects.get(id=data['user_id'])
        group = Group.objects.get(id=data['group_id'])

        advisor = Advisor.objects.create(
            user_id=user,
            group_id=group,
        )

        serializer = AdvisorSerializer(advisor, many=False)
        return Response(serializer.data)


@api_view(['GET'])
def getLocations(request):
    locations = Location.objects.all()
    serializer = LocationsSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMinistryDepartments(request):
    departments = MinistryDepartment.objects.all()
    serializer = MinistryDepartmentSerializer(departments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMinistryDepartmentFaqs(request):
    ministry_ids = parse_and_convert(request.GET.getlist('deps'))

    if isinstance(ministry_ids, type(None)):
        faqs = Faq.objects.all()[:100]
    else:
        faqs = Faq.objects.raw(
            "SELECT F.id "
            "FROM \"financiationAPI_faq\" AS F "
            "WHERE ministry_department_id IN %s "
            "GROUP BY F.id",
            [ministry_ids])

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
def getUsers(request):
    useraccount = UserAccount.objects.all()
    serializer = UserAccountSerializer(useraccount, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVehicles(request):
    vehicles = Vehicle.objects.all()
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
    advisors = Advisor.objects.filter(group_id__id=id)
    serializer = AdvisorSerializer(advisors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupCoordinators(request, id):
    coordinators = Coordinator.objects.filter(group_id__id=id)
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
    users = User.objects.filter(coordinator__group_id__id=id)
    serializer = UserAccountSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRequests(request):
    faqs_ids = parse_and_convert(request.GET.getlist('faqs'))
    visits_ids = parse_and_convert(request.GET.getlist('visits'))

    requests = Request.objects.raw(
        "SELECT * "
        "FROM \"financiationAPI_request\" AS R "
        "INNER JOIN \"financiationAPI_faq\" AS F ON R.faq_id = F.id "
        "WHERE R.visit_id IN %s "
        "AND R.faq_id IN %s",
        [visits_ids, faqs_ids])
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupAdvisorUsers(request, id):
    users = User.objects.filter(advisor__group_id__id=id)
    serializer = UserAccountSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroupById(request, id):
    group = Group.objects.get(id=id)
    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getStatusesById(request, id):
    status = UserStatus.objects.get(id=id)
    serializer = UserStatusSerializer(status, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getRolesById(request, id):
    role = Role.objects.get(id=id)
    serializer = RoleSerializer(role, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTotalRequests(request):
    return execute_query("SELECT 'requests', count(*) as \"total_requests\" "
                         "FROM \"financiationAPI_request\" "
                         "WHERE visit_id IN %s "
                         "AND faq_id IN %s", request)


@api_view(['GET'])
def getTotalRequestsByAdvisor(request):
    return execute_query("SELECT CONCAT(U.first_name, ' ', U.last_name), count(*) "
                         "FROM \"financiationAPI_request\" "
                         "INNER JOIN \"financiationAPI_advisor\" AS A on advisor_id = A.id "
                         "INNER JOIN \"financiationAPI_useraccount\" U on A.user_id = U.id "
                         "WHERE visit_id IN %s "
                         "AND faq_id IN %s "
                         "GROUP BY CONCAT(U.first_name, ' ', U.last_name)", request)


@api_view(['GET'])
def getTotalRequestsByMinistryDepartment(request):
    return execute_query("SELECT MD.name, count(*) "
                         "FROM \"financiationAPI_request\" "
                         "INNER JOIN \"financiationAPI_faq\" F on F.id = faq_id "
                         "INNER JOIN \"financiationAPI_ministrydepartment\" MD on MD.id = F.ministry_department_id "
                         "WHERE visit_id IN %s "
                         "AND faq_id IN %s "
                         "GROUP BY MD.name", request)


@api_view(['GET'])
def getTotalRequestsByFaq(request):
    return execute_query("SELECT F.name, count(*) "
                         "FROM \"financiationAPI_request\" "
                         "INNER JOIN \"financiationAPI_faq\" F on F.id = faq_id "
                         "WHERE visit_id IN %s "
                         "AND faq_id IN %s "
                         "GROUP BY F.name", request)


@api_view(['GET'])
def getTotalRequestsByLocation(request):
    return execute_query("SELECT L.name, count(*) "
                         "FROM \"financiationAPI_request\" "
                         "INNER JOIN \"financiationAPI_visit\" V on visit_id = V.id "
                         "INNER JOIN \"financiationAPI_location\" L on L.id = V.location_id "
                         "WHERE visit_id IN %s "
                         "AND faq_id IN %s "
                         "GROUP BY L.name", request)


@api_view(['GET'])
def getTotalRequestsByVisits(request):
    return execute_query("SELECT CONCAT(L.name, ' ', V.visit_date), count(*) "
                         "FROM \"financiationAPI_request\" "
                         "INNER JOIN \"financiationAPI_visit\" V on visit_id = V.id "
                         "INNER JOIN \"financiationAPI_location\" L on L.id = V.location_id "
                         "WHERE visit_id IN %s "
                         "AND faq_id IN %s "
                         "GROUP BY CONCAT(L.name, ' ', V.visit_date)", request)


@api_view(['GET'])
def getUserById(request, id):
    user = UserAccount.objects.get(id=id)
    serializer = UserAccountSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getMayorById(request, id):
    mayor = Mayor.objects.get(id=id)
    serializer = MayorSerializer(mayor, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteMayorById(request, id, *args, **kwargs):
        mayor = Mayor.objects.get(id=id)
        mayor.delete()
        serializer = MayorSerializer(mayor, many=False)
        return Response(serializer.data)