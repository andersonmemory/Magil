from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'magil_math/magil_math.html')