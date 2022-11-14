import { Command } from "../types/Commands";

export default new Command({
    name: "server",
    description: "Replies with server info!",
    run: async ({ interaction }) => {
        const owner = await interaction.guild!.fetchOwner();
		await interaction.reply(`Server name: ${interaction.guild!.name}\n` +
        `Total members: ${interaction.guild!.memberCount}\n` +
        `Created on: ${interaction.guild!.createdAt.toDateString()}\n` +
        `Owner ${owner.user.username}`);
    }
});
