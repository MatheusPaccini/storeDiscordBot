const config = require('../config');

// ─────────────────────────────────────────────────────
// Checks de permissão reutilizáveis
// ─────────────────────────────────────────────────────

function isStaff(member) {
  return member.roles.cache.has(config.STAFF_CARGO_ID);
}

function isDono(userId) {
  return userId === config.DONO_ID;
}

function isStaffOuDono(interaction) {
  return isStaff(interaction.member) || isDono(interaction.user.id);
}

function isDonoCargo(member) {
  return member.roles.cache.has(config.DONO_CARGO_ID);
}

module.exports = { isStaff, isDono, isStaffOuDono, isDonoCargo };
