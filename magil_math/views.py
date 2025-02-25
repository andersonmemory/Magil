from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'magil_math/magil_math.html')

# TODO
def sum(request):
    pass

def subtraction(request):
    pass

def multiplication(request):
    pass

def division(request):
    pass