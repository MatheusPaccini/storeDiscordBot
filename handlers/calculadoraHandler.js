const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const { CALCULADORA } = require('../messages');
const { criarEmbed } = require('../utils/embedBuilder');
const { calcularPedido } = require('../utils/calculos');
const { isDonoCargo } = require('../utils/permissoes');

// ─────────────────────────────────────────────────────
// /calcular — envia o painel fixo com 2 botões
// ─────────────────────────────────────────────────────
async function handleCalcular(interaction) {
  if (!isDonoCargo(interaction.member)) {
    return interaction.reply({ content: CALCULADORA.respostas.semPermissao, flags: 64 });
  }

  const p = CALCULADORA.painelEmbed;
  const embed = criarEmbed(p);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('calc_tipo:gamepass')
      .setLabel(CALCULADORA.botoesPainel.gamepass.label)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('calc_tipo:grupo')
      .setLabel(CALCULADORA.botoesPainel.grupo.label)
      .setStyle(ButtonStyle.Success),
  );

  await interaction.reply({ content: CALCULADORA.respostas.enviado, flags: 64 });
  await interaction.channel.send({ embeds: [embed], components: [row] });
}

// ─────────────────────────────────────────────────────
// Cliente clicou em um dos botões do painel
// Resposta ephemeral com os botões de X Robux / X Reais
// ─────────────────────────────────────────────────────
async function handleCalcTipo(interaction, tipo) {
  const msgData = CALCULADORA.tipoEmbed(tipo);
  const embed = criarEmbed({ ...msgData, timestamp: false });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`calc_robux:${tipo}`)
      .setLabel(CALCULADORA.botoesTipo.robux.label)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`calc_reais:${tipo}`)
      .setLabel(CALCULADORA.botoesTipo.reais.label)
      .setStyle(ButtonStyle.Success),
  );

  // Ephemeral — só o cliente que clicou vê
  await interaction.reply({ embeds: [embed], components: [row], flags: 64 });
}

// ─────────────────────────────────────────────────────
// Botão "Tenho X Robux" → abre modal
// ─────────────────────────────────────────────────────
async function handleCalcPorRobux(interaction, tipo) {
  const m = CALCULADORA.modalRobux;
  const modal = new ModalBuilder()
    .setCustomId(`modal_calc_robux:${tipo}`)
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
// Botão "Tenho X reais" → abre modal
// ─────────────────────────────────────────────────────
async function handleCalcPorReais(interaction, tipo) {
  const m = CALCULADORA.modalReais;
  const modal = new ModalBuilder()
    .setCustomId(`modal_calc_reais:${tipo}`)
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
// Modal por Robux enviado
// ─────────────────────────────────────────────────────
async function handleModalCalcRobux(interaction, tipo) {
  const qRobux = interaction.fields.getTextInputValue('quantidade_robux').trim();
  const robux = parseInt(qRobux);

  if (isNaN(robux) || robux <= 0) {
    return interaction.reply({ content: CALCULADORA.respostas.robuxInvalido, flags: 64 });
  }

  const { reais, gamepass } = calcularPedido(robux, 0, true, tipo);

  const msgData = CALCULADORA.resultado(tipo, robux, reais, gamepass);
  await interaction.reply({
    embeds: [criarEmbed(msgData)],
    flags: 64,
  });
}

// ─────────────────────────────────────────────────────
// Modal por Reais enviado
// ─────────────────────────────────────────────────────
async function handleModalCalcReais(interaction, tipo) {
  const qReais = interaction.fields.getTextInputValue('valor_reais').trim();
  const reais = parseFloat(qReais.replace(',', '.'));

  if (isNaN(reais) || reais <= 0) {
    return interaction.reply({ content: CALCULADORA.respostas.reaisInvalido, flags: 64 });
  }

  const { robux, gamepass } = calcularPedido(0, reais, false, tipo);

  const msgData = CALCULADORA.resultado(tipo, robux, reais, gamepass);
  await interaction.reply({
    embeds: [criarEmbed(msgData)],
    flags: 64,
  });
}

module.exports = {
  handleCalcular,
  handleCalcTipo,
  handleCalcPorRobux,
  handleCalcPorReais,
  handleModalCalcRobux,
  handleModalCalcReais,
};