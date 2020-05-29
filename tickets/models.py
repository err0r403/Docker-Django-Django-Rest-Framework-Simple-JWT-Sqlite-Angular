from django.db import models
from django.contrib.auth.models import User

class Ticket(models.Model):

    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='users',
        )
        
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=1020)

    OPEN = 'OP'
    PENDING = 'PE'
    INPROCESS = 'IP'
    RESOLVED = 'RE'
    CLOSED = 'CL'

    STATE_CHOICES = [
        (OPEN, 'Abierto'),
        (PENDING, 'Pendiente'),
        (INPROCESS, 'En proceso'),
        (RESOLVED, 'Resuelto'),
        (CLOSED, 'Cerrado'),
    ]

    state = models.CharField(
        max_length=2,
        choices=STATE_CHOICES,
        default=OPEN,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s' % self.title