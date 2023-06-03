from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Advised
from .serializers import AdvisedSerializer


# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/api/advised/',
            'method': 'GET',
            'headers': {},
            'body': None,
            'description': 'Returns an array of advised'
        },
        {
            'Endpoint': '/api/advised/id/',
            'method': 'GET',
            'headers': {},
            'body': None,
            'description': 'Returns an advised'
        },
        {
            'Endpoint': '/auth/jwt/verify',
            'method': 'POST',
            'headers': {},
            'body': '',
            'description': 'Authenticates the user account'
        },
        {
            'Endpoint': '/auth/users/me/',
            'method': 'GET',
            'headers': {},
            'body': '',
            'description': 'Returns the user account'
        },
        {
            'Endpoint': '/auth/users/id/',
            'method': 'GET',
            'headers': {},
            'body': '',
            'description': 'Returns an user account'
        },
        {
            'Endpoint': '/auth/users/',
            'method': 'POST',
            'headers': {},
            'body': '',
            'description': 'Creates an Account'
        },
        {
            'Endpoint': '/auth/users/activation/uid/token/',
            'method': 'POST',
            'headers': {},
            'body': '',
            'description': 'Activates an Account'
        },
        {
            'Endpoint': '/auth/jwt/create/',
            'method': 'POST',
            'headers': {},
            'body': '',
            'description': 'Returns a new JWT'
        },
        {
            'Endpoint': '/auth/users/reset_password/',
            'method': 'POST',
            'headers': {},
            'body': '',
            'description': 'Sends an email to reset password'
        },
        {
            'Endpoint': 'auth/users/reset_password_confirm/',
            'method': 'POST',
            'headers': {},
            'body': '',
            'description': 'Resets account password'
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
