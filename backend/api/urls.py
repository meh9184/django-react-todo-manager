from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from .views import validate_jwt_token

urlpatterns = [

    path('validate/', validate_jwt_token),
    path('login/', obtain_jwt_token),
    
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
    
    path('user/', include('user.urls')),
    path('todo/', include('todo.urls'))

]
