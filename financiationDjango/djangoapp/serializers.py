from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from .models import Visit

class VisitSerializer(serializers.ModelSerializer) :

    class Meta:
        model = Visit
        fields = ('flyer', 'distance', 'travel_time', 'visit_date', 'civil_registration',
                    'accommodation', 'modernization_fund', 'start_time', 'finish_time',
                    'place_name', 'id_locality', 'id_group', 'id_visit_status', 'id_agreement',
                     'id_address', 'id_logo', 'id_contacted_referrer')

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'ssn')
