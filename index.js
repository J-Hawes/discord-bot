// Require the necessary discord.js classes
const { Client, Collection } = require('discord.js');
const command_handler = require('./handlers/command_handler');
const event_handler = require('./handlers/event_handler');

// Require dotenv for configuring environment variables
require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;

// Create a new client instance
const bot = new Client({ intents: 34375 });

// Read command files
bot.commands = new Collection();
bot.events = new Collection();

['command_handler', 'event_handler'].forEach(handler => {
	bot.commands.set(command_handler, event_handler);
	require(`./handlers/${handler}`)(bot);
});

// Login to Discord with client's token
bot.login(TOKEN);
