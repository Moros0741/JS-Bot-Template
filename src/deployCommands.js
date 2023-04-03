import { REST, Routes } from "discord.js";
import config from "./Data/config.js";
import fs from "node:fs";
import path from "node:path";

export default async function deploy() {
  const commands = [];
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(__dirname, "Commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  // We aren't going to use the `.toJSON()` here as we wont use builders. You are free to add it back if you want.
  // Modified code, line 16: command.data.toJSON()
  for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    commands.push(command.data);
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: "10" }).setToken(config.token);

  // and deploy your commands!
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error("DEPLOY ERROR: Failed to refresh application (/) commands...", error);
  }
}
