const config = require('../config');
const { CORES } = require('./cores');

// ══════════════════════════════════════════════════════
// TICKET — criação e mensagem de boas-vindas
// ══════════════════════════════════════════════════════
const TICKET = {
  bemVindo: (userId, nickRoblox) => ({
    title: 'Ticket Aberto — Altea Store',
    description:
      `Olá, <@${userId}>! Seja bem-vindo à **Altea Store**.\n\n` +
      `**Usuário Roblox:** \`${nickRoblox}\`\n\n` +
      `Precisa de ajuda? Mencione um <@&${config.STAFF_CARGO_ID}>!\n\n` +
      `Compre robux clicando no botão abaixo 👇`,
    color: CORES.PRIMARIA,
    footer: 'Altea Store • Atendimento seguro e rápido',
  }),

  bemVindoAjuda: (userId) => ({
    title: 'Ticket de Ajuda — Altea Store',
    description:
      `Olá, <@${userId}>! Você abriu um ticket de **ajuda**.\n\n` +
      `Descreva sua dúvida ou problema abaixo e um <@&${config.SUPORTE_CARGO_ID}> irá te atender em breve!`,
    color: CORES.PRIMARIA,
    footer: 'Altea Store • Suporte ao Cliente',
  }),

  botaoCatalogo: { label: 'Comprar Robux', emoji: '💸' },

  notificacaoDono: (userTag, nickRoblox, canalId) => ({
    title: 'Novo Ticket Aberto',
    description:
      `**Cliente:** ${userTag}\n` +
      `**Roblox:** \`${nickRoblox}\`\n` +
      `**Canal:** <#${canalId}>`,
    color: CORES.PRIMARIA,
  }),

  respostas: {
    criando: '⏳ Criando seu ticket...',
    criado: (canalId) => `✅ Ticket criado! Acesse: <#${canalId}>`,
    jaAberto: (canalId) => `❌ Você já tem um ticket aberto! Veja: <#${canalId}>`,
    erroCriar: '❌ Erro ao criar o ticket. Verifique as permissões do bot.',
  },
};

// ══════════════════════════════════════════════════════
// CATALOGO — catálogo de robux
// ══════════════════════════════════════════════════════
const CATALOGO = {
  embed: (tipo) => {
    const isGamepass = tipo === 'gamepass';
    const cfg = isGamepass ? config.GAMEPASS : config.GRUPO;
    return {
      title: isGamepass ? 'Catálogo — Robux por Gamepass' : 'Catálogo — Robux por Grupo',
      description: 'Escolha como quer informar a quantidade:',
      fields: [{
        name: '💎 Robux',
        value: isGamepass
          ? `**Preço:** R$ ${cfg.preco},00 / ${config.ROBUX_BASE} Robux\n> 1.000 Robux = R$ ${cfg.preco},00\n> 2.000 Robux = R$ ${cfg.preco * 2},00\n\n⚠️ Já inclui taxa de 30% do Roblox`
          : `**Preço:** R$ ${cfg.preco},00 / ${config.ROBUX_BASE} Robux\n> 1.000 Robux = R$ ${cfg.preco},00\n> 2.000 Robux = R$ ${cfg.preco * 2},00\n\n✅ Enviado pelo grupo — **depositado instantaneamente**.`,
      }],
      color: CORES.PRIMARIA,
      footer: 'Altea Store',
    };
  },

  botoes: {
    porRobux: { label: '💎 Quero X Robux' },
    porReais: { label: '💰 Quero pagar R$X' },
  },
};

// ══════════════════════════════════════════════════════
// PEDIDO — modais de pedido + resumo
// ══════════════════════════════════════════════════════
const PEDIDO = {
  modalRobux: {
    titulo: 'Quantidade de Robux',
    label: 'Quantos Robux você quer?',
    placeholder: 'Ex: 1000',
  },

  modalReais: {
    titulo: 'Valor em Reais',
    label: 'Quanto você quer pagar? (em R$)',
    placeholder: 'Ex: 37',
  },

  resumo: (robux, reais, gamepass, nickRoblox) => {
    const fields = [
      { name: '💎 Robux que você recebe', value: `**${robux.toLocaleString('pt-BR')} Robux**`, inline: true },
      { name: '💰 Valor a pagar', value: `**R$ ${reais.toFixed(2).replace('.', ',')}**`, inline: true },
    ];

    if (gamepass) {
      fields.push({
        name: 'Valor da Gamepass no Roblox',
        value: `**${gamepass.toLocaleString('pt-BR')} Robux**\n*(já inclui a taxa de 30% do Roblox)*`,
        inline: false,
      });
    }

    fields.push(
      { name: 'Chave PIX', value: `\`\`\`${config.CHAVE_PIX}\`\`\`` },
      {
        name: 'Como funciona',
        value: gamepass
          ? '1. Realize o pagamento via PIX\n2. Envie o comprovante aqui\n3. Envie o link da sua gamepass\n4. Nossa staff confirmará o valor da gamepass\n5. Seu Robux cairá na conta!'
          : '1. Realize o pagamento via PIX\n2. Envie o comprovante aqui\n3. Nossa staff confirmará e enviará os Robux pelo grupo!',
      },
    );

    return {
      title: 'Resumo do Pedido',
      description:
        'Confira os detalhes abaixo e realize o pagamento via PIX.\n' +
        `**Roblox:** \`${nickRoblox}\`\n`,
      fields,
      color: CORES.PRIMARIA,
      footer: 'Altea Store • Aguardando pagamento',
    };
  },

  botoesStaff: {
    confirmar: { label: '✅ Confirmar Pagamento' },
    arquivar: { label: '🗃️ Arquivar sem Confirmar' },
  },

  respostas: {
    registrado: '✅ Pedido registrado! Veja o resumo acima.',
    robuxInvalido: '❌ Quantidade inválida. Digite apenas números. Ex: 1000',
    reaisInvalido: '❌ Valor inválido. Digite apenas números. Ex: 37',
  },

  contentMencao: (userId) =>
    `<@${userId}> | <@&${config.STAFF_CARGO_ID}> novo pedido aguardando confirmação!`,
};

module.exports = { TICKET, CATALOGO, PEDIDO };
