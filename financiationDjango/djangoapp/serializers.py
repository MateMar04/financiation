from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from .models import Visit

class VisitSerializer(serializers.ModelSerializer) :
        
    id_locality = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    id_group = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    id_visit_status = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    id_agreement = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    id_contacter_referrer = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    id_address = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    id_logo = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Visit
        fields = ('flyer', 'distance', 'travel_time', 'visit_date', 'civil_registration',
                    'accommodation', 'modernization_fund', 'start_time', 'finish_time',
                    'place_name', 'id_locality', 'id_group', 'id_visit_status', 'id_agreement',
                    'id_contacted_referrer', 'id_address', 'id_logo')

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'ssn')
