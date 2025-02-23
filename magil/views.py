from django.shortcuts import render

import asyncio

from . import discord_methods

def home(request):
    return render(request, 'home.html')

def training(request):

    message = "An user just entered on the Magil website!"
    webhook_name = "Magil logs"

    asyncio.run(discord_methods.webhook_send(message, webhook_name))

    return render(request, 'training.html')