const fs = require ('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { ActivityType, Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Require dotenv for configuring environment variables
require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;

// Create a new client instance
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Read command files
bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
}

// Set bot status
bot.once('ready', () => {
    bot.user.setActivity("Pokémon GO", { type: ActivityType.Playing });
	console.log(`Ready! Logged in as ${bot.user.tag}`);
});

// Assign non-member role on joining
bot.on('guildMemberAdd', member => {
    console.log('User: ' + member.user.username + ' has joined the server!');
    let role = member.guild.roles.cache.find(role => role.name === 'nonmembers');
    member.roles.add(role);
    member.guild.channels.cache.get('1011875787558899752').send(`Welcome <@${member.user.id}> to the Server`);
});

// Notify when user leaves/gets kicked
bot.on('guildMemberRemove', member => {
    console.log('User: ' + member.user.username + ' has left the server!');
    member.guild.channels.cache.get('1011875787558899752').send(`<@${member.user.id}> has left the Server`);
});

// Basic Swear Filter
bot.on('messageCreate', message => {
    // Make sure all of the words are lowercased only.
    const swearWords = ["cunt", "fuck"];
    console.log(`${message.author.tag} in #${message.channel.name} sent a message.`);
    console.log(message);
    // If message is from the bot, do nothing
    if(message.author.bot == true) return;
    // If user message contains a listed word
    else if (swearWords.some(word => message.content.toLowerCase().includes(word.toLowerCase()))) {
        const content = message.content;
        message.delete();

        const embed = new EmbedBuilder()
        .setColor([255, 204, 77])
        .setTitle(`⚠ Swear Filter Detection ⚠`)
        .setAuthor({ name: `[WARN] ${message.author.tag}`, iconURL: bot.guilds.resolve(message.guildId).members.resolve(message.author.id).user.avatarURL() })
        //.setDescription('Swear Filter Detection')
        .setThumbnail('https://cdn.discordapp.com/app-icons/1010001480574574604/e780efaafbcaccd8356dd42088718910.png')
        .addFields(
            { name: 'User Name', value: `<@${message.author.id}>`, inline: true },
            { name: 'In channel', value: `<#${message.channelId}>`, inline: true },
            { name: 'Reason', value: 'Use of bad words', inline: true}
        )
        .addFields({ name: 'Message that was sent:', value: content })
        .setTimestamp()
        .setFooter({ text: bot.users.cache.get('1010001480574574604').username, iconURL: 'https://cdn.discordapp.com/app-icons/1010001480574574604/e780efaafbcaccd8356dd42088718910.png' });

        message.channel.send(`Please be mindfull of your language <@${message.author.id}>, you have been warned!`);
        console.log(content);
        message.guild.channels.cache.get('1011875787558899752').send({ embeds: [embed] })
    }
    else return; // Otherwise ignore
});

// Slash commands
bot.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = bot.commands.get(interaction.commandName);
	if (!command) return;
	try {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// Login to Discord with client's token
bot.login(TOKEN);
