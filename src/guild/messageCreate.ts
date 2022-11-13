import { EmbedBuilder } from 'discord.js';
// Basic swear word filter
module.exports = async (bot : any, message : any) => {
	// Make sure filtered list of words are lowercase only.
	const swearWords = ['cunt', 'fuck'];
	console.log(`${message.author.tag} in #${message.channel.name} sent a message.\n${message}`);
	// If message is from the bot, do nothing
	if (message.author.bot == true) {
		return;
	}
	// If user message contains a listed word
	else if (swearWords.some(word => message.content.toLowerCase().includes(word.toLowerCase()))) {
		const content = message.content;
		message.delete();

		const embed = new EmbedBuilder()
			.setColor([255, 204, 77])
			.setTitle('Swear Filter Detection')
			.setAuthor({ name: `[WARN] ${message.author.tag}`, iconURL: bot.guilds.resolve(message.guildId).members.resolve(message.author.id).user.avatarURL() })
			.setDescription('⚠')
			.setThumbnail('https://cdn.discordapp.com/app-icons/1010001480574574604/e780efaafbcaccd8356dd42088718910.png')
			.addFields(
				{ name: 'User Name', value: `<@${message.author.id}>`, inline: true },
				{ name: 'In channel', value: `<#${message.channelId}>`, inline: true },
				{ name: 'Reason', value: 'Use of bad words', inline: true },
			)
			.addFields({ name: 'Message that was sent:', value: content })
			.setTimestamp()
			.setFooter({
				text: bot.users.cache.get('1010001480574574604').username,
				iconURL: 'https://cdn.discordapp.com/app-icons/1010001480574574604/e780efaafbcaccd8356dd42088718910.png',
			});

		message.channel.send(`Please be mindfull of your language <@${message.author.id}>, you have been warned!`);
		message.guild.channels.cache.get('1011875787558899752').send({ embeds: [embed] });
	}
	// Otherwise ignore
	else {
		return;
	}
};