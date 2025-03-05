from django.shortcuts import render

from dotenv import load_dotenv
import os

load_dotenv()

from magil.discord_methods import webhook_send

# Create your views here.
def home(request):
    return render(request, 'magil_memory/magil_memory.html')

# TODO: /digits
def digits(request):

    if request.method == "POST":
        # TODO: call discord API to ping user 
        # message:
        # @user completed one digits session!

        user_value = request.POST.get('discord_id')

        await webhook_send(f"Message coming from digits.html: {user_value}", os.getenv("WEBHOOK_COMMANDS"))



    return render(request, 'magil_memory/digits.html')

# TODO: /cards

# TODO: /spoken_digits

# TODO: /words

# TODO: /names_and_faces

