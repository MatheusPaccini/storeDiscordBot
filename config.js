require('dotenv').config();

module.exports = {
  // ========================================
  // 🔑 TOKEN DO BOT
  // ========================================
  TOKEN: process.env.TOKEN,

  // ========================================
  // 🆔 ID DO SERVIDOR DISCORD
  // ========================================
  GUILD_ID: process.env.GUILD_ID,

  // ========================================
  // 🆔 ID APLICAÇÃO (Client ID)
  // ========================================
  CLIENT_ID: process.env.CLIENT_ID,

  // ========================================
  // 👤 ID NO DISCORD (para receber notificações de pedidos)
  // ========================================
  DONO_ID: process.env.DONO_ID,

  // ========================================
  // 🛡️ IDs CARGOS
  // (clique direito no cargo > copiar ID)
  // ========================================
  STAFF_CARGO_ID: process.env.STAFF_CARGO_ID,
  SUPORTE_CARGO_ID: process.env.SUPORTE_CARGO_ID,
  DONO_CARGO_ID: process.env.DONO_CARGO_ID,
  CLIENTE_CARGO_ID: process.env.CLIENTE_CARGO_ID,

  // ========================================
  // 📂 ID DA CATEGORIA onde os tickets serão criados
  // (clique direito na categoria > copiar ID)
  // ========================================
  CATEGORIA_TICKETS_ID: process.env.CATEGORIA_TICKETS_ID,
  CATEGORIA_AJUDA_ID: process.env.CATEGORIA_AJUDA_ID,

  // ========================================
  // 💰 CHAVE PIX
  // ========================================
  CHAVE_PIX: process.env.CHAVE_PIX,

  // ========================================
  // 💎 PREÇO DO ROBUX
  // ========================================
  ROBUX_BASE: 1000, // base de cálculo (1000 robux)

  GAMEPASS: {
    preco: 40,   // R$ por ROBUX_BASE robux (com taxa de 30%)
    taxa: true,  // aplica taxa do Roblox (x / 0.7)
  },

  GRUPO: {
    preco: 37,   // R$ por ROBUX_BASE robux (sem taxa)
    taxa: false, // sem taxa
  },
};