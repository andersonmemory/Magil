from dotenv import load_dotenv
import os

from discord import Webhook
import aiohttp

load_dotenv()

async def webhook_send(message, webhook_name):
    async with aiohttp.ClientSession() as session:
        webhook = Webhook.from_url(os.getenv('WEBHOOK_COMMANDS'), session=session)
        await webhook.send(message, username=webhook_name)