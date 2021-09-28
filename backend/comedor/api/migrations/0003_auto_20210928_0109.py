# Generated by Django 3.2.7 on 2021-09-28 01:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210927_0141'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='component',
            name='ingredients',
        ),
        migrations.AlterField(
            model_name='ingredientswithmeasure',
            name='component',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='api.component'),
        ),
    ]
