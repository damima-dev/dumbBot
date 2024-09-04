import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

const command = {
  data: new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides information about the server.'),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
	if (!interaction.guild) {
	  await interaction.reply('This command can only be used in a server.');
	  return;
	}

	await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
  },
};

module.exports = command;