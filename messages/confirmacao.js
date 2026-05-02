const config = require('../config');
const { CORES } = require('./cores');

// ══════════════════════════════════════════════════════
// CONFIRMACAO — staff confirma pagamento
// ══════════════════════════════════════════════════════
const CONFIRMACAO = {
  embed: (userId, staffId, pedidoInfo) => ({
    title: '✅ Pagamento Confirmado!',
    description:
      `Olá, <@${userId}>! Seu pagamento foi confirmado por <@${staffId}>.\n\n` +
      `**Pedido:** ${pedidoInfo}\n\n` +
      `O pagamento em Robux será realizado em **até 24 horas**.\n\n` +
      `Fique à vontade neste ticket. Nossa staff entrará em contato assim que os Robux forem enviados.\n` +
      `Precisa de ajuda? Mencione <@&${config.STAFF_CARGO_ID}>.`,
    color: CORES.SUCESSO,
    footer: 'Altea Store • Obrigado pela preferência! ❤️',
  }),

  pedidoFormatado: (pedido) =>
    pedido
      ? `**${pedido.robux.toLocaleString('pt-BR')} Robux** — Gamepass: **${pedido.gamepass?.toLocaleString('pt-BR')} Robux**`
      : 'seu pedido',

  respostas: {
    semPermissao: '❌ Apenas a staff pode confirmar pedidos.',
  },
};

// ══════════════════════════════════════════════════════
// PAGO — /pago (entrega finalizada + DM)
// ══════════════════════════════════════════════════════
const PAGO = {
  embedFinal: (userId) => ({
    title: 'Robux Enviados!',
    description:
      `Olá, <@${userId}>!\n\n` +
      `Os Robux foram enviados com sucesso pela nossa equipe! ✅\n\n` +
      `O Robux leva **5 dias úteis** para aparecer na sua conta do Roblox — isso é normal e faz parte do processo do próprio Roblox.\n\n` +
      `**Muito obrigado por escolher a Altea Store!** Sua confiança é muito importante para nós.\n` +
      `**Não esqueça de nos avaliar em https://discord.com/channels/1485763296060772576/1494795162948337826!💜**\n` +
      `Esperamos te ver em breve novamente.\n\n` +
      `*Este ticket será encerrado em instantes.*`,
    color: CORES.DESTAQUE,
    footer: 'Altea Store • Obrigado pela preferência! ❤️',
  }),

  dm: {
    title: 'Seu pedido foi entregue! — Altea Store',
    description:
      `Olá! Sua compra na **Altea Store** foi concluída com sucesso. ✅\n\n` +
      `O Robux leva **5 dias úteis** para aparecer na sua conta — isso é totalmente normal e depende do processamento do Roblox.\n\n` +
      `**Muito obrigado por escolher a Altea Store!**\n` +
      `**Não esqueça de nos avaliar em https://discord.com/channels/1485763296060772576/1494795162948337826!💜**\n` +
      `Sua confiança nos motiva a sempre oferecer o melhor atendimento.\n\n` +
      `Volte sempre que precisar!\n` +
      `Qualquer dúvida, abra um novo ticket no nosso servidor.`,
    color: CORES.DESTAQUE,
    footer: 'Altea Store • Obrigado pela preferência! ❤️',
  },

  respostas: {
    encerrando: '⏳ Encerrando ticket...',
    semPermissao: '❌ Apenas a staff pode usar este comando.',
    naoETicket: '❌ Este canal não é um ticket ativo.',
    donoNaoEncontrado: '❌ Não foi possível identificar o dono deste ticket.',
  },
};

// ══════════════════════════════════════════════════════
// ARQUIVO — arquivar ticket sem confirmar
// ══════════════════════════════════════════════════════
const ARQUIVO = {
  embed: (staffId) => ({
    title: 'Ticket Arquivado',
    description: `Ticket arquivado por <@${staffId}>.`,
    color: CORES.NEUTRO,
  }),

  respostas: {
    semPermissao: '❌ Apenas a staff pode arquivar tickets.',
  },
};

module.exports = { CONFIRMACAO, PAGO, ARQUIVO };
