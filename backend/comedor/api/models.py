from django.db import models
from django.utils.translation import ugettext as _
from .validators import *
from django.contrib.auth.models import User

# Create your models here.

MEASURE = [
    ("KG", "Kilogramo"),
    ("GR", "Gramo"),
    ("UN", "Unidad"),
    ("LT", "Litro")
]

USER_TYPE = [
    ("DT", "Docente"),
    ("ND", "No docente"),
    ("ES", "Estudiante")
]


INSTITUTIONS = [
    ("FAU", "Facultad de Arquitectura y Urbanismo"),
    ("FBA", "Facultad de Artes"),
    ("FAGRO", "Facultad de Ciencias Agrarias y Forestales"),
    ("FCAGLP", "Facultad de Ciencias Astronómicas y Geofísicas"),
    ("ENOCO", "Facultad de Ciencias Económicas"),
    ("EXAC", "Facultad de Ciencias Exactas"),
    ("JURSOC", "Facultad de Ciencias Jurídicas y Sociales"),
    ("MED", "Facultad de Ciencias Médicas"),
    ("FCNYM", "Facultad de Ciencias Naturales y Museo"),
    ("FCV", "Facultad de Ciencias Veterinarias"),
    ("FAHCE", "Facultad de Humanidades y Ciencias de la Educación"),
    ("INFO", "Facultad de Informática"),
    ("ING", "Facultad de Ingeniería"),
    ("ODON", "Facultad de Odontología"),
    ("PERIO", "Facultad de Periodismo y Comunicación Social"),
    ("PSICO", "Facultad de Psicología"),
    ("FTS", "Facultad de Trabajo Social")
]


class Campus(models.Model):
    name = models.CharField(_("Nombre"), max_length=30)
    address = models.CharField(_("Dirección"), max_length=60)

    class Meta:
        verbose_name = _("Sede")
        verbose_name_plural = _("Sedes")

    def __unicode__(self):
        return u"%s" % self.name

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(_("Nombre"), max_length=30)
    measure = models.CharField(_("Unidad de medida"), max_length=2, choices=MEASURE)

    class Meta:
        verbose_name = _("Ingrediente")
        verbose_name_plural = _("Ingredientes")

    def __unicode__(self):
        return u"%s" % self.name

    def __str__(self):
        return self.name


class Component(models.Model):
    name = models.CharField(_("Nombre"), max_length=30, validators=[alphabetical])
    ingredients = models.ManyToManyField(Ingredient, verbose_name="Ingredientes",
                                         through="IngredientsWithMeasure")

    class Meta:
        verbose_name = _("Componente/Plato")
        verbose_name_plural = _("Componentes/Platos")

    def __str__(self):
        return self.name


class IngredientsWithMeasure(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    amount = models.IntegerField(_("Cantidad"))

    class Meta:
        verbose_name = "Ingredientes del plato"
        verbose_name_plural = "Ingredientes en los platos"

    def __str__(self):
        return f"{self.component.name} lleva {self.amount}{self.ingredient.measure} " \
               f"de {self.ingredient.name}"


class Menu(models.Model):
    name = models.CharField(_("Nombre"), max_length=30, validators=[alphabetical])
    starter = models.ManyToManyField(Component, verbose_name="Entrada", related_name="menus_starter")
    principal = models.ManyToManyField(Component, verbose_name="Plato principal", related_name="menus_principal")
    dessert = models.ManyToManyField(Component, verbose_name="Postre", related_name="menus_dessert")
    drink = models.ManyToManyField(Component, verbose_name="Bebida", related_name="menus_drink")
    celiac = models.BooleanField(_("Menú celíaco"), default=False, null=True, blank=True)
    vegetarian = models.BooleanField(_("Menú vegetariano"), default=False, null=True, blank=True)
    image = models.ImageField(_("Foto del menú"), blank=True, null=True, upload_to='menus')
    enabled = models.BooleanField(_("Habilitado"), default=True)
    campus = models.ManyToManyField(Campus, verbose_name="Sede", related_name="menus")
    # dates = models.ManyToManyField(datetime, "Días", null=True)
    servings = models.IntegerField(_("Porciones"))
    price = models.FloatField(_("Precio"))

    class Meta:
        verbose_name = _("Menú")
        verbose_name_plural = _("Menús")

    def __str__(self):
        return self.name


class CustomUser(User):
    firstname = models.CharField(_("Nombre"), max_length=60, validators=[alphabetical])
    lastname = models.CharField(_("Apellido"), max_length=60, validators=[alphabetical])
    dni = models.CharField(_("DNI"), max_length=8, validators=[numbers])
    type = models.CharField(_("Condición"), max_length=5, choices=USER_TYPE)
    institution = models.CharField(_("Facultad"), max_length=10, choices=INSTITUTIONS)

    class Meta:
        verbose_name = _("Usuario")
        verbose_name_plural = _("Usuario")

    def __str__(self):
        return f'{self.firstname} {self.lastname}'


class Ticket(models.Model):
    menu = models.ForeignKey(Menu, verbose_name="Menú", related_name="tickets", on_delete=models.CASCADE)
    price = models.FloatField(_("Precio"))
    date = models.DateField(_("Fecha"))
    take_away = models.BooleanField(_("Vianda"), default=False)
    campus = models.ForeignKey(Campus, related_name="tickets", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, verbose_name="Pertenece a", related_name="tickets", on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("Ticket")
        verbose_name_plural = _("Tickets")

    def __str__(self):
        return f'{self.pk} - {self.date}'
