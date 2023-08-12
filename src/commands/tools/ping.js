const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("help c bot.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Connect),
    async execute(interaction, client) {
        const { guild, member, channel } = interaction;
        console.log("start here in ping command");
    }
};
