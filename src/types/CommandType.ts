import { 
    ChatInputApplicationCommandData, 
    CommandInteraction, 
    CommandInteractionOptionResolver, 
    PermissionResolvable 
} from "discord.js";
import { ExtendedClient } from "../client";

interface RunOptions {
    bot: ExtendedClient,
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options : RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData