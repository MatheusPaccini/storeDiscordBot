// ─────────────────────────────────────────────────────
// Armazena todos os tickets abertos (em memória)
// Futuramente pode ser trocado por SQLite/JSON
// ─────────────────────────────────────────────────────
const tickets = new Map();

module.exports = tickets;
