const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');
const { handleInteraction } = require('./handlers/interactionHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  await handleInteraction(interaction);
});

client.login(config.TOKEN);
