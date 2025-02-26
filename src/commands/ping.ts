import { Command } from "../types/Commands";

export default new Command({
    name: "ping",
    description: "Replies with server ping!",
    run: async ({ interaction }) => {
        const sent : any = await interaction.reply({ content: 'Pinging...', withResponse: true });
        interaction.editReply(`Roundtrip latency: ${interaction.createdTimestamp - Date.parse(sent.interaction.createdAt)}ms`);
    }
});