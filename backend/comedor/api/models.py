from django.db import models
from django.utils.translation import ugettext as _
from .validators import *

# Create your models here.

MEASURE = [
    ("KG", "Kilogramo"),
    ("GR", "Gramo"),
    ("UN", "Unidad"),
    ("LT", "Litro")
]

CAMPUS = [
    ("SEDE-I", "Sede I Bosque Oeste: calle 50 entre 116 y 117"),
    ("SEDE-II", "Sede II Bosque Este: boulevard 120 entre 61 y 62 N° 1439"),
    ("SEDE-III", "Sede III ATULP: av. 44 Nº 733 entre 9 y 10, Asociación "
                 "de Trabajadores de la UNLP"),
    ("SEDE-IV", "Sede IV Club Everton: 14 entre 63 y 64, salón planta baja")
]


class Ingredient(models.Model):
    name = models.CharField(_("Nombre"), max_length=30, validators=[alphabetical])
    measure = models.CharField(_("Unidad de medida"),max_length=30, choices=MEASURE)

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
    name = models.CharField(_("Nombre"), max_length=60, validators=[alphabetical])
    starter = models.ManyToManyField(Component, verbose_name="Entrada", related_name="starter_menus")
    principal = models.ManyToManyField(Component, verbose_name="Plato principal", related_name="principal_menus")
    dessert = models.ManyToManyField(Component, verbose_name="Postre", related_name="dessert_menus")
    drink = models.ManyToManyField(Component, verbose_name="Bebida", related_name="drink_menus")
    celiac = models.BooleanField(_("Menú celíaco"), default=False, null=True, blank=True)
    vegetarian = models.BooleanField(_("Menú vegetariano"), default=False, null=True, blank=True)
    image = models.ImageField(_("Foto del menú"), blank=True, null=True, upload_to='image_menus')
    enabled = models.BooleanField(_("Habilitado"), default=True)
    # campus = models.CharField(_("Sedes"), max_length=20, choices=CAMPUS)
    # dates = models.ManyToManyField(datetime, "Días", null=True)
    servings = models.IntegerField(_("Porciones"))
    price = models.FloatField(_("Precio"))

    class Meta:
        verbose_name = _("Menu")
        verbose_name_plural = _("Menus")

    def __str__(self):
        return self.name