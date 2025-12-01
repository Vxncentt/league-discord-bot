import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// Load commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = (await import(`./commands/${file}`)).default;
  client.commands.set(command.data.name, command);
}

client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "Error executing command.", ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
