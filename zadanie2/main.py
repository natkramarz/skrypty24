import os

import discord
from dotenv import load_dotenv
import random
import requests 
import json

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

def get_rasa_response(message):

	headers = {
	'Content-Type': 'application/json',
	}

	data = '{"sender": "test_user",' + f'"message": "${message}"' + '}'
	response = requests.post('http://localhost:5005/webhooks/rest/webhook', headers=headers, data=data)

	response = json.loads(response.content)
	return response[0]["text"]

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    response = get_rasa_response(message.content)
    await message.channel.send(response)
        

client.run(TOKEN)