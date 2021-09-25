from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IngredientViewSet, MenuViewSet, UserViewSet, ComponentViewSet, IngredientsWithMeasureViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('ingredients', IngredientViewSet)
router.register('components', ComponentViewSet)
router.register('ingredientswithmeasure', IngredientsWithMeasureViewSet)
router.register('menus', MenuViewSet)



urlpatterns = [
    path('api/', include(router.urls)),
]