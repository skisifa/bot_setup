const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name:"ping"
    },
    async execute(client, message, args) {
        const { guild, member, channel } = message;
        console.log("start here in ping utils");
    }
};