from django.contrib import admin
from django.urls import include, path
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from tickets.api import TicketViewSet, MyUser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from django.views.generic.base import TemplateView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Tickets API",
      default_version='v1',
      description="Django Rest Framework API Tickets",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="juandoe@tickets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()

router.register(r'tickets', TicketViewSet, 'api-ticket')
# router.register(r'users', UserViewSet, 'api-user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/my-account/', MyUser.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^.*/$', TemplateView.as_view(template_name='index.html'), name="ticket_app"),
    path('', TemplateView.as_view(template_name='index.html'), name="ticket_app"),
]
