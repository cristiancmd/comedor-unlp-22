
from .models import Ingredient, Component, IngredientsWithMeasure, Menu
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissions


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [DjangoModelPermissions]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserSerializer(user).data,
            'access_token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        user = request.user
        if user:
            user.auth_token.delete()
            return Response({'Token eliminado con exito'},status=status.HTTP_200_OK)
        
        return Response({'Token inexistente'},status=status.HTTP_404_NOT_FOUND)


@permission_classes([AllowAny])
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def post(self, request):
        serializer = IngredientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ingredient = serializer.save()
        data = {
            'ingredient': IngredientSerializer(ingredient).data,
        }
        return Response(data, status=status.HTTP_201_CREATED)


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def post(self, request):
        serializer = ComponentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ingredient = serializer.save()
        data = {
            'ingredient': ComponentSerializer(ingredient).data,
        }
        return Response(data, status=status.HTTP_201_CREATED)


class IngredientsWithMeasureViewSet(viewsets.ModelViewSet):
    queryset = IngredientsWithMeasure.objects.all()
    serializer_class = IngredientsWithMeasureSerializer
    authentication_classes = (TokenAuthentication,)  


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def post(self, request):
        serializer = MenuSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ingredient = serializer.save()
        data = {
            'ingredient': MenuSerializer(ingredient).data,
        }
        return Response(data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def measure_list(request):
    data = []
    for value, label in MEASURE:
        data.append({'value': value,
                     'label': label
                     })

    return Response(data)
