const { EmbedBuilder } = require('discord.js');

// ─────────────────────────────────────────────────────
// Helper: cria EmbedBuilder a partir de um objeto de mensagem
// ─────────────────────────────────────────────────────
function criarEmbed(msg) {
  const embed = new EmbedBuilder()
    .setTitle(msg.title)
    .setDescription(msg.description)
    .setColor(msg.color);
  if (msg.footer) embed.setFooter({ text: msg.footer });
  if (msg.fields) embed.addFields(msg.fields);
  if (msg.timestamp !== false) embed.setTimestamp();
  return embed;
}

module.exports = { criarEmbed };
