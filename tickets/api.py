from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions

from .models import Ticket
from .serializers import TicketSerializer

class TicketViewSet(viewsets.ModelViewSet):
    model = Ticket
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author',]

    def get_queryset(self):
        if self.request.query_params.get("my-tickets"):
            return Ticket.objects.filter(author=self.request.user).order_by('created_at')
        if self.request.query_params.get("author"):
            return Ticket.objects.filter(author=self.request.query_params.get("author")).order_by('created_at')
        return Ticket.objects.all().order_by('created_at')