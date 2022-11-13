import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import { Event } from "./types/Event";
import { RegisterCommandsOptions } from "./types/Client";
import { CommandType } from "./types/Command";
import glob from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<String, CommandType> = new Collection();

    constructor() {
        super({ intents: 34375})
    }

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_TOKEN);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands( {commands, guildId, }: RegisterCommandsOptions) {
        if(guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        //commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/commands/*{.ts,.js}`);
        commandFiles.forEach(async filePath => {
            const command: CommandType= await this.importFile(filePath);
            if(!command.name) return;
console.log(command.name, command);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        // this.on("ready", () => {
        //     this.registerCommands({
        //         commands: slashCommands,
        //         guildId: process.env.GUILD_ID
        //     });
        // });

        //events
        const eventFiles = await globPromise(`${__dirname}/events/*{.ts,.js}`);
        console.log({eventFiles});
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run)
        });
    }
}