module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({ activities: [{ name: 'OneTap', type: 'WATCHING' }], status: 'online' });
    console.log(`Ready!!! ${client.user.tag} is online.`);
  },
};
