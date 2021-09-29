# Generated by Django 3.2.7 on 2021-09-27 01:22

import django.contrib.auth.models
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Campus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Nombre')),
                ('address', models.CharField(max_length=60, verbose_name='Dirección')),
            ],
            options={
                'verbose_name': 'Sede',
                'verbose_name_plural': 'Sedes',
            },
        ),
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Nombre')),
            ],
            options={
                'verbose_name': 'Componente/Plato',
                'verbose_name_plural': 'Componentes/Platos',
            },
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
                ('firstname', models.CharField(max_length=60, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Nombre')),
                ('lastname', models.CharField(max_length=60, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Apellido')),
                ('dni', models.CharField(max_length=8, validators=[django.core.validators.RegexValidator('^[0-9]+$', 'Este campo solo acepta caracteres númericos.')], verbose_name='DNI')),
                ('type', models.CharField(choices=[('DT', 'Docente'), ('ND', 'No docente'), ('ES', 'Estudiante')], max_length=5, verbose_name='Condición')),
                ('institution', models.CharField(choices=[('FAU', 'Facultad de Arquitectura y Urbanismo'), ('FBA', 'Facultad de Artes'), ('FAGRO', 'Facultad de Ciencias Agrarias y Forestales'), ('FCAGLP', 'Facultad de Ciencias Astronómicas y Geofísicas'), ('ENOCO', 'Facultad de Ciencias Económicas'), ('EXAC', 'Facultad de Ciencias Exactas'), ('JURSOC', 'Facultad de Ciencias Jurídicas y Sociales'), ('MED', 'Facultad de Ciencias Médicas'), ('FCNYM', 'Facultad de Ciencias Naturales y Museo'), ('FCV', 'Facultad de Ciencias Veterinarias'), ('FAHCE', 'Facultad de Humanidades y Ciencias de la Educación'), ('INFO', 'Facultad de Informática'), ('ING', 'Facultad de Ingeniería'), ('ODON', 'Facultad de Odontología'), ('PERIO', 'Facultad de Periodismo y Comunicación Social'), ('PSICO', 'Facultad de Psicología'), ('FTS', 'Facultad de Trabajo Social')], max_length=10, verbose_name='Facultad')),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuario',
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='EnabledDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha')),
            ],
            options={
                'verbose_name': 'Fecha habilitada',
                'verbose_name_plural': 'Fechas habilitadas',
            },
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Nombre')),
                ('measure', models.CharField(choices=[('KG', 'Kilogramo'), ('GR', 'Gramo'), ('UN', 'Unidad'), ('LT', 'Litro')], max_length=2, verbose_name='Unidad de medida')),
            ],
            options={
                'verbose_name': 'Ingrediente',
                'verbose_name_plural': 'Ingredientes',
            },
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, validators=[django.core.validators.RegexValidator("^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\'\\s\\-]+$", 'Este campo solo acepta caracteres alfabéticos.')], verbose_name='Nombre')),
                ('celiac', models.BooleanField(blank=True, default=False, null=True, verbose_name='Menú celíaco')),
                ('vegetarian', models.BooleanField(blank=True, default=False, null=True, verbose_name='Menú vegetariano')),
                ('image', models.ImageField(blank=True, null=True, upload_to='image_menus', verbose_name='Foto del menú')),
                ('enabled', models.BooleanField(default=True, verbose_name='Habilitado')),
                ('servings', models.IntegerField(verbose_name='Porciones')),
                ('price', models.FloatField(verbose_name='Precio')),
                ('campus', models.ManyToManyField(related_name='menus', to='api.Campus', verbose_name='Sede')),
                ('dessert', models.ManyToManyField(related_name='menus_dessert', to='api.Component', verbose_name='Postre')),
                ('drink', models.ManyToManyField(related_name='menus_drink', to='api.Component', verbose_name='Bebida')),
                ('enabled_dates', models.ManyToManyField(related_name='menus', to='api.EnabledDate', verbose_name='Fechas habilitadas')),
                ('principal', models.ManyToManyField(related_name='menus_principal', to='api.Component', verbose_name='Plato principal')),
                ('starter', models.ManyToManyField(related_name='menus_starter', to='api.Component', verbose_name='Entrada')),
            ],
            options={
                'verbose_name': 'Menu',
                'verbose_name_plural': 'Menus',
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(verbose_name='Precio')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('take_away', models.BooleanField(default=False, verbose_name='Vianda')),
                ('campus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='api.campus')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='api.menu', verbose_name='Menú')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='api.customuser', verbose_name='Pertenece a')),
            ],
            options={
                'verbose_name': 'Ticket',
                'verbose_name_plural': 'Tickets',
            },
        ),
        migrations.CreateModel(
            name='IngredientsWithMeasure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(verbose_name='Cantidad')),
                ('component', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.component')),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='component_ingredients', to='api.ingredient')),
            ],
            options={
                'verbose_name': 'Ingredientes del plato',
                'verbose_name_plural': 'Ingredientes en los platos',
            },
        ),
        migrations.AddField(
            model_name='component',
            name='ingredients',
            field=models.ManyToManyField(through='api.IngredientsWithMeasure', to='api.Ingredient', verbose_name='Ingredientes'),
        ),
    ]