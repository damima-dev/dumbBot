require("dotenv").config();
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluate JavaScript code')
    .addStringOption(option =>
      option.setName('code')
        .setDescription('The JavaScript code to evaluate')
        .setRequired(true)
    ),
  async execute(interaction) {
    const authorizedUserID = process.env.ownerId; // Replace with your authorized user's ID

    if (interaction.user.id !== authorizedUserID) {
      return interaction.reply('You are not authorized to use this command.');
    }

    const code = interaction.options.getString('code');
    try {
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }

      // Send a success message
      interaction.reply(`Evaluation successful:\n\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
      // Send an error message
      interaction.reply(`Evaluation failed: \n\`\`\`js\n${err}\n\`\`\``);
    }
  },
};