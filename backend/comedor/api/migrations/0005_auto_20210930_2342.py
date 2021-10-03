# Generated by Django 3.2.7 on 2021-09-30 23:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210929_1614'),
    ]

    operations = [
        migrations.AlterField(
            model_name='component',
            name='name',
            field=models.CharField(max_length=30, validators=[django.core.validators.RegexValidator("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos y numericos.')], verbose_name='Nombre'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='firstname',
            field=models.CharField(max_length=60, validators=[django.core.validators.RegexValidator("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos y numericos.')], verbose_name='Nombre'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='lastname',
            field=models.CharField(max_length=60, validators=[django.core.validators.RegexValidator("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos y numericos.')], verbose_name='Apellido'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='name',
            field=models.CharField(max_length=64, validators=[django.core.validators.RegexValidator("^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos y numericos.')], verbose_name='Nombre'),
        ),
    ]