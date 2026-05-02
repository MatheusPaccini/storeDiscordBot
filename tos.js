const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.js');
const { TOS } = require('./messages');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    const canal = await client.channels.fetch('1492649516791496794');

    const t = TOS.embed;
    const embed = new EmbedBuilder()
        .setColor(t.color)
        .setTitle(t.title)
        .setDescription(t.description);

    await canal.send({ embeds: [embed] });
    console.log('Termos enviados!');
    client.destroy();
});

client.login(config.TOKEN);