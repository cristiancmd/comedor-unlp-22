from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('menus', MenuViewSet)
router.register('usuarios', CustomUserViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/measure/', measure_list),
    path('api/components/', Components.as_view()),
    path('api/ingredients/', Ingredients.as_view()),
    path('api/ingredients/<int:pk>', Ingredients.as_view()),
    path('api/components/<int:pk>/', ComponentDetailView.as_view())
]
