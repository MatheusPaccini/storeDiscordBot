const { CORES } = require('./cores');

// ══════════════════════════════════════════════════════
// PAINEL — /painel (embed + botões)
// ══════════════════════════════════════════════════════
const PAINEL = {
  embed: {
    title: 'Comprar Robux',
    description: 'Adquira Robux de forma rápida, fácil e segura.\n\n**Você deseja comprar Robux por:**',
    image: 'https://i.imgur.com/MK52Hyb.png',
    footer: '‼️ Está com dúvidas ou passando por problemas? Contate a staff responsável!',
    color: CORES.PRIMARIA,
  },

  botoes: {
    gamepass: { label: 'Gamepass', emoji: '🎮' },
    grupo: { label: 'Grupo', emoji: '👥' },
  },

  respostas: {
    enviado: '✅ Painel enviado!',
    semPermissao: '❌ Apenas o Dono pode usar este comando.',
  },

  modal: {
    titulo: 'Informe seu usuário do Roblox',
    label: 'Seu nome de usuário no Roblox',
    placeholder: 'Ex: PlayerRoblox123',
  },
};

module.exports = { PAINEL };
