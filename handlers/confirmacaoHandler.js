const { CONFIRMACAO, ARQUIVO } = require('../messages');
const { criarEmbed } = require('../utils/embedBuilder');
const { isStaffOuDono } = require('../utils/permissoes');
const { tickets } = require('../utils/ticketStore');

// ─────────────────────────────────────────────────────
// Staff confirma pagamento — edita a mensagem principal
// ─────────────────────────────────────────────────────
async function handleConfirmarPedido(interaction, canalId) {
  if (!isStaffOuDono(interaction)) {
    return interaction.reply({ content: CONFIRMACAO.respostas.semPermissao, flags: 64 });
  }

  const ticket = tickets.get(canalId || interaction.channelId);

  const pedidoInfo = CONFIRMACAO.pedidoFormatado(ticket?.pedido);
  const msgData = CONFIRMACAO.embed(ticket?.userId, interaction.user.id, pedidoInfo);
  const embedConfirmado = criarEmbed(msgData);

  // Edita a mensagem principal (que é a mensagem do botão clicado)
  await interaction.update({
    content: `<@${ticket?.userId}>`,
    embeds: [embedConfirmado],
    components: [], // Remove os botões
  });

  if (ticket) ticket.status = 'pago';
}

// ─────────────────────────────────────────────────────
// Staff arquiva sem confirmar — edita a mensagem principal
// ─────────────────────────────────────────────────────
async function handleArquivarTicket(interaction, canalId) {
  if (!isStaffOuDono(interaction)) {
    return interaction.reply({ content: ARQUIVO.respostas.semPermissao, flags: 64 });
  }

  const canal = interaction.channel;
  const ticket = tickets.get(canalId || interaction.channelId);

  const msgData = ARQUIVO.embed(interaction.user.id);
  const embedArquivado = criarEmbed({ ...msgData, timestamp: false });

  // Edita a mensagem principal (que é a mensagem do botão clicado)
  await interaction.update({
    content: '',
    embeds: [embedArquivado],
    components: [], // Remove os botões
  });

  setTimeout(async () => {
    try {
      if (ticket?.userId) {
        await canal.permissionOverwrites.edit(ticket.userId, { SendMessages: false });
      }
      await canal.setName(`🗃️-${canal.name.replace(/^[✅🗃️]-/, '')}`);
      if (ticket) ticket.status = 'arquivado';
    } catch (err) {
      console.error('Erro ao arquivar:', err);
    }
  }, 3000);
}

module.exports = { handleConfirmarPedido, handleArquivarTicket };
