from django.contrib import admin
from .models import *


# Register your models here.
class IngredientsWithMeasureAdmin(admin.StackedInline):
    model = IngredientsWithMeasure
    extra = 0


class ComponentAdmin(admin.ModelAdmin):
    model = Component
    inlines = [IngredientsWithMeasureAdmin]


admin.site.register(Campus)
admin.site.register(Ingredient)
admin.site.register(Ticket)
admin.site.register(EnabledDate)
admin.site.register(MenuWithDate)
admin.site.register(Menu)
admin.site.register(CustomUser)
admin.site.register(Component, ComponentAdmin)

