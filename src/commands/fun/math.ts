import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import { CommandInteraction } from 'discord.js';

const mathCommand = {
  data: new SlashCommandBuilder()
    .setName('math')
    .setDescription('Solves math problems')
    .addStringOption(
      new SlashCommandStringOption()
        .setName('problem')
        .setDescription('The problem to solve')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction): Promise<void> {
    const problem = interaction.options.getString('problem');
    try {
      const answer = solveMathProblem(problem);
      const correctResponse = Math.random() < 0.2; // 20% chance of correct response

      if (correctResponse) {
        await interaction.reply(answer.toString());
      } else {
        const incorrectAnswer = getPlausibleIncorrectAnswer(problem);
        await interaction.reply(incorrectAnswer.toString());
      }
    } catch (error) {
      await interaction.reply('Invalid math problem');
    }
  }
};

// ...