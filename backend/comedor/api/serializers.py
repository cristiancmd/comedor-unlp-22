from rest_framework.utils import model_meta
from .models import CustomUser, Ingredient, IngredientsWithMeasure, Component, Menu, MEASURE
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import password_validation, authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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
        user = authenticate(
            username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError(
                'Las credenciales no son válidas')
        self.context['user'] = user
        return data

    def create(self, data):
        # Generar o recuperar token
        token, created = Token.objects.get_or_create(user=self.context['user'])

        return self.context['user'], token.key


class CustomUserSerializer(serializers.ModelSerializer):
    user = UserSerializer
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = UserSerializer.Meta.fields



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'measure')


class IngredientsWithMeasureSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    ingredient_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source='ingredient', queryset=Ingredient.objects.all())

    class Meta:
        model = IngredientsWithMeasure
        fields = ('amount', 'ingredient', 'ingredient_id')


##
class IngredientComponentSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer

    class Meta:
        model = IngredientsWithMeasure
        fields = ('amount', 'ingredient')
        depth = 1



    # SOLO lectura
class ComponentSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Component
        fields = ('id', 'name', 'ingredients')

    def get_ingredients(self, component_instance):
        query_datas = IngredientsWithMeasure.objects.filter(
            component=component_instance)
        return [IngredientComponentSerializer(ingredient).data for ingredient in query_datas]


# Solo create/update
class ComponentCreateSerializer(serializers.ModelSerializer):
    ingredients = IngredientsWithMeasureSerializer(many=True)

    class Meta:
        model = Component
        fields = ('id', 'name', 'ingredients')

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        c = Component.objects.create(**validated_data)
        for data in ingredients_data:
            IngredientsWithMeasure.objects.create(
                component=c,
                ingredient=data.get('ingredient'),
                amount=data.get('amount')
            )
        return c

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        IngredientsWithMeasure.objects.filter(component=instance).delete()

        for data in ingredients_data:
            IngredientsWithMeasure.objects.create(
                component=instance,
                ingredient=data.get('ingredient'),
                amount=data.get('amount')
            )
        return instance


class ComponentDetailSerializer(serializers.ModelSerializer):

    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Component
        fields = ('id', 'name', 'ingredients')
        depth = 1

    def get_ingredients(self, component_instance):
        query_datas = IngredientsWithMeasure.objects.filter(
            component=component_instance)
        return [IngredientComponentSerializer(ingredient).data for ingredient in query_datas]


class MenuSerializer(serializers.ModelSerializer):

    starter = ComponentSerializer(many=True, read_only=True)
    principal = ComponentSerializer(many=True, read_only=True)
    dessert = ComponentSerializer(many=True, read_only=True)
    drink = ComponentSerializer(many=True, read_only=True)

    starter_id = serializers.PrimaryKeyRelatedField(many=True,
                                                    read_only=False, queryset=Component.objects.all(), source='starter')
    principal_id = serializers.PrimaryKeyRelatedField(many=True,
                                                      read_only=False, queryset=Component.objects.all(), source='principal')
    dessert_id = serializers.PrimaryKeyRelatedField(many=True,
                                                    read_only=False, queryset=Component.objects.all(), source='dessert')
    drink_id = serializers.PrimaryKeyRelatedField(many=True,
                                                  read_only=False, queryset=Component.objects.all(), source='drink')

    class Meta:
        model = Menu
        fields = ('id', 'name', 'price', 'starter','celiac','vegetarian', 'principal', 'dessert', 'drink', 'enabled',
                  'campus', 'enabled_dates', 'servings', 'starter_id', 'principal_id', 'dessert_id', 'drink_id','image')
