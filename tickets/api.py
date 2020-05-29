from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .models import Ticket
from .serializers import TicketSerializer

class TicketViewSet(viewsets.ModelViewSet):
    model = Ticket
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author',]

    def create(self, request, *args, **kwargs):
        request.data["author_id"] = request.user.id 
        ticket = Ticket.objects.create(**request.data)
        serializer = self.get_serializer(ticket, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def get_queryset(self):
        if self.request.query_params.get("my-tickets"):
            return Ticket.objects.filter(author=self.request.user).order_by('created_at')
        return Ticket.objects.all().order_by('created_at')