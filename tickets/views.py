from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.urls import reverse

from .models import Ticket

class IndexView(generic.ListView):
    template_name = 'tickets/index.html'
    context_object_name = 'latest_ticket_list'

    def get_queryset(self):
        """Return the last five tickets."""
        return Ticket.objects.order_by('-created_at')[:5]