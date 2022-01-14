from pathlib import Path

# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True



ALLOWED_HOSTS = ['*' ]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-2c!4f)-lxls*qao^#5hiz8cp%ommg@-o-5hp=(zw@k(=j^bi_2'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'demo_db',
#         'USER': 'postgres',
#         'PASSWORD': 'postgres07155',
#         'HOST': 'database-1.czy7xkvxfgbg.us-east-1.rds.amazonaws.com',
#         'PORT': '5432'
#     }
# }