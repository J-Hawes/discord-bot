import { ActivityType } from 'discord.js';
import { bot } from '../../';
import { Event } from '../../types/Event';

export default new Event("ready", () => {
        if(!bot.user || !bot.application) {
            return;
        }
        bot.user.setActivity('Pokémon GO', { type: ActivityType.Playing });
        console.log(`Ready! Logged in as ${bot.user.tag}`);
});