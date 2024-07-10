from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("этот никнейм уже занят"),
        },
    )
    email = models.EmailField(
        # _("email address"),
        unique=True,
        blank=True,
        null=True,
        verbose_name="email",
        help_text="Укажите email",
        error_messages={
            "unique": _("этот email привязан к другому пользователю"),
        }
    )
    phone = PhoneNumberField(
        # _("phone number"),
        unique=True,
        null=True,
        blank=True,
        verbose_name="Номер телефона",
        help_text="Укажите номер телефона",
        error_messages={
            "unique": _("этот телефон привязан к другому пользователю"),
        }
    )
    age = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Возраст",
        help_text="Укажите возраст"
    )
    image = models.ImageField(
        upload_to='user/images/avatar/',
        blank=True,
        null=True,
        verbose_name="Фото пользователя",
        help_text="Установите фото профиля"
    )

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        app_label = 'user'
        db_table = 'user_user'
