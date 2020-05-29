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

class DetailView(generic.DetailView):
    model = Ticket
    template_name = 'tickets/detail.html'

class CreateView(generic.CreateView):
    model = Ticket
    fields = ['author', 'title', 'description', 'state']
    template_name = 'tickets/create.html'   

class UpdateView(generic.UpdateView):
    model = Ticket
    fields = ['author', 'title', 'description', 'state']
    template_name = 'tickets/update.html'     