from django.shortcuts import render
from django import forms


# Create your views here.
def index(request):
    pass


def login(request):
    if request.method == "POST":
        # TODO: validation and form logic
        pass


def authentication(request):
    return render(request, "trainer/auth.html")
