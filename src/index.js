require("dotenv").config();
const { token } = process.env;
const { Client, Collection } = require("discord.js");
const fs = require("fs");
// const cron = require('node-cron');


const client = new Client({ intents: 3276799 });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];
client.rules = new Collection();
client.utils = new Collection();

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.handleRules();
client.handleUtils();
client.handleComponents();
// the login bot here.
client.login(token);



