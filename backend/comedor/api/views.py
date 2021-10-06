from django.http.response import Http404
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets, status
from .models import COMPONENT_TYPE, Ingredient, Component, IngredientsWithMeasure, Menu
from django.shortcuts import render
from rest_framework import exceptions, viewsets, status
from rest_framework.authentication import TokenAuthentication
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissions
from django.db.models.functions import Lower
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, DjangoModelPermissions


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
            return Response({'Token eliminado con exito'}, status=status.HTTP_200_OK)

        return Response({'Token inexistente'}, status=status.HTTP_404_NOT_FOUND)


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

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
            return Response({'Log out satisfactorio.'}, status=status.HTTP_200_OK)
        return Response({'Token inexistente.'}, status=status.HTTP_404_NOT_FOUND)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if request.user.is_staff == False:
             raise exceptions.PermissionDenied()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            if instance != self.request.user.customuser and not request.user.is_staff and not request.user.is_admin:
                raise exceptions.PermissionDenied()
        except: raise exceptions.PermissionDenied()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


#############
class ComponentDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ComponentDetailSerializer
    queryset = Component.objects.all()

    def get_object(self, pk):
        try:
            return Component.objects.get(pk=pk)
        except Component.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        component = self.get_object(pk)
        serializer = ComponentDetailSerializer(component)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        component = self.get_object(pk)
        serializer = ComponentCreateSerializer(component, data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ComponentDetailSerializer(saved_obj).data
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        component = self.get_object(pk)
        component.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Components(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        components = Component.objects.all().order_by(Lower("name"))
        serializer = ComponentSerializer(components, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ComponentCreateSerializer(data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ComponentSerializer(saved_obj).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Ingredients(APIView):
    def get_object(self, pk):
        try:
            return Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            ingredient = self.get_object(pk)
            serializer = IngredientSerializer(ingredient)
        else:
            ingredients = Ingredient.objects.all().order_by(Lower("name"))
            serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        ingredient = self.get_object(pk)
        serializer = IngredientSerializer(ingredient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        ingredient = self.get_object(pk)
        ingredient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    authentication_classes = (TokenAuthentication,)


class EnabledDateViewSet(viewsets.ModelViewSet):
    queryset = EnabledDate.objects.all()
    serializer_class = EnabledDateSerializer
    authentication_classes = (TokenAuthentication,)


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all().order_by(Lower("name"))
    serializer_class = MenuSerializer
    authentication_classes = (TokenAuthentication,)


@api_view(["GET"])
def measure_list(request):
    data = []
    for value, label in MEASURE:
        data.append({'value': value,
                     'label': label
                     })

    return Response(data)


@api_view(["GET"])
def component_type_list(request):
    data = []
    for value, label in COMPONENT_TYPE:
        data.append({'value': value,
                     'label': label
                     })

    return Response(data)    
