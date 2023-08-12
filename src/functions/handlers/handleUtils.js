const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {
  client.handleUtils = async () => {
    const utilFolders = fs.readdirSync("./src/utils");
    for (const folder of utilFolders) {
      const utilFiles = fs
        .readdirSync(`./src/utils/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { utils } = client;
      for (const file of utilFiles) {
        const util = require(`../../utils/${folder}/${file}`);
        utils.set(util.data.name, util);
        console.log(`Utils: ${util.data.name} has loaded.`);
      }
      console.log(`Successfully Reloaded All Utils.`);
    }

    client.on("messageCreate", async (message) => {
      const { content, channel, member } = message;
      const args = content.trim().split(" ");
      const utilName = args.shift();
      const util = client.utils.get(utilName);

      if(util) await util.execute(client, message, args);
    });
  };
};
