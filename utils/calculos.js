const config = require('../config');

// ─────────────────────────────────────────────────────
// Calcula robux, reais e gamepass a partir de qualquer entrada
// ─────────────────────────────────────────────────────
function calcularPedido(robux = 0, reais = 0, porRobux = true, tipo = 'gamepass') {
  const cfg = tipo === 'gamepass' ? config.GAMEPASS : config.GRUPO;

  if (porRobux) {
    reais = (robux / config.ROBUX_BASE) * cfg.preco;
  } else {
    robux = Math.floor((reais / cfg.preco) * config.ROBUX_BASE);
  }

  const gamepass = cfg.taxa ? Math.ceil(robux / 0.7) : null;
  return { robux, reais, gamepass };
}

module.exports = { calcularPedido };
