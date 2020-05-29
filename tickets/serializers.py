from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ticket


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username',)


class TicketSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False, read_only=True)
    state = serializers.CharField(source='get_state_display')

    class Meta:
        model = Ticket
        fields = ('id', 'author', 'title', 'description', 'state', 'created_at', 'updated_at',)
