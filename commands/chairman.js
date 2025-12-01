import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('chairman')
  .setDescription('Assigns a chairman to a club')
  .addUserOption(o => o.setName('user').setDescription('User to make chairman').setRequired(true))
  .addRoleOption(o => o.setName('clubrole').setDescription('Club role').setRequired(true));

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const clubRole = interaction.options.getRole('clubrole');
  const member = await interaction.guild.members.fetch(user.id);
  await member.roles.add(clubRole);

  await interaction.reply(`${user.username} is now chairman of ${clubRole.name}!`);
}
