import { Command } from "../types/Commands";

export default new Command({
    name: "server",
    description: "Replies with server info!",
    run: async ({ interaction }) => {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    }
});
