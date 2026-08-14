from enum import unique
from inspect import CO_VARKEYWORDS

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    pass


class Discipline(models.Model):
    class DisciplineNames(models.TextChoices):
        NUMBERS = "NUMBERS", "Números"
        CARDS = "CARDS", "Cartas"
        WORDS = "WORDS", "Palavras"
        SPOKEN_NUMBERS = "SPOKEN_NUMBERS", "Números falados"
        NAMES_AND_FACES = "NAMES_AND_FACES", "Nomes e rostos"
        ABSTRACT_IMAGES = "ABSTRACT_IMAGES", "Imagens abstratas"

    name = models.CharField(
        max_length=50, choices=DisciplineNames, null=False, unique=True
    )


class SessionMemory(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sessions_memo"
    )
    discipline = models.ForeignKey(
        Discipline, on_delete=models.CASCADE, related_name="sessions_memo"
    )
    # creation_date
    # amount
    # errors
    # score
    # memo_time
    # recall_time
    # memo_selected_time
