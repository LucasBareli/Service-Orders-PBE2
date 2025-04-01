from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)  

urlpatterns = [
    path('signup', SignUpView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('gerentes', GestoresView.as_view(), name='gerentes'),
    path('gerentes/<int:pk>', GestoresAPIView.as_view(), name='gerente'),
    path('responsaveis', ResponsaveisView.as_view(), name='responsaveis'),
    path('responsaveis/<int:pk>', ResponsaveisAPIView.as_view(), name='responsaveis'),
    path('patrimonios', PatrimoniosView.as_view(), name='patrimonios'),
    path('patrimonios/<int:pk>', PatrimoniosAPIView.as_view(), name='patrimonios'),
    path('ambientes', AmbienteView.as_view(), name='ambientes'),
    path('ambientes/<int:pk>', AmbientesAPIView.as_view(), name='ambientes'),
    path('manutentores', ManutentoresAPIView.as_view(), name='manutentores'),
    path('manutentores/<int:pk>', ManutentoresAPIView.as_view(), name='manutentores'),
    path('ordemservico', OrdemServicoAPIView.as_view(), name='ordem serviço'),
    path('ordemservico/<int:pk>', OrdemServicoAPIView.as_view(), name='ordem serviço'),
    path('historico', HistoricoView.as_view(), name='historico'),
    path('historico/<int:pk>', HistoricoAPIView.as_view(), name='historico')
]