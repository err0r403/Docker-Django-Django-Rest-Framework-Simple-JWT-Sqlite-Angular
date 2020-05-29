from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from tickets.api import TicketViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from django.views.generic.base import TemplateView

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, 'api-ticket')


urlpatterns = [
    path('tickets/', include('tickets.urls')),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/', include(router.urls)),
    path('', TemplateView.as_view(template_name='index.html'), name="home"),
]
