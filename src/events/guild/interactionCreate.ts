import { CommandInteractionOptionResolver } from "discord.js";
import { bot } from '../../';
import { Event } from '../../types/Event';

//fix this channel name in the log
export default new Event('interactionCreate', async (interaction) => {
console.log(`${interaction.user.tag} in ${await interaction.channel} triggered an interaction.`);
    if (!interaction.isCommand()) return;
    const command = bot.commands.get(interaction.commandName);
    if (!command) return;
    try {
        command.run({
            bot,
            interaction,
            args: interaction.options as CommandInteractionOptionResolver
        });
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});