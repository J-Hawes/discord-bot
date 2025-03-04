// const teamRole = require('../../teamRole');

module.exports = async (bot, member) => {
    const role = member.guild.roles.cache.find(roles => roles.name === 'New-Members');

    console.log('User: ' + member.user.username + ' has joined the server!');

    member.roles.add(role);
    member.guild.channels.cache.get('1010732049499426847').send(`Welcome <@${member.user.id}> to the Server
        Your nickname for this channel has been set to New Member
        Please change your nickname to match the format of
        First Name (Trainer/In Game Name)
        using the /nick command`);
    member.setNickname('New Member');
    // teamRole(bot, member);
};