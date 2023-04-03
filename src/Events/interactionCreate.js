// basic command handler for slash commands.

export default {
  name: "interactionCreate",
  async execute(client, interaction) {
    // Checking if its an interaction triggered by a slash command.
    if (interaction.isChatInputCommand()) {
      let command = client.commands.get(interaction.commandName);

      if (!command) return;

      let guildProfile = await client.db.guilds.findOne({
        guildId: interaction.guild.id,
      });

      try {
        await command.execute(client, interaction, guildProfile);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
      return guildProfile.save(); // Save the guild profile after the command has been executed.
      // Saving and updates made to it during the command execution.
    }
  },
};
