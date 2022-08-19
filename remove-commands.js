// Require the necessary discord.js classes
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
// dotenv for configuring environment variables
require("dotenv").config();
const { token, clientId, guildId } = process.env;

const rest = new REST({ version: '10' }).setToken(token);

//Remove an individual command
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1010070449599811615'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

//Remove guild based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
.then(() => console.log('Successfully deleted all guild commands.'))
.catch(console.error);