from django.db import models

from weatherProject import settings


class Weather_data_current(models.Model):
    loc = models.CharField(max_length=300, null=True)
    station_name = models.CharField(max_length=300, null=True)
    station_id = models.CharField(max_length=300, null=True)
    wind_measure = models.CharField(max_length=300, null=True)
    wind_measure_min = models.CharField(max_length=300, null=True)
    wind_measure_max = models.CharField(max_length=300, null=True)
    tmp_measure = models.CharField(max_length=300, null=True)
    tmp_measure_min = models.CharField(max_length=300, null=True)
    tmp_measure_max = models.CharField(max_length=300, null=True)
    pays = models.CharField(max_length=300, null=True)

    class Meta:
        def __str__(self):
            return self.station_id


class Weather_data(models.Model):
    loc = models.CharField(max_length=300, null=True)
    station_name = models.CharField(max_length=300, null=True)
    station_id = models.CharField(max_length=300, null=True)
    date = models.DateField(null=True)
    wind_measure_min = models.CharField(max_length=300, null=True)
    wind_measure_max = models.CharField(max_length=300, null=True)
    wind_measure_moy = models.CharField(max_length=300, null=True)
    tmp_measure_min = models.CharField(max_length=300, null=True)
    tmp_measure_max = models.CharField(max_length=300, null=True)
    tmp_measure_moy = models.CharField(max_length=300, null=True)
    pays = models.CharField(max_length=300, null=True)

    class Meta:
        def __str__(self):
            return self.date
