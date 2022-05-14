#=============== Django Imports ===============

# from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect

#======== Rest Framework Imports ==========

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#=============== Models ================

from django.contrib.auth.models import User

#================== Serializers ===============

from .serializers import GetUserSerializer

#=============== API Views ==================


@api_view(['GET'])
def userDashboard(request):

    userid = request.user.id
    user = User.objects.filter(id=userid)
    print("User: " + str(userid))

    if user.exists():
        serializer = GetUserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def adminLogin(request):

    # Finding User Data From Database
    userid = request.user.id
    user = User.objects.filter(id=userid)
    print(userid);

    # Checking if the user is an admin or not
    is_superuser = user[0].is_superuser
    is_staff = user[0].is_staff

    if is_superuser == 1 & is_staff == 1:
        return Response(status=status.HTTP_201_CREATED)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def adminDashboard(request):

    userid = request.user.id
    user = User.objects.filter(id=userid)
    print("User: " + str(userid))

    if user.exists():
        serializer = GetUserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)