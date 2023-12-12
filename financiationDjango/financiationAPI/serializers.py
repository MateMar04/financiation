from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import *


class RequestSerializer(ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'


class VisitSerializer(ModelSerializer):
    name = SerializerMethodField()

    class Meta:
        model = Visit
        fields = '__all__'

    @staticmethod
    def get_name(obj):
        return f"{obj.location.name} {obj.visit_date}"


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class LocationsSerializer(ModelSerializer):
    class Meta:
        model = Location
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


class DivisionSerializer(ModelSerializer):
    class Meta:
        model = Division
        fields = '__all__'


class FaqSerializer(ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'ssn', 'phone_number', 'profile_picture')


class UserAccountSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class VehiclesSerializer(ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'


class RequestStatusSerializer(ModelSerializer):
    class Meta:
        model = RequestStatus
        fields = '__all__'


class ContactedReferrerEmailSerializer(ModelSerializer):
    class Meta:
        model = ContactedReferrerEmail
        fields = '__all__'


class ContactedReferrerPhoneSerializer(ModelSerializer):
    class Meta:
        model = ContactedReferrerPhone
        fields = '__all__'


class MayorEmailSerializer(ModelSerializer):
    class Meta:
        model = MayorEmail
        fields = '__all__'


class MayorPhoneSerializer(ModelSerializer):
    class Meta:
        model = MayorPhone
        fields = '__all__'


class CoordinatorSerializer(ModelSerializer):
    class Meta:
        model = Coordinator
        fields = '__all__'


class AdvisorSerializer(ModelSerializer):
    class Meta:
        model = Advisor
        fields = '__all__'


class CityDepartmentSerializer(ModelSerializer):
    class Meta:
        model = CityDepartment
        fields = '__all__'


class UserStatusSerializer(ModelSerializer):
    class Meta:
        model = UserStatus
        fields = '__all__'


class MayorSerializer(ModelSerializer):
    class Meta:
        model = Mayor
        fields = '__all__'


class VehicleBrandSerializer(ModelSerializer):
    class Meta:
        model = VehicleBrand
        fields = '__all__'


class VehicleModelSerializer(ModelSerializer):
    class Meta:
        model = VehicleModel
        fields = '__all__'


class PoliticPartySerializer(ModelSerializer):
    class Meta:
        model = PoliticParty
        fields = '__all__'


class VehiclePlateSerializer(ModelSerializer):
    class Meta:
        model = VehiclePlate
        fields = '__all__'


class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class RequestStatusSerializer(ModelSerializer):
    class Meta:
        model = RequestStatus
        fields = '__all__'


class ProfilePictureSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class WhySerializer(ModelSerializer):
    class Meta:
        model = Why
        fields = '__all__'