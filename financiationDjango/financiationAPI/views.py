import datetime

from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .serializers import UserAccountSerializer
from .utils import in_memory_uploaded_file_to_binary, parse_and_convert, execute_query, to_json


# Create your views here.


class ProfilePictureView(APIView):
    def put(self, request, id, *args, **kwargs):

        data = request.data

        user = UserAccount.objects.get(id=id)

        image = in_memory_uploaded_file_to_binary(data['profile_picture'])

        user.profile_picture = image

        user.save()

        serializer = UserAccountSerializer(user, many=False)

        return Response(serializer.data)

    def get(self, request, id):
        user_id = request.query_params.get('id_useraccount')

        try:
            user_profile = UserAccount.objects.get(id=id)
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
        faq = Faq.objects.get(id=data['faq_id'])
        why = Why.objects.get(id=data['why_id'])
        requestStatus = RequestStatus.objects.get(id=data['status_id'])

        request = Request.objects.create(
            request_datetime=data['request_datetime'],
            visit=visit,
            advisor=advisor,
            faq=faq,
            why=why,
            status=requestStatus,
        )

        serializer = RequestSerializer(request, many=False)
        return Response(serializer.data)


class VisitApiView(APIView):
    def get(self, request, *args, **kwargs):

        locations_ids = parse_and_convert(request.GET.getlist('locs'))

        if isinstance(locations_ids, type(None)):
            with connection.cursor() as cursor:
                cursor.execute("select V.*, L.name, VS.name, CONCAT(l.name, ' ', V.visit_date) as name "
                               "from \"financiationAPI_visit\" as V "
                               "inner join \"financiationAPI_location\" L on L.id = V.location_id "
                               "inner join \"financiationAPI_visitstatus\" VS on V.visit_status_id = VS.id")
                row = cursor.fetchall()
                print(row)
                return JsonResponse(to_json(
                    ["id", "visit_date", "start_time", "finish_time", "flyer", "rent_observations", "distance",
                     "travel_time", "civil_registration", "place_name", "accommodation", "modernization_fund",
                     "address_id", "contacted_referrer_id", "group_id", "location_id", "mayor_id", "politic_party_id",
                     "visit_status_id", "location_name", "visit_status_name", "name"], row), safe=False)

        else:
            visits = Visit.objects.raw("SELECT * "
                                       "FROM \"financiationAPI_visit\" "
                                       "WHERE location_id IN %s",
                                       [locations_ids])

        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)

        address = Address.objects.get(id=data['address_id'])
        contacted_referrer = ContactedReferrer.objects.get(id=data['contacted_referrer_id'])
        group = Group.objects.get(id=data['group_id'])
        mayor = Mayor.objects.get(id=data['mayor_id'])
        location = Location.objects.get(id=data['location_id'])
        politic_party = PoliticParty.objects.get(id=data["politic_party_id"])
        visit_status = VisitStatus.objects.get(id=data['visit_status_id'])

        visit = Visit.objects.create(
            accommodation=data['accommodation'],
            address=address,
            civil_registration=data['civil_registration'],
            contacted_referrer_id=contacted_referrer,
            distance=data['distance'],
            flyer=data['flyer'],
            group=group,
            location=location,
            mayor=mayor,
            modernization_fund=data['modernization_fund'],
            rent_observations=data['rent_observations'],
            place_name=data['place_name'],
            politic_party_id=politic_party,
            travel_time=data['travel_time'],
            visit_date=data['visit_date'],
            start_time=data['start_time'],
            finish_time=data['finish_time'],
            visit_status=visit_status
        )

        for i in data['agreement_id']:
            agreement = Agreement.objects.get(id=i)
            visit.agreement_id.add(agreement)

        finance_collaborator = UserAccount.objects.get(id=data['finance_collaborator_id'])
        visit.finance_collaborator.add(finance_collaborator)

        rent_collaborator = UserAccount.objects.get(id=data['rent_collaborator_id'])
        visit.rent_collaborator.add(rent_collaborator)

        serializer = VisitSerializer(visit, many=False)
        return Response(serializer.data)


class MayorApiView(APIView):
    def get(self, request, *args, **kwargs):
        mayor = Mayor.objects.all()
        serializer = MayorSerializer(mayor, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        location_id = data.get('location')
        location = Location.objects.get(id=location_id)
        mayor = Mayor.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            location=location

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
            user_id=user.id,
            group_id=group.id
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
            user_id=user.id,
            group_id=group.id,
        )

        serializer = AdvisorSerializer(advisor, many=False)
        return Response(serializer.data)


@api_view(['GET'])
def getLocations(request):
    locations = Location.objects.all()
    serializer = LocationsSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getDivisions(request):
    divisions = Division.objects.all()
    serializer = DivisionSerializer(divisions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getDivisionsFaqs(request):
    divisions_ids = parse_and_convert(request.GET.getlist('deps'))

    if isinstance(divisions_ids, type(None)):
        faqs = Faq.objects.all()
    else:
        faqs = Faq.objects.raw(
            "SELECT F.id "
            "FROM \"financiationAPI_faq\" AS F "
            "WHERE division_id IN %s "
            "GROUP BY F.id",
            [divisions_ids])

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
def getTotalRequestsByDivisions(request):
    return execute_query("SELECT MD.name, count(*) "
                         "FROM \"financiationAPI_request\" "
                         "INNER JOIN \"financiationAPI_faq\" F on F.id = faq_id "
                         "INNER JOIN \"financiationAPI_division\" MD on MD.id = F.division_id "
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
def getWhys(request):
    whys = Why.objects.all()
    serializer = WhySerializer(whys, many=True)
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


@api_view(['DELETE'])
def deleteadvisorById(request, id, groupId, *args, **kwargs):
    advisor = Advisor.objects.filter(user=id, group=groupId)
    advisor.delete()
    return JsonResponse("OK", safe=False)


@api_view(['DELETE'])
def deletecoordinatorById(request, id, groupId, *args, **kwargs):
    coordinator = Coordinator.objects.filter(user=id, group=groupId)
    coordinator.delete()
    return JsonResponse("OK", safe=False)


@api_view(['PUT'])
def putMayorById(request, id, *args, **kwargs):
    data = request.data
    mayor = Mayor.objects.get(id=id)
    mayor.first_name = data['first_name']
    mayor.last_name = data['last_name']
    mayor.save()
    serializer = MayorSerializer(mayor, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getLatestVisitRequestCount(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT count(*) "
                       "from \"financiationAPI_request\" "
                       "where visit_id = (SELECT id "
                       "FROM \"financiationAPI_visit\" "
                       "WHERE visit_status_id = 4 "
                       "ORDER BY visit_date desc "
                       "limit 1)", request)
        row = cursor.fetchall()
        return JsonResponse(to_json(["requests"], row), safe=False)


@api_view(['GET'])
def getLatestVisits(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT CONCAT(L.name, ' ', v.visit_date) as name, VS.name as status "
                       "FROM \"financiationAPI_visit\" AS V "
                       "INNER JOIN \"financiationAPI_visitstatus\" VS on VS.id = V.visit_status_id "
                       "INNER JOIN \"financiationAPI_location\" L on L.id = V.location_id "
                       "order by visit_date desc limit 10", request)
        row = cursor.fetchall()
        return JsonResponse(to_json(["name", "status"], row), safe=False)


@api_view(['GET'])
def getUserGroup(request, id):
    with connection.cursor() as cursor:
        cursor.execute("WITH roles as (SELECT 'Asesor' as role, id, group_id, user_id "
                       "FROM \"financiationAPI_advisor\" "
                       "UNION ALL "
                       "SELECT 'Coordinador', id, group_id, user_id "
                       "FROM \"financiationAPI_coordinator\"), "
                       "persona_grupo_roles as (select r.role, r.group_id, g.name, r.user_id, u.first_name, u.last_name"
                       " from roles as r "
                       "inner join \"financiationAPI_group\" as g on (r.group_id = g.id) "
                       "inner join \"financiationAPI_useraccount\" as u on (r.user_id = u.id)) "
                       "SELECT * "
                       "FROM persona_grupo_roles as a "
                       "where a.user_id in (%s) "
                       "union "
                       "SELECT * "
                       "FROM persona_grupo_roles as b "
                       "where b.group_id in (select group_id from persona_grupo_roles r where r.user_id = (%s)) "
                       "order by 4", [id, id])
        row = cursor.fetchall()
        print(row)
        return JsonResponse(to_json(["role", "group_id", "group", "user_id", "first_name", "last_name"], row),
                            safe=False)
