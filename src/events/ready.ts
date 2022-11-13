import { Client, ActivityType } from 'discord.js';

export default (bot: Client): void => {
    bot.on("ready", async() => {
        if(!bot.user || !bot.application) {
            return;
        }
        bot.user.setActivity('Pokémon GO', { type: ActivityType.Playing });
        console.log(`Ready! Logged in as ${bot.user.tag}`);
    });
};