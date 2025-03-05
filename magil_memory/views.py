from django.shortcuts import render

from dotenv import load_dotenv
import os
import asyncio


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
        webhook_name = "digits discipline"

        asyncio.run(webhook_send(f"Message coming from digits.html: {user_value}", webhook_name)


    return render(request, 'magil_memory/digits.html')

# TODO: /cards

# TODO: /spoken_digits

# TODO: /words

# TODO: /names_and_faces

