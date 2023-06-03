from rest_framework.serializers import ModelSerializer
from .models import Advised


class AdvisedSerializer(ModelSerializer):
    class Meta:
        model = Advised
        fields = '__all__'
