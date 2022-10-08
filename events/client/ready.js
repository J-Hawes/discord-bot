const { ActivityType } = require('discord.js');

module.exports = (bot) => {
	bot.user.setActivity('Pokémon GO', { type: ActivityType.Playing });
	console.log(`Ready! Logged in as ${bot.user.tag}`);
};