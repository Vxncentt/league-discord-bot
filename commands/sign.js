import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('sign')
  .setDescription('Signs a player to a team')
  .addUserOption(opt => opt.setName('player').setDescription('Player to sign').setRequired(true))
  .addRoleOption(opt => opt.setName('team').setDescription('Team role').setRequired(true));

export async function execute(interaction) {
  const player = interaction.options.getUser('player');
  const team = interaction.options.getRole('team');

  const member = await interaction.guild.members.fetch(player.id);
  await member.roles.add(team);

  await interaction.reply(`${player.username} has been signed to ${team.name}!`);
}
