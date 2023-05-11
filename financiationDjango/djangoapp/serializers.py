from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from .models import VisitStatus

class ProjectSerializer(serializers.ModelSerializer) :
    class Meta:
        model = VisitStatus
        fields = ('id', 'title', 'description', 'technology', 'created_at')
        read_only_fields = ('created_at', )


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'ssn')
