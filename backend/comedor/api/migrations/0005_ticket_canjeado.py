# Generated by Django 3.2.7 on 2021-11-01 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20211007_1807'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='canjeado',
            field=models.BooleanField(default=False, verbose_name='Vianda'),
        ),
    ]
