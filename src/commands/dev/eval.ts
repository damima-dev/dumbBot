require("dotenv").config();
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

const command = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluate JavaScript code')
    .addStringOption(option =>
      option.setName('code')
        .setDescription('The JavaScript code to evaluate')
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const authorizedUserID = process.env.ownerId; // Replace with your authorized user's ID

    if (interaction.user.id !== authorizedUserID) {
      await interaction.reply('You are not authorized to use this command.');
      return; // This line is now correct
    }

    const code = interaction.options.get('code')?.value as string;
    try {
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }

      // Send a success message
      await interaction.reply(`Evaluation successful:\n\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
      // Send an error message
      await interaction.reply(`Evaluation failed: \n\`\`\`js\n${err}\n\`\`\``);
    }
  },
};

module.exports = command;