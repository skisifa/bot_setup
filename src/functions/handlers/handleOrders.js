const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const { prefix } = process.env;


module.exports = (client) => {
    client.handleOrders = async () => {
        const orderFiles = fs.readdirSync("./src/orders").filter((file) => file.endsWith(".js"));
        for (const file of orderFiles) {
            const order = require(`../../orders/${file}`);
            client.orders.set(order.data.name, order);
            console.log(`Order: ${order.data.name} has loaded.`);
        }
        console.log(
            `Successfully reloaded prefix (${prefix}) orders.`,
          );

        client.on("messageCreate", async (message)=>{
            const { content, channel } = message;
            if(content.startsWith(".v")){

                const args = content.slice(prefix.length).trim().split(" ");
                const orderName = args.shift();
                const order = client.orders.get(orderName);
              
                if(!order) return await message.reply({embeds:[
                    new EmbedBuilder()
                    .setColor(0xff0000)
                    .setDescription("This command is incorrect or doesn't exist!")
                ], ephemeral: true});

                await order.data.execute(client, message, args);
            }
        });



    }
}