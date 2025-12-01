import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Ban a member')
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption(o => o.setName('user').setDescription('User to ban').setRequired(true))
  .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(false));

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason') || 'No reason given';

  const member = await interaction.guild.members.fetch(user.id);
  await member.ban({ reason });

  await interaction.reply(`${user.username} has been banned. Reason: ${reason}`);
}
