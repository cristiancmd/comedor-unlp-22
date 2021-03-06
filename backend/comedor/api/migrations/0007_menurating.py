# Generated by Django 3.2.7 on 2021-12-01 20:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_ticket_canjeado'),
    ]

    operations = [
        migrations.CreateModel(
            name='MenuRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.FloatField(verbose_name='Calificacion')),
                ('comment', models.CharField(blank=True, max_length=240, null=True, verbose_name='Comentario')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu_rating', to='api.menu', verbose_name='Menú')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_rating', to='api.customuser', verbose_name='Pertenece a')),
            ],
            options={
                'verbose_name': 'Rating',
                'verbose_name_plural': 'Ratings',
            },
        ),
    ]
