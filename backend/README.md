**python 3.9**
Crear un virtualenv con python 3.9

**Activar el virtualenv**

**Dentro del proyecto para instalar las dependencias:**
`pip install -r requirements.txt`

**Configuraciones locales:**
`cp comedor/local_settings_example.py comedor/local_settings.py`

**Si existe una base de datos sqlite**
Borrar el archivo `bd.sqlite3`

**Correr migraciones de la base:**
 `python manage.py migrate`

**Crear admin de django**
 `python manage.py createsuperuser`
 
**Cargar datos de prueba:**
`python manage.py loaddata api/fixtures/init_data.json`

**Iniciar el servidor:**
 `python manage.py runserver`
 

## paths:
### localhost:8000/admin/ 
### localhost:8000/api/users/ 
### localhost:8000/api/users/login/ 
### localhost:8000/api/users/logout/ 

### localhost:8000/api/ingredients/
### localhost:8000/api/ingredients/{id}
### localhost:8000/api/components/ 

### localhost:8000/api/menus/ 
### localhost:8000/api/menus/{id}

### localhost:8000/api/component_type/












