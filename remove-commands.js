// Require the necessary discord.js classes
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

// dotenv for configuring environment variables
require('dotenv').config();
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// Remove guild based commands
(async () => {
	try {
		console.log('Started removing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: [] },
		);

		console.log('Successfully removed application (/) commands.');
	}
    catch (error) {
		console.error(error);
	}
})();