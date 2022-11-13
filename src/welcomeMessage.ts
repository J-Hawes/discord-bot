const addReactions = (message : any, reactions : any) => {
    message.react(reactions[0]);
    reactions.shift();
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
};

module.exports = async (bot : any, member : String, id : String, text : String, reactions = [] ) => {
    const channel = await bot.channels.fetch(id);
    const welcomeText =
    // `Welcome <@${member.user.id}> to the Server\n` +
        'Your nickname for this channel has been set to New Member\n' +
        'Please change your nickname to match the format of\n' +
        'First Name (Trainer/In Game Name) ' +
        'using the ```/nick command```' +
        'Please choose a team role, by selecting one of the reactions below\n' +
        text;

    channel.messages.fetch().then(
        channel.send(welcomeText).then((message: any) => {
            addReactions(message, reactions[0]);
        }));
};