from django.urls import path

from . import views

urlpatterns = [
    path('', views.home),
    path('digits/', views.digits, name="digits"),
    path('cards/', views.cards, name="cards"),
]
