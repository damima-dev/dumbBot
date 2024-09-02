# dumbBot
dumbBot is a Discord dumb funny bot that has fun commands.

# Self Hosting
> [!CAUTION]
> Do not share your bot token to anyone.

You can self host dumbBot for what you want, but you must abide to the [LICENSE](/LICENSE).

## Setup
### Prequisites
- [git](https://git-scm.com/)
- [pnpm](https://pnpm.io/)
- [nodejs](https://nodejs.org/)

1. Clone the repository

   ```
   git clone https://github.com/damimaa/dumbBot
   ```
2. Copy `.env.example` to `.env` and fill in all the required values
3. Install all the packages with `pnpm i`

Tadaaa! You have setup your dumbBot instance!

## Terminal Commands
> [!TIP]
> We recommend to run your instance with the following command, using [nodemon](https://nodemon.io/).

`pnpm run dev`: Run the instance with `nodemon`
`pnpm run register`: Register slash commands.
`pnpm run start`: Run the instance normally.
