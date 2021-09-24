from django.contrib import admin
from .models import Ingredient, IngredientsWithMeasure,Component,Menu


# testeando un poquito el modelo en el admin

admin.site.register(Ingredient)
admin.site.register(IngredientsWithMeasure)
admin.site.register(Component)
admin.site.register(Menu)

