const welcome = require('./welcomeMessage');

module.exports = (bot, member) => {
	const channelId = '1010732049499426847';

	const getEmoji = (emojiName) =>
		bot.emojis.cache.find((emoji) => emoji.name === emojiName);

	const emojis = {
		instinct: 'Instinct',
		mystic: 'Mystic',
		valor: 'Valor',
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

	const handleReaction = (reaction, user, add) => {
		if (user.bot === true) {
			return;
		}

		const emoji = reaction._emoji.name;
		const { guild } = reaction.message;
		const roleName = emojis[emoji];

		if (!roleName) {
			return;
		}

		const role = guild.roles.cache.find(roles => roles.name === roleName);
		const members = guild.members.cache.find(memberss => memberss.id === user.id);

		if (add) {
			members.roles.add(role);
		}
		else {
			members.roles.remove(role);
		}
	};

	bot.on('messageReactionAdd', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, true);
		}
	});

	bot.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});

};

