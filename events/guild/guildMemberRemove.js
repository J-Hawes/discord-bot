module.exports = async (bot, member) => {
		console.log('User: ' + member.user.username + ' has left the server!');
		member.guild.channels.cache.get('1011875787558899752').send(`<@${member.user.id}> has left the Server`);
};