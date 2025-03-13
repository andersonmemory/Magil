from django.shortcuts import render

from dotenv import load_dotenv
import os
import asyncio


load_dotenv()

from magil.discord_methods import webhook_send, webhook_training_logs_send, webhook_cards_discipline, webhook_digits_discipline

# Create your views here.
def home(request):
    return render(request, 'magil_memory/magil_memory.html')

# TODO: /digits
def digits(request):

    if request.method == "POST":

        user_value = request.POST.get('discord_id')
        webhook_name = "Disciplina de digitos"

        memo_elapsed = request.POST.get('memo_elapsed')
        recall_elapsed = request.POST.get('recall_elapsed')
        digits_amount = request.POST.get('digits_amount')
        user_score = request.POST.get("user_score")
        user_failure = request.POST.get("user_failure")

        if user_failure == '0':
            asyncio.run(webhook_digits_discipline(f"<@{user_value}> memorizou {user_score} dígitos sem nenhum erro em {memo_elapsed}, com {recall_elapsed} de recall!", webhook_name))
        else:
            asyncio.run(webhook_digits_discipline(f"<@{user_value}> memorizou {user_score} de {digits_amount} dígitos em {memo_elapsed}, com {recall_elapsed} de recall!", webhook_name))

    return render(request, 'magil_memory/digits.html')

# TODO: /cards
def cards(request):
    if request.method == "POST":

        user_value = request.POST.get('discord_id')
        webhook_name = "Disciplina de cartas"

        memo_elapsed = request.POST.get('memo_elapsed')
        recall_elapsed = request.POST.get('recall_elapsed')
        cards_amount = request.POST.get('cards_amount')
        user_score = request.POST.get("user_score")
        user_failure = request.POST.get("user_failure")

        if user_failure == '0':
            asyncio.run(webhook_cards_discipline(f"<@{user_value}> memorizou {user_score} cartas sem nenhum erro em {memo_elapsed}, com {recall_elapsed} de recall!", webhook_name))
        else:
            asyncio.run(webhook_cards_discipline(f"<@{user_value}> memorizou {user_score} de {cards_amount} cartas em {memo_elapsed}, com {recall_elapsed} de recall!", webhook_name))

    return render(request, 'magil_memory/cards.html')

# TODO: /spoken_digits

# TODO: /words

# TODO: /names_and_faces

