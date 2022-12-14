const fs = require ('node:fs');

module.exports = (bot) => {
	const loadDir = (dirs) => {
		const eventFiles = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
		for (const file of eventFiles) {
			const event = require(`../events/${dirs}/${file}`);
			const eventName = file.split('.')[0];
            bot.events.set(eventName, event);
			bot.on(eventName, event.bind(null, bot));
		}
	};

	['client', 'guild'].forEach(e => loadDir(e));

};