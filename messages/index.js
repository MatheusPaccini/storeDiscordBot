// ══════════════════════════════════════════════════════
// Re-exporta todas as mensagens para backward compatibility
// Qualquer require('../messages') continua funcionando
// ══════════════════════════════════════════════════════
const { CORES } = require('./cores');
const { PAINEL } = require('./painel');
const { TICKET, CATALOGO, PEDIDO } = require('./ticket');
const { CONFIRMACAO, PAGO, ARQUIVO } = require('./confirmacao');
const { CALCULADORA } = require('./calculadora');
const { TOS } = require('./tos');
const { ERROS } = require('./erros');

module.exports = {
  CORES,
  PAINEL,
  TICKET,
  CATALOGO,
  PEDIDO,
  CONFIRMACAO,
  PAGO,
  ARQUIVO,
  CALCULADORA,
  TOS,
  ERROS,
};
