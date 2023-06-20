from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer

from .models import *


class RequestSerializer(ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'


class AdvisedSerializer(ModelSerializer):
    class Meta:
        model = Advised
        fields = '__all__'


class VisitSerializer(ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class LocalitySerializer(ModelSerializer):
    class Meta:
        model = Locality
        fields = '__all__'


class VisitStatusSerializer(ModelSerializer):
    class Meta:
        model = VisitStatus
        fields = '__all__'


class AgreementSerializer(ModelSerializer):
    class Meta:
        model = Agreement
        fields = '__all__'


class ContactedReferrerSerializer(ModelSerializer):
    class Meta:
        model = ContactedReferrer
        fields = '__all__'


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class LogoSerializer(ModelSerializer):
    class Meta:
        model = Logo
        fields = '__all__'


class MinistryDepartmentSerializer(ModelSerializer):
    class Meta:
        model = MinistryDepartment
        fields = '__all__'


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'ssn', 'phone_number', 'profile_picture')
