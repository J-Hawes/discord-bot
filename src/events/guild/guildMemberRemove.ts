import { Event } from '../../types/Event';

export default new Event('guildMemberRemove', async (interaction) => {
    console.log('User: ' + interaction.user.username + ' has left the server!');
    const channel = interaction.guild.channels.cache.get('1011875787558899752');
    channel?.client.user?.send(`<@${interaction.user.id}> has left the Server`);
})
