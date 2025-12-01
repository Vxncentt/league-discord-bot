import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('welcome')
  .setDescription('Sets a welcome message');

export async function execute(interaction) {
  await interaction.reply('Welcome message system is not fully implemented yet.');
}
