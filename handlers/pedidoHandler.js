const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const config = require('../config');
const { PEDIDO } = require('../messages');
const { criarEmbed } = require('../utils/embedBuilder');
const { calcularPedido } = require('../utils/calculos');
const { tickets } = require('../utils/ticketStore');

// ─────────────────────────────────────────────────────
// Botão "Quero X Robux" → modal só com campo de robux
// ─────────────────────────────────────────────────────
async function handlePedidoPorRobux(interaction) {
  const m = PEDIDO.modalRobux;
  const modal = new ModalBuilder()
    .setCustomId('modal_por_robux')
    .setTitle(m.titulo);

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('quantidade_robux')
        .setLabel(m.label)
        .setPlaceholder(m.placeholder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )
  );

  await interaction.showModal(modal);
}

// ─────────────────────────────────────────────────────
// Botão "Quero pagar R$X" → modal só com campo de reais
// ─────────────────────────────────────────────────────
async function handlePedidoPorReais(interaction) {
  const m = PEDIDO.modalReais;
  const modal = new ModalBuilder()
    .setCustomId('modal_por_reais')
    .setTitle(m.titulo);

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('valor_reais')
        .setLabel(m.label)
        .setPlaceholder(m.placeholder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )
  );

  await interaction.showModal(modal);
}

// ─────────────────────────────────────────────────────
// Helper: monta e envia/edita o resumo do pedido
// ─────────────────────────────────────────────────────
async function enviarResumoPedido(interaction, robux, reais, gamepass) {
  const ticket = tickets.get(interaction.channelId);
  if (ticket) ticket.pedido = { robux, reais, gamepass };

  const nickRoblox = ticket?.nickRoblox;
  const msgData = PEDIDO.resumo(robux, reais, gamepass, nickRoblox);
  const embed = criarEmbed(msgData);

  const rowStaff = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`confirmar_pedido:${interaction.channelId}`)
      .setLabel(PEDIDO.botoesStaff.confirmar.label)
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`arquivar_ticket:${interaction.channelId}`)
      .setLabel(PEDIDO.botoesStaff.arquivar.label)
      .setStyle(ButtonStyle.Secondary),
  );

  // Edita a mensagem principal em vez de enviar novas mensagens
  if (ticket?.mensagemPrincipalId) {
    try {
      const mensagemPrincipal = await interaction.channel.messages.fetch(ticket.mensagemPrincipalId);
      await mensagemPrincipal.edit({
        content: PEDIDO.contentMencao(ticket.userId),
        embeds: [embed],
        components: [rowStaff],
      });
      // Responde ao modal de forma invisível
      await interaction.reply({ content: PEDIDO.respostas.registrado, flags: 64 });
    } catch (err) {
      console.error('Erro ao editar mensagem principal:', err);
      // Fallback: envia normalmente se não conseguir editar
      await interaction.reply({ embeds: [embed], components: [rowStaff] });
    }
  } else {
    // Fallback caso não tenha a mensagem principal salva
    await interaction.reply({ embeds: [embed], components: [rowStaff] });
  }
}

// ─────────────────────────────────────────────────────
// Modal por Robux enviado
// ─────────────────────────────────────────────────────
async function handleModalPorRobux(interaction) {
  const qRobux = interaction.fields.getTextInputValue('quantidade_robux').trim();
  const robux = parseInt(qRobux);

  if (isNaN(robux) || robux <= 0) {
    return interaction.reply({ content: PEDIDO.respostas.robuxInvalido, flags: 64 });
  }

  const tipo = tickets.get(interaction.channelId)?.tipo ?? 'gamepass';
  const { reais, gamepass } = calcularPedido(robux, 0, true, tipo);
  await enviarResumoPedido(interaction, robux, reais, gamepass);
}

// ─────────────────────────────────────────────────────
// Modal por Reais enviado
// ─────────────────────────────────────────────────────
async function handleModalPorReais(interaction) {
  const qReais = interaction.fields.getTextInputValue('valor_reais').trim();
  const reais = parseFloat(qReais.replace(',', '.'));

  if (isNaN(reais) || reais <= 0) {
    return interaction.reply({ content: PEDIDO.respostas.reaisInvalido, flags: 64 });
  }

  const tipo = tickets.get(interaction.channelId)?.tipo ?? 'gamepass';
  const { robux, gamepass } = calcularPedido(0, reais, false, tipo);
  await enviarResumoPedido(interaction, robux, reais, gamepass);
}

module.exports = {
  handlePedidoPorRobux,
  handlePedidoPorReais,
  handleModalPorRobux,
  handleModalPorReais,
};
