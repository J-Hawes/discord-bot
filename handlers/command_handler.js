const fs = require('node:fs');

module.exports = (bot) => {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		if (command.data.name) {
			bot.commands.set(command.data.name, command);
		}
		else {
			continue;
		}
	}
};