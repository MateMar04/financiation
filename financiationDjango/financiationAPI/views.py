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
            'body': None,
            'description': 'Returns an array of advised'
        },
        {
            'Endpoint': '/api/token/',
            'method': 'GET',
            'body': None,
            'description': 'Returns the access token'
        },
        {
            'Endpoint': '/api/token/refresh/',
            'method': 'GET',
            'body': None,
            'description': 'Returns a new refresh token'
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
