from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *



# Create your views here.

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
            'Endpoint': 'api/request/add/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'JWT accessToken',
                'Accept': 'application/json'
            },
            'body': {
                'id_visit':'',
                'id_advised':'',
                'id_advisor':'',
                'id_ministry_department':'',
                'id_faq':'',
                'id_status':''
            },
            'description': 'Sends a request'
        },
    ]
    return Response(routes)

@api_view(['POST'])
def postRequest(request):
    data = request.data

    visit = Visit.objects.get(id=data['id_visit'])
    advised = Advised.objects.get(id=data['id_advised'])
    advisor = Advisor.objects.get(id=data['id_advisor'])
    ministryDepartment = MinistryDepartment.objects.get(id=data['id_ministry_department'])
    faq = Faq.objects.get(id=data['id_faq'])
    requestStatus = RequestStatus.objects.get(id=data['id_status'])

    visit = Visit.objects.create(
        id_visit=visit,
        id_advised=advised,
        id_advisor=advisor,
        id_ministry_department=ministryDepartment,
        id_faq=faq,
        id_status=requestStatus,
    )

    serializer = RequestSerializer(visit, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getAdvised(request):
    advised = Advised.objects.all()
    serializer = AdvisedSerializer(advised, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getOneAdvised(request, pk):
    advised = Advised.objects.get(id=pk)
    serializer = AdvisedSerializer(advised, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def postVisit(request):
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


@api_view(['POST'])
def postGroup(request):
    data = request.data
    group = Group.objects.create(
        name=data['name']
    )
    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getLocalities(request):
    localities = Locality.objects.all()
    serializer = LocalitySerializer(localities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGroups(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
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
def getVisits(request):
    visits = Visit.objects.all()
    serializer = VisitSerializer(visits, many=True)
    return Response(serializer.data)