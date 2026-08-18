from django.shortcuts import render

from .utils import validate_form


# Create your views here.
def index(request):
    # for now it's assuming the user is authentication
    return render(request, "trainer/index.html")


def login(request):
    if request.method == "POST":
        # TODO: validation and form logic
        pass


def authentication(request):
    # if request.method == "POST":
    #     validate_form(request, request.POST.dict())
    #     return render(request, "trainer/auth.html")
    #
    # elif request.method == "GET":
    return render(request, "trainer/auth.html")
