from django.shortcuts import render

import asyncio

from . import discord_methods

from dotenv import load_dotenv
import os
load_dotenv()


def home(request):
    return render(request, 'home.html')

def training(request):

    # Commented - Only works with my own server IP and not render.

    message = "An user just entered on the Magil website!"
    webhook_name = "Magil logs"

    asyncio.run(discord_methods.webhook_training_logs_send(message, webhook_name))

    return render(request, 'training.html')