from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from .models import *


class AdvisedSerializer(ModelSerializer):
    class Meta:
        model = Advised
        fields = '__all__'


class VisitSerializer(ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'


class RequestSerializer(ModelSerializer):
    class Meta:
        model=Request
        fields = '__all__'


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'ssn', 'phone_number')
