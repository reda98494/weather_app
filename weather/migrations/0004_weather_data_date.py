# Generated by Django 3.2.6 on 2022-05-05 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather', '0003_auto_20220504_1718'),
    ]

    operations = [
        migrations.AddField(
            model_name='weather_data',
            name='date',
            field=models.DateField(null=True),
        ),
    ]
