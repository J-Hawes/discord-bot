// Require the necessary discord.js classes
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

// dotenv for configuring environment variables
require("dotenv").config();
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

//Remove an individual command
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1010070449599811615'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

//Remove guild based commands
rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
.then(() => console.log('Successfully deleted all guild commands.'))
.catch(console.error);