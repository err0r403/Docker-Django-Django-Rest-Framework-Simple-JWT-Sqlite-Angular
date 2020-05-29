from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ticket


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username',)


class TicketSerializer(serializers.ModelSerializer):
    author =  UserSerializer(many=False)
    human_state = serializers.CharField(source='get_state_display', read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'author', 'title', 'description', 'state', 'human_state', 'created_at',)
        read_only_fields = ('created_at', 'updated_at',)
