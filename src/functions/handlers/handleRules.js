const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const { prefix } = process.env;

module.exports = (client) => {
  client.handleRules = async () => {
    const ruleFolders = fs.readdirSync("./src/rules");
    for (const folder of ruleFolders) {
      const ruleFiles = fs
        .readdirSync(`./src/rules/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { rules } = client;
      for (const file of ruleFiles) {
        const rule = require(`../../rules/${folder}/${file}`);
        rules.set(rule.data.name, rule);
        console.log(`Rules: ${rule.data.name} has loaded.`);
      }
      console.log(`Successfully reloaded prefix (${prefix}) rules.`);
    }

    client.on("messageCreate", async (message) => {
      const { content, channel, member } = message;
      if (content.startsWith(prefix)) {
        const args = content.slice(prefix.length).trim().split(" ");
        const ruleName = args.shift();
        const rule = client.rules.get(ruleName);
        if (!rule) {
          message.delete();
          const sendMessage = await channel.send({
            content: `<@${member.id}>`,
            embeds: [
              new EmbedBuilder()
                .setColor(0xff0000)
                .setDescription("This Command is incorrect or doesn't exist!"),
            ],
          });
          setTimeout(()=>{
            sendMessage.delete();
          },20000);
        }
        else{
            await rule.execute(client, message, args);
        }
      }
    });
  };
};
