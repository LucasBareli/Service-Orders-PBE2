from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
    
class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        many = True
        fields = '__all__'

class GestoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gestores
        many = True
        fields = '__all__'

class ResponsaveisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsaveis
        many = True
        fields = '__all__'

class PatrimoniosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patrimonios
        many = True
        fields = '__all__'

class ManutentoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manutentores
        many = True
        fields = '__all__'

class OrdemServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdemServico
        many = True
        fields = '__all__'

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        many = True
        fields = '__all__'