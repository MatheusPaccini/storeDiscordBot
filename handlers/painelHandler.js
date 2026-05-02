const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { PAINEL } = require('../messages');
const { isDonoCargo } = require('../utils/permissoes');

async function handlePainel(interaction) {
  if (!isDonoCargo(interaction.member)) {
    return interaction.reply({ content: PAINEL.respostas.semPermissao, flags: 64 });
  }

  const p = PAINEL.embed;
  const embed = new EmbedBuilder()
    .setColor(p.color)
    .setTitle(p.title)
    .setDescription(p.description)
    .setImage(p.image)
    .setFooter({ text: p.footer });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('abrir_ticket:gamepass')
      .setLabel(PAINEL.botoes.gamepass.label)
      .setEmoji(PAINEL.botoes.gamepass.emoji)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('abrir_ticket:grupo')
      .setLabel(PAINEL.botoes.grupo.label)
      .setEmoji(PAINEL.botoes.grupo.emoji)
      .setStyle(ButtonStyle.Success)
  );

  await interaction.reply({ content: PAINEL.respostas.enviado, flags: 64 });
  await interaction.channel.send({ embeds: [embed], components: [row] });
}

async function handleAbrirTicket(interaction, tipo) {
  const m = PAINEL.modal;
  const modal = new ModalBuilder()
    .setCustomId(`modal_roblox:${tipo}`)
    .setTitle(m.titulo);

  const input = new TextInputBuilder()
    .setCustomId('nick_roblox')
    .setLabel(m.label)
    .setPlaceholder(m.placeholder)
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(3)
    .setMaxLength(20);

  modal.addComponents(new ActionRowBuilder().addComponents(input));
  await interaction.showModal(modal);
}

module.exports = { handlePainel, handleAbrirTicket };