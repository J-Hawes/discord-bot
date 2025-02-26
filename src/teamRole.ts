const welcome = require('./welcomeMessage');

module.exports = (bot : any, member : any) => {
	const channelId = '1010732049499426847';

	const getEmoji = (emojiName: string) =>
		bot.emojis.cache.find((emoji: { name: string; }) => emoji.name === emojiName);

	enum emojis {
		instinct,
		mystic,
		valor
	};

	const reactions = [];

	let emojiText = '';
	for (const key in emojis) {
		const emoji = getEmoji(key);
		reactions.push(emoji);

		const role = emojis[key];
		emojiText += `${emoji} = ${role}\n`;
	}

	welcome(bot, member, channelId, emojiText, [reactions]);

	const handleReaction = (reaction : any, user : any, add : any) => {
		if (user.bot === true) {
			return;
		}

		const emoji = reaction._emoji.name;
		const { guild } = reaction.message;
		const roleName = emojis[emoji];

		if (!roleName) {
			return;
		}

		const role = guild.roles.cache.find((roles: { name: string; }) => roles.name === roleName);
		const members = guild.members.cache.find((memberss: { id: any; }) => memberss.id === user.id);

		if (add) {
			members.roles.add(role);
		}
		else {
			members.roles.remove(role);
		}
	};

	bot.on('messageReactionAdd', (reaction : any, user : any) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, true);
		}
	});

	bot.on('messageReactionRemove', (reaction : any, user : any) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});

};

