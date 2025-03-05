from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'magil_memory/magil_memory.html')

# TODO: /digits
def digits(request):

    if request.method == "POST":
        # TODO: call discord API to ping user 
        # message:
        # @user completed one digits session!

        print(request.POST.get('discord_id'))

    return render(request, 'magil_memory/digits.html')

# TODO: /cards

# TODO: /spoken_digits

# TODO: /words

# TODO: /names_and_faces

