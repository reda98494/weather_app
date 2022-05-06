
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('filtresMeteo/<str:pk1>/<str:pk2>/<str:pk3>/', views.filtresMeteo, name="filtresMeteo"),
    path('getAllWeatherDetails/', views.getAllWeatherDetails, name="getAllWeatherDetails"),
    path('getAllWeatherDetailsByStation/<str:id_station>/', views.getAllWeatherDetailsByStation, name="getAllWeatherDetailsByStation"),
    path('getAllStationNamesByCountry/<str:pays>/', views.getAllStationNamesByCountry, name="getAllStationNamesByCountry"),
    path('getAllStationDatesByCountry/<str:station_name>/', views.getAllStationDatesByCountry, name="getAllStationDatesByCountry"),

]
