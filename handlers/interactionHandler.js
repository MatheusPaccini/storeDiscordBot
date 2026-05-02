const { handlePainel, handleAbrirTicket } = require('./painelHandler');
const { handleModalRoblox, handleCatalogo } = require('./ticketHandler');
const {
  handlePedidoPorRobux,
  handlePedidoPorReais,
  handleModalPorRobux,
  handleModalPorReais,
} = require('./pedidoHandler');
const { handleConfirmarPedido, handleArquivarTicket } = require('./confirmacaoHandler');
const { handlePago } = require('./pagoHandler');
const {
  handleCalcular,
  handleCalcTipo,
  handleCalcPorRobux,
  handleCalcPorReais,
  handleModalCalcRobux,
  handleModalCalcReais,
} = require('./calculadoraHandler');
const { ERROS } = require('../messages');

async function handleInteraction(interaction) {
  try {

    // ── Slash commands ──────────────────────────────
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'painel') await handlePainel(interaction);
      if (interaction.commandName === 'pago') await handlePago(interaction);
      if (interaction.commandName === 'calcular') await handleCalcular(interaction);
      return;
    }

    // ── Botões ──────────────────────────────────────
    if (interaction.isButton()) {
      const [acao, ...args] = interaction.customId.split(':');

      if (acao === 'abrir_ticket') return await handleAbrirTicket(interaction, args[0]);
      if (acao === 'catalogo') return await handleCatalogo(interaction);
      if (acao === 'pedido_por_robux') return await handlePedidoPorRobux(interaction);
      if (acao === 'pedido_por_reais') return await handlePedidoPorReais(interaction);
      if (acao === 'confirmar_pedido') return await handleConfirmarPedido(interaction, args[0]);
      if (acao === 'arquivar_ticket') return await handleArquivarTicket(interaction, args[0]);
      if (acao === 'calc_tipo') return await handleCalcTipo(interaction, args[0]);
      if (acao === 'calc_robux') return await handleCalcPorRobux(interaction, args[0]);
      if (acao === 'calc_reais') return await handleCalcPorReais(interaction, args[0]);
    }

    // ── Modais ──────────────────────────────────────
    if (interaction.isModalSubmit()) {
      const [customId, tipo] = interaction.customId.split(':');

      if (customId === 'modal_roblox') return await handleModalRoblox(interaction);
      if (customId === 'modal_por_robux') return await handleModalPorRobux(interaction);
      if (customId === 'modal_por_reais') return await handleModalPorReais(interaction);
      if (customId === 'modal_calc_robux') return await handleModalCalcRobux(interaction, tipo);
      if (customId === 'modal_calc_reais') return await handleModalCalcReais(interaction, tipo);
    }

  } catch (error) {
    console.error('Erro na interação:', error);
    try {
      const msg = { content: ERROS.geral, flags: 64 };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(msg);
      } else {
        await interaction.reply(msg);
      }
    } catch (_) { }
  }
}

module.exports = { handleInteraction };