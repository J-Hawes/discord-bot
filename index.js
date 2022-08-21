const fs = require ('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { ActivityType, Client, Collection, GatewayIntentBits, GuildMember } = require('discord.js');

// Require dotenv for configuring environment variables
require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Read command files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Set bot status
client.once('ready', () => {
    client.user.setActivity("Pokémon GO", { type: ActivityType.Playing });
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
// needs work, assign non-member role on joining
client.on('GuildMemberAdd', async member => {
    try{
        console.log('User: ' + member.user.username + ' has joined the server!');
        const role = member.guild.roles.cache.find(role => role.name === "non members");
        await member.roles.add(role);
    } catch (error)
    {
        console.log(error);
    }
    
});

// Login to Discord with client's token
client.login(TOKEN);
