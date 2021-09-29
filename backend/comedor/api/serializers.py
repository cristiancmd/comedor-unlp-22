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
        fields = ('__all__')



class IngredientsWithMeasureSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    ingredient_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source='ingredient', queryset=Ingredient.objects.all())

    class Meta:
        model = IngredientsWithMeasure
        fields = ('amount', 'ingredient','ingredient_id')        




class IngredientComponentSerializer(serializers.ModelSerializer):

    class Meta:
        model = IngredientsWithMeasure
        fields = ('ingredient_id', 'amount')        
        depth = 1



class ComponentSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Component
        fields = ('id', 'name', 'ingredients')
        
    def get_ingredients(self, component_instance):
        query_datas = IngredientsWithMeasure.objects.filter(component=component_instance)
        return [IngredientComponentSerializer(ingredient).data for ingredient in query_datas] 
 



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
                component = c,
                ingredient = data.get('ingredient'),
                amount = data.get('amount')
            )
        return c



class MenuSerializer(serializers.ModelSerializer):
    # starter = ComponentSerializer(many=True)
    # principal = ComponentSerializer(many=True)
    # dessert = ComponentSerializer(many=True)
    # drink = ComponentSerializer(many=True)

    class Meta:
        model = Menu
        fields = ('price','starter','principal','dessert','drink', 'enabled', 
        'campus','enabled_dates','servings')
        depth = 1

