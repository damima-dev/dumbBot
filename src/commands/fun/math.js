const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Solves math problems')
        .addStringOption(option =>
            option
                .setName('problem')
                .setDescription('The problem to solve')
                .setRequired(true)
        ),
    execute: async function (interaction) {
        const problem = interaction.options.getString('problem');
        const answer = eval(problem);
        const correctResponse = Math.random() < 0.2; // 20% chance of correct response

        if (correctResponse) {
            await interaction.reply(answer.toString());
        } else {
            const incorrectAnswer = this.getPlausibleIncorrectAnswer(problem);
            await interaction.reply(incorrectAnswer.toString());
        }
    },
    getPlausibleIncorrectAnswer: function (problem) {
        const parts = problem.split('+');
        if (parts.length === 2) {
            const num1 = parseInt(parts[0]);
            const num2 = parseInt(parts[1]);
            return num1 * 10 + num2; // e.g. 2+2 becomes 22
        } else {
            return Math.floor(Math.random() * 100); // fallback to random answer
        }
    }
};