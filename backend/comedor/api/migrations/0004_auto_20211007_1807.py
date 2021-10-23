# Generated by Django 3.2.7 on 2021-10-07 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211007_0149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='component',
            name='type',
            field=models.IntegerField(choices=[(0, 'Otro'), (1, 'Entrada'), (2, 'Principal'), (3, 'Bebida'), (4, 'Postre')], default=0),
        ),
        migrations.AlterUniqueTogether(
            name='menuwithdate',
            unique_together={('date', 'menu', 'campus')},
        ),
    ]