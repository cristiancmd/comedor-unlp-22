from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import datetime

from django.core.validators import RegexValidator

alphabetical = RegexValidator(
    r'^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1\'\s\-]+$', 'Este campo solo acepta caracteres alfabéticos y numericos.')

numbers = RegexValidator(
    r'^[0-9]+$', 'Este campo solo acepta caracteres númericos.')


def date_is_valid(value):
    try:
        if value <= datetime.date.today():
            raise ValidationError("La fecha del ticket debe ser mayor al día de hoy")
    except Exception as e:
        raise ValidationError("La fecha del ticket debe ser mayor al día de hoy")