module.exports = async (bot, interaction) => {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		if (!interaction.isChatInputCommand()) return;
		const command = bot.commands.get(interaction.commandName);
		console.log(command);
		if (!command) return;
		try {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
}
