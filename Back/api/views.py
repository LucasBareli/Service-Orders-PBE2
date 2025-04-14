from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User


class SignUpView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GestoresView(ListCreateAPIView):
    queryset = Gestores.objects.all()
    serializer_class = GestoresSerializer
    permission_classes = [IsAuthenticated]

class GestoresAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Gestores.objects.all()
    serializer_class = GestoresSerializer
    permission_classes = [IsAuthenticated]

class ResponsaveisView(ListCreateAPIView):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaveisSerializer
    permission_classes = [IsAuthenticated]

class ResponsaveisAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaveisSerializer
    permission_classes = [IsAuthenticated]

class PatrimoniosView(ListCreateAPIView):
    queryset = Patrimonios.objects.all()
    serializer_class = PatrimoniosSerializer
    permission_classes = [IsAuthenticated]

class PatrimoniosAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Patrimonios.objects.all()
    serializer_class = PatrimoniosSerializer
    permission_classes = [IsAuthenticated]
    
    Patrimonios.objects.all().delete()


class AmbienteView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]

class AmbientesAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]

class ManutentoresView(ListCreateAPIView):
    queryset = Manutentores.objects.all()
    serializer_class = ManutentoresSerializer
    permission_classes = [IsAuthenticated]

class ManutentoresAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Manutentores.objects.all()
    serializer_class = ManutentoresSerializer
    permission_classes = [IsAuthenticated]

class OrdemServicoView(ListCreateAPIView):
    queryset = OrdemServico.objects.all()
    serializer_class = OrdemServicoSerializer
    permission_classes = [IsAuthenticated]

class OrdemServicoAPIView(RetrieveUpdateDestroyAPIView):
    queryset = OrdemServico.objects.all()
    serializer_class = OrdemServicoSerializer
    permission_classes = [IsAuthenticated]

class HistoricoView(ListCreateAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]

class HistoricoAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]