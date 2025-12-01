import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('autorole')
  .setDescription('Sets up an autorole system placeholder.');

export async function execute(interaction) {
  await interaction.reply('Autorole reaction system placeholder added.');
}
