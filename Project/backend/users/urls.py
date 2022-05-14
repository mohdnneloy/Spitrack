# User endpoints

from django.urls import path
from . import views

urlpatterns = [

# ================= User APIs ==================

    path('userdashboard', views.userDashboard),
    path('adminlogin', views.adminLogin),
    path('admindashboard', views.adminDashboard)


]