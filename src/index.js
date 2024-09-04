"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent],
    makeCache: discord_js_1.Options.cacheWithLimits({
        MessageManager: 10,
        StageInstanceManager: 10,
        VoiceStateManager: 10,
    }),
    allowedMentions: {
        parse: [],
    },
});
client.commands = new discord_js_1.Collection();
var foldersPath = node_path_1.default.join(__dirname, 'commands');
var commandFolders = node_fs_1.default.readdirSync(foldersPath);
for (var _i = 0, commandFolders_1 = commandFolders; _i < commandFolders_1.length; _i++) {
    var folder = commandFolders_1[_i];
    var commandsPath = node_path_1.default.join(foldersPath, folder);
    var commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.ts'); });
    for (var _a = 0, commandFiles_1 = commandFiles; _a < commandFiles_1.length; _a++) {
        var file = commandFiles_1[_a];
        var filePath = node_path_1.default.join(commandsPath, file);
        var command = await Promise.resolve("".concat(filePath)).then(function (s) { return require(s); });
        if (!('data' in command) || !('execute' in command)) {
            throw new Error("The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
        }
        client.commands.set(command.data.name, command);
    }
}
var eventsPath = node_path_1.default.join(__dirname, 'events');
var eventFiles = node_fs_1.default.readdirSync(eventsPath).filter(function (file) { return file.endsWith('.ts'); });
var _loop_1 = function (file) {
    var filePath = node_path_1.default.join(eventsPath, file);
    var event_1 = await Promise.resolve("".concat(filePath)).then(function (s) { return require(s); });
    if (!('name' in event_1) || !('execute' in event_1)) {
        throw new Error("The event at ".concat(filePath, " is missing a required \"name\" or \"execute\" property."));
    }
    if (event_1.once) {
        client.once(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    }
    else {
        client.on(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    }
};
for (var _b = 0, eventFiles_1 = eventFiles; _b < eventFiles_1.length; _b++) {
    var file = eventFiles_1[_b];
    _loop_1(file);
}
// Log in to Discord with your client's token
client.login(process.env.token);
