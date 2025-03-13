from dotenv import load_dotenv
import os

from discord import Webhook
import aiohttp

load_dotenv()

# DEVELOPING & TESTING WEBHOOKS
async def webhook_send(message, webhook_name):
    async with aiohttp.ClientSession() as session:
        webhook = Webhook.from_url(os.getenv('WEBHOOK_COMMANDS'), session=session)
        await webhook.send(message, username=webhook_name)

async def webhook_training_logs_send(message, webhook_name):
    async with aiohttp.ClientSession() as session:
        webhook = Webhook.from_url(os.getenv('WEBHOOK_TRAINING_LOGS'), session=session)
        await webhook.send(message, username=webhook_name)

# DISCIPLINES WEBHOOKS 
async def webhook_cards_discipline(message, webhook_name):
    async with aiohttp.ClientSession() as session:
        webhook = Webhook.from_url(os.getenv('WEBHOOK_CARDS_DISCIPLINE'), session=session)
        await webhook.send(message, username=webhook_name)

async def webhook_digits_discipline(message, webhook_name):
    async with aiohttp.ClientSession() as session:
        webhook = Webhook.from_url(os.getenv('WEBHOOK_DIGITS_DISCIPLINE'), session=session)
        await webhook.send(message, username=webhook_name)