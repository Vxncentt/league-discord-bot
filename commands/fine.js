import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

export const data = new SlashCommandBuilder()
  .setName('fine')
  .setDescription('Fine a player')
  .addUserOption(o => o.setName('player').setDescription('Player').setRequired(true))
  .addIntegerOption(o => o.setName('amount').setDescription('Amount').setRequired(true));

export async function execute(interaction) {
  const player = interaction.options.getUser('player');
  const amount = interaction.options.getInteger('amount');

  const fines = JSON.parse(fs.readFileSync('./data/fines.json'));
  fines[player.id] = (fines[player.id] || 0) + amount;

  fs.writeFileSync('./data/fines.json', JSON.stringify(fines, null, 2));

  await interaction.reply(`${player.username} has been fined ${amount}.`);
}
