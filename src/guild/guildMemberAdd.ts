const teamRole = require('../../teamRole');

module.exports = async (bot : any, member : any) => {
	const role = member.guild.roles.cache.find((roles: { name: string; }) => roles.name === 'New-Members');

	console.log('User: ' + member.user.username + ' has joined the server!');

	member.roles.add(role);
	member.guild.channels.cache.get('1010732049499426847').send(`Welcome <@${member.user.id}> to the Server`);
	member.setNickname('New Member');
	teamRole(bot, member);
};