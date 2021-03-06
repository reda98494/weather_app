# Generated by Django 3.2.6 on 2022-05-04 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Weather_data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_name', models.CharField(max_length=300)),
                ('station_id', models.CharField(max_length=300)),
                ('wind_measure_min', models.CharField(max_length=300)),
                ('wind_measure_max', models.CharField(max_length=300)),
                ('wind_measure_moy', models.CharField(max_length=300)),
                ('tmp_measure_min', models.CharField(max_length=300)),
                ('tmp_measure_max', models.CharField(max_length=300)),
                ('tmp_measure_moy', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Weather_data_current',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_name', models.CharField(max_length=300)),
                ('station_id', models.CharField(max_length=300)),
                ('wind_measure', models.CharField(max_length=300)),
                ('tmp_measure', models.CharField(max_length=300)),
            ],
        ),
    ]
