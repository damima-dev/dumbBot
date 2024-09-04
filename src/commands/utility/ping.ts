import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

const pingCommand = {
  data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!'),
  execute: async function (interaction: ChatInputCommandInteraction) {
	try {
	  await interaction.reply('Pong!');
	} catch (error) {
	  console.error('Error executing ping command:', error);
	  await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
	}
  }
};

module.exports = pingCommand;