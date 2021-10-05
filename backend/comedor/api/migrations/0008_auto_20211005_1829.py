# Generated by Django 3.2.7 on 2021-10-05 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20211005_1828'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='campus',
            field=models.ManyToManyField(blank=True, related_name='campus_menus', to='api.Campus', verbose_name='Sede'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='enabled_dates',
            field=models.ManyToManyField(blank=True, related_name='dates_menus', to='api.EnabledDate', verbose_name='Fechas habilitadas'),
        ),
    ]
