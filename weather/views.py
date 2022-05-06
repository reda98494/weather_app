import json
from datetime import datetime
from django.db import connection
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.core import serializers

from .models import *


# Create your views here.


def index(request):
    weather_current_data = Weather_data_current.objects.all()
    stations_name = Weather_data.objects.values('station_name').distinct().exclude(pays=None)
    stations_date = Weather_data.objects.values('date').distinct().exclude(pays=None)
    stations_pays = Weather_data.objects.values('pays').distinct().exclude(pays=None)

    if request.method == "POST":
        station_name = request.POST.get("select_station_name")
        periode = request.POST.get("select_station_periode")
        pays = request.POST.get("select_station_pays")
        if pays and station_name and periode:
            # date = datetime.strptime(periode, "%B %d, %Y")
            # date_off = datetime.strftime(date, "%Y-%m-%d")
            try:
                weather_get_data = Weather_data.objects.get(pays=pays, station_name=station_name, date=periode)
                return redirect('filtresMeteo', pk1=pays, pk2=station_name, pk3=periode)
            except:
                return redirect('index')
    context = {
        "weather_current_data": weather_current_data,
        "stations_name": stations_name,
        "stations_date": stations_date,
        "stations_pays": stations_pays,
    }
    return render(request, 'index.html', context)


def filtresMeteo(request, pk1, pk2, pk3):
    weather_get_date = Weather_data.objects.get(pays=pk1, station_name=pk2, date=pk3)

    context = {
        "weather_get_date": weather_get_date
    }
    return render(request, 'filtres_meteo.html', context)


def getAllWeatherDetails(request):
    if request.method == "GET" and request.is_ajax:
        datas_list = []
        station = Weather_data_current.objects.all()
        for sta in station:
            datas = {"station_id": sta.station_id, "station_name": sta.station_name, "wind_measure": sta.wind_measure, "tmp_measure": sta.tmp_measure, "loc": eval(sta.loc)}
            datas_list.append(datas)
        # data_serialized = serializers.serialize("json", queryset=datas_list)
        data = json.loads(json.dumps(datas_list))
        return JsonResponse({"data": data, "status": 200})
    else:
        return HttpResponse("ERROR, METHOD NOT ALLOWED")


def getAllWeatherDetailsByStation(request, id_station):
    if request.method == "POST" and request.is_ajax:
        station = Weather_data_current.objects.filter(station_id=id_station)

        data_serialized = serializers.serialize("json", queryset=station)
        data = json.loads(data_serialized)
        return JsonResponse({"data": data, "status": 200})
    else:
        return HttpResponse("ERROR, METHOD NOT ALLOWED")


def getAllStationNamesByCountry(request, pays):
    if request.method == "POST" and request.is_ajax:
        station_pays = Weather_data.objects.filter(pays=pays)
        data_serialized = serializers.serialize("json", queryset=station_pays)
        data = json.loads(data_serialized)
        return JsonResponse({"data": data, "status": 200})
    else:
        return HttpResponse("ERROR, METHOD NOT ALLOWED")


def getAllStationDatesByCountry(request, station_name):
    if request.method == "POST" and request.is_ajax:
        station_dates = Weather_data.objects.filter(station_name=station_name)
        data_serialized = serializers.serialize("json", queryset=station_dates)
        data = json.loads(data_serialized)
        return JsonResponse({"data": data, "status": 200})
    else:
        return HttpResponse("ERROR, METHOD NOT ALLOWED")
