import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

export const data = new SlashCommandBuilder()
  .setName('clubinfo')
  .setDescription('Displays info about a club')
  .addStringOption(o => o.setName('club').setDescription('Club name').setRequired(true));

export async function execute(interaction) {
  const club = interaction.options.getString('club');
  const clubs = JSON.parse(fs.readFileSync('./data/clubs.json'));

  if (!clubs[club]) {
    return interaction.reply('Club not found.');
  }

  await interaction.reply(`**${club}**
Chairman: ${clubs[club].chairman}
Players: ${clubs[club].players.join(', ')}`);
}
