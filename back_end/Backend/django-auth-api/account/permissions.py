from rest_framework import permissions
from django.contrib.auth.models import User

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        
        print(request.user)  # Debugging line
        # Check if the user is an admin to allow event creation
        return request.user.role == 'Admin' or request.method in permissions.SAFE_METHODS
