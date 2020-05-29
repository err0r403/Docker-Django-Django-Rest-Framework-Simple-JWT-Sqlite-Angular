from django.contrib import admin

from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'state')
    list_filter = ('author', "state",)
    search_fields=["title",]
