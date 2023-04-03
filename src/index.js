import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import fs from 'fs';
import config from "./Data/config.js";
import mongoose from "mongoose";
import deploy from "./deployCommands.js";

// Deploying commands to Discord.
deploy()
	.then(() => {})
	.catch((err) => {});

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers, // Requires Privileged Gateway Intents enabled on the Developer Portal https://discord.com/developers/applications
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent, // Requires Privileged Gateway Intents enabled on the Developer Portal https://discord.com/developers/applications
		GatewayIntentBits.GuildPresences, // Requires Privileged Gateway Intents enabled on the Developer Portal https://discord.com/developers/applications
	],
	partials: [
		Partials.User,
		Partials.GuildMember,
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
	],
});

client.commands = new Collection();
client.owners = config.owners; // Sudo users for the bot.
client.generateId = () => {
	return uid();
};

// Can remove if not using Mongodb or Schemas.
client.db = {
	// eslint-disable-next-line no-unused-vars
	guilds: import("./Models/guildSchema.js"),
	// eslint-disable-next-line no-unused-vars
	users: import("./Models/userSchema.js"),
};

// Loading commands from the "/Commands" directory.
const cmdFiles = fs
	.readdirSync('./Commands')
	.filter((file) => file.endsWith('.js'));

for (const file of cmdFiles) {
	const command = await import(`./Commands/${file}`);
	client.commands.set(command.data.name, command);
};

// Loading events from the "/Events" directory.
const evtFiles = fs
	.readdirSync('./Events')
	.filter((file) => file.endsWith('.js'));

for (const file of evtFiles) {
	const event = await import(`./Events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	};
};

// Connecting to MongoDB through mongo.
mongoose
	.set("strictQuery", true) // Required for v7+ of mongoose.
	.connect(config.database_srv, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => {
		console.log("[DB ERROR]: Failed to connect to MongoDB", err);
		process.exit(1);
	});

	try {
		client.login(config.token);
	} catch (err) {
		console.log("[ERROR]: Failed to login to Discord", err);
	};