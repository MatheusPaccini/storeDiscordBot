const config = require('../config');
const { CORES } = require('./cores');

// ══════════════════════════════════════════════════════
// CALCULADORA — /calcular
// ══════════════════════════════════════════════════════
const CALCULADORA = {
  painelEmbed: {
    title: 'Calculadora de Preços — Altea Store',
    description:
      'Simule o valor da sua compra antes de abrir um ticket!\n\n' +
      'Como deseja calcular? Escolha o tipo abaixo 👇',
    fields: [
      {
        name: '🎮 Robux por Gamepass',
        value: `R$ ${config.GAMEPASS.preco},00 por ${config.ROBUX_BASE} Robux\n*(cai em até 5 dias úteis)*`,
        inline: true,
      },
      {
        name: '👥 Robux por Grupo',
        value: `R$ ${config.GRUPO.preco},00 por ${config.ROBUX_BASE} Robux\n*(cai instantaneamente)*`,
        inline: true,
      },
    ],
    color: CORES.INFO,
    footer: 'Altea Store • Apenas simulação, sem compromisso',
  },

  botoesPainel: {
    gamepass: { label: '🎮 Robux por Gamepass' },
    grupo: { label: '👥 Robux por Grupo' },
  },

  tipoEmbed: (tipo) => {
    const cfg = tipo === 'gamepass' ? config.GAMEPASS : config.GRUPO;
    const label = tipo === 'gamepass' ? 'Gamepass' : 'Grupo';
    return {
      title: `Calculadora — Robux por ${label}`,
      description: 'Como você quer calcular o valor?',
      fields: [{
        name: 'Preço',
        value: `R$ ${cfg.preco},00 por ${config.ROBUX_BASE} Robux${tipo === 'gamepass' ? '\n*(cai em até 5 dias úteis)*' : ''}`,
      }],
      color: tipo === 'gamepass' ? CORES.GAMEPASS : CORES.GRUPO,
    };
  },

  botoesTipo: {
    robux: { label: '💎 Tenho X Robux em mente' },
    reais: { label: '💰 Tenho X reais em mente' },
  },

  modalRobux: {
    titulo: 'Quantos Robux você quer?',
    label: 'Quantidade de Robux',
    placeholder: 'Ex: 1000',
  },

  modalReais: {
    titulo: 'Quanto você quer pagar?',
    label: 'Valor em R$',
    placeholder: 'Ex: 40',
  },

  resultado: (tipo, robux, reais, gamepass) => {
    const isGamepass = tipo === 'gamepass';
    const label = isGamepass ? 'Gamepass' : 'Grupo';

    const fields = [
      { name: '💎 Robux que você receberia', value: `**${robux.toLocaleString('pt-BR')} Robux**`, inline: true },
      { name: '💰 Valor a pagar', value: `**R$ ${reais.toFixed(2).replace('.', ',')}**`, inline: true },
    ];

    if (gamepass) {
      fields.push({
        name: 'Valor da Gamepass no Roblox',
        value: `**${gamepass.toLocaleString('pt-BR')} Robux**\n*(cai em 5 dias úteis)*`,
        inline: false,
      });
    }

    fields.push({
      name: 'Quer comprar?',
      value: 'Abra um ticket no canal de vendas para ser atendido pela nossa equipe!',
    });

    return {
      title: `Simulação — Robux por ${label}`,
      description: 'Resultado da sua simulação:',
      fields,
      color: isGamepass ? CORES.GAMEPASS : CORES.GRUPO,
      footer: 'Altea Store • Apenas simulação, sem compromisso!',
    };
  },

  respostas: {
    enviado: '✅ Painel enviado!',
    semPermissao: '❌ Apenas o Dono pode usar este comando.',
    robuxInvalido: '❌ Quantidade inválida. Ex: 1000',
    reaisInvalido: '❌ Valor inválido. Ex: 40',
  },
};

module.exports = { CALCULADORA };
