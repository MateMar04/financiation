from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Advised
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
    ]
    return Response(routes)


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
    visit = Visit.objects.create(
        body = data['body']
    )
    serializer = VisitSerializer(visit, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def postGroup():
    group = Group.objects.create(serializer.data)
    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)