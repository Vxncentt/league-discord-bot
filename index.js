import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Create __dirname in ES module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
                       .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const { default: command } =
        await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: 'There was an error executing this command.',
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
