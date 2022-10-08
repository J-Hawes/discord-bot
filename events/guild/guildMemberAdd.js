module.exports = async (bot, member) => {
		console.log('User: ' + member.user.username + ' has joined the server!');
		const role = member.guild.roles.cache.find(roles => roles.name === 'nonmembers');
		member.roles.add(role);
		member.guild.channels.cache.get('1010732049499426847').send(`Welcome <@${member.user.id}> to the Server`);
};