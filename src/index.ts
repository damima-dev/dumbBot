import { Client, Collection, GatewayIntentBits, Options } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	makeCache: Options.cacheWithLimits({
		MessageManager: 10,
		StageInstanceManager: 10,
		VoiceStateManager: 10,
	}),
	allowedMentions: {
		parse: [],
	},
});

declare module 'discord.js' {
	interface Client {commands: Collection<string, any>;}
  }

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = await import(filePath);
		if (!('data' in command) || !('execute' in command)) {
			throw new Error(`The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
		client.commands.set(command.data.name, command);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = await import(filePath);
	if (!('name' in event) || !('execute' in event)) {
		throw new Error(`The event at ${filePath} is missing a required "name" or "execute" property.`);
	}
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.token);