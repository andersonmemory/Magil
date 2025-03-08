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

        user_value = request.POST.get('discord_id')
        webhook_name = "digits discipline"

        memo_elapsed = request.POST.get('memo_elapsed')
        recall_elapsed = request.POST.get('recall_elapsed')
        digits_amount = request.POST.get('digits_amount')

        asyncio.run(webhook_send(f"<@{user_value}> memorizou {digits_amount} dígitos em {memo_elapsed}, com {recall_elapsed} de recall!", webhook_name))


    return render(request, 'magil_memory/digits.html')

# TODO: /cards

# TODO: /spoken_digits

# TODO: /words

# TODO: /names_and_faces

