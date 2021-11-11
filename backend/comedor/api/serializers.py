
from django.db.models import fields
from django.db.models.fields import DateField
from django.db.models.fields.files import ImageField
from rest_framework.fields import IntegerField
from rest_framework.utils import model_meta
from .models import Campus, CustomUser, EnabledDate, Ingredient, IngredientsWithMeasure, Component, Menu, MEASURE, MenuWithDate, Ticket
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import password_validation, authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password



class OneItemTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class ItemTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        depth = 1
        
class TicketSerializer(serializers.ListSerializer):
    child = OneItemTicketSerializer()
 
    def create(self, validated_data):
        datas = validated_data
        for data in datas:
            dia = data['date']
            usuario = data['user']
            try:
                if(Ticket.objects.filter(date=dia).filter(user=usuario).exists()):
                    raise serializers.ValidationError()
                else:  
                    Ticket.objects.get_or_create(**data)
            except: raise serializers.ValidationError("Error: Ya existe un ticket en la fecha  para el mismo usuario")
        return datas      



class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = '__all__'
        

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
        fields = ('id', 'name', 'type', 'ingredients')

    def get_ingredients(self, component_instance):
        query_datas = IngredientsWithMeasure.objects.filter(
            component=component_instance)
        return [IngredientComponentSerializer(ingredient).data for ingredient in query_datas]


# Solo create/update
class ComponentCreateSerializer(serializers.ModelSerializer):
    ingredients = IngredientsWithMeasureSerializer(many=True)
    type = IntegerField(required=True)

    class Meta:
        model = Component
        fields = ('id', 'name','type' ,'ingredients')

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
        instance.type = validated_data.get('type', instance.type)

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
        fields = ('id', 'name','type', 'ingredients')
        depth = 1

    def get_ingredients(self, component_instance):
        query_datas = IngredientsWithMeasure.objects.filter(
            component=component_instance)
        return [IngredientComponentSerializer(ingredient).data for ingredient in query_datas]


class EnabledDateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EnabledDate
        fields = ('__all__')

      
        
class MenuWithDateSerializer(serializers.Serializer):
    date = serializers.ListField(write_only=True, child=serializers.DateField())
    menu = serializers.PrimaryKeyRelatedField(many=False,required=True,
                                                     read_only=False, queryset=Menu.objects.all())
    campus = serializers.PrimaryKeyRelatedField(many=False,required=True,
                                                     read_only=False, queryset=Campus.objects.all())
    servings = serializers.IntegerField(required=True)                                                                                                

    class Meta:
        
        fields = ('id','date','menu','campus','servings')   
    
    def create(self, validated_data):
        datas = validated_data.pop('date')
        for data in datas:
            validated_data['date'] = data
            try:
                menudate = MenuWithDate.objects.create(**validated_data)
            except: raise serializers.ValidationError('Error: Fecha para menu y sede ya existente')
        return menudate      

class MenuWithDateDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuWithDate
        fields = ('__all__')  
        depth = 1

class MenuSerializer(serializers.ModelSerializer):

    starter = ComponentSerializer(many=True, read_only=True)
    principal = ComponentSerializer(many=True, read_only=True)
    dessert = ComponentSerializer(many=True, read_only=True)
    drink = ComponentSerializer(many=True, read_only=True) 
    # enabled_dates = serializers.PrimaryKeyRelatedField(many=True,required=False,
    #                                                 read_only=False, queryset=EnabledDate.objects.all())
     

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
        fields = ('id', 'name', 'price','celiac','vegetarian', 'starter', 'principal', 'dessert', 'drink', 
                   'starter_id', 'principal_id', 'dessert_id', 'drink_id','image')



    


      

        