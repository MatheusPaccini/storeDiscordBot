// ─────────────────────────────────────────────────────
// Armazena todos os tickets abertos (em memória)
// Futuramente pode ser trocado por SQLite/JSON
// ─────────────────────────────────────────────────────
const tickets = new Map();
let ticketCounter = 0;

module.exports = {
  tickets,
  getTicketCount: () => {
    ticketCounter++;
    return ticketCounter;
  }
};
