import config from "../Data/config.js";

export default {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(
      ">>> Ready! Logged into Discord as:",
      "    Username: " + client.user.username,
      "    Tag: " + client.user.tag,
      "    ID: " + client.user.id
    );

    if (config.activity === undefined) {
      await client.user.setActivity({
        name: "Slash Commands",
        type: "LISTENING",
      });
      console.log(
        ">>> Activity Set to Default:",
        "    Name: Slash Commands",
        "    Type: LISTENING"
      );
    } else {
      await client.user.setActivity({
        name: config.activity.name,
        type: config.activity.type,
      });
      console.log(
        ">>> Activity Set to Custom:",
        "    Name: " + config.activity.name,
        "    Type: " + config.activity.type
      );
    }

    if (config.status === undefined) {
      await client.user.setStatus("online");
      console.log(">>> Status Set to Default:", "		Status: online");
    } else {
      await client.user.setStatus(config.status);
      console.log(">>> Status Set to Custom:", "    Status: " + config.status);
    }
  },
};
