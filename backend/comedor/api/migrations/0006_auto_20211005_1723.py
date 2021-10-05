# Generated by Django 3.2.7 on 2021-10-05 17:23

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210930_2342'),
    ]

    operations = [
        migrations.AddField(
            model_name='component',
            name='type',
            field=models.IntegerField(choices=[(0, 'OTRO'), (1, 'ENTRADA'), (2, 'PRINCIPAL'), (3, 'BEBIDA'), (4, 'POSTRE')], default=0),
        ),
        migrations.AlterField(
            model_name='component',
            name='name',
            field=models.CharField(max_length=30, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Nombre'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='firstname',
            field=models.CharField(max_length=60, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Nombre'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='lastname',
            field=models.CharField(max_length=60, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Apellido'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='name',
            field=models.CharField(max_length=64, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Nombre'),
        ),
    ]