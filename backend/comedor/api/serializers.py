from .models import Ingredient, IngredientsWithMeasure, Component, Menu, MEASURE
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import password_validation, authenticate
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=4, max_length=64)
    password = serializers.CharField(min_length=4, max_length=64)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')
        self.context['user'] = user
        return data

    def create(self, data):
        # Generar o recuperar token
        token, created = Token.objects.get_or_create(user=self.context['user'])

        return self.context['user'], token.key


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('pk', 'name', 'measure')


class IngredientsWithMeasureSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()

    class Meta:
        model = IngredientsWithMeasure
        fields = ('pk', 'amount', 'ingredient')


class ComponentSerializer(serializers.ModelSerializer):
    ingredients = IngredientsWithMeasureSerializer(many=True)

    class Meta:
        model = Component
        fields = ('pk', 'name', 'ingredients')
        depth = 1

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        component = Component.objects.create(**validated_data)
        for data in ingredients_data:
            Ingredient.objects.create(**data, component=component)
        return component


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'
        depth = 2

