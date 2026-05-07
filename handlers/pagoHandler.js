const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config');
const { PAGO } = require('../messages');
const { criarEmbed } = require('../utils/embedBuilder');
const { isStaffOuDono } = require('../utils/permissoes');
const { tickets } = require('../utils/ticketStore');

// ─────────────────────────────────────────────────────
// Helper: encontra o userId dono do ticket pelo canal
// (busca nas permissões do canal quem NÃO é bot/everyone/staff)
// ─────────────────────────────────────────────────────
function encontrarDonoDoTicket(canal, client) {
  // Primeiro tenta pelo Map
  const ticket = tickets.get(canal.id);
  if (ticket?.userId) return ticket.userId;

  // Fallback: procura nas permissões do canal
  for (const [id, overwrite] of canal.permissionOverwrites.cache) {
    // Ignora @everyone, o próprio bot, o dono e o cargo de staff
    if (id === canal.guild.roles.everyone.id) continue;
    if (id === client.user.id) continue;
    if (id === config.DONO_ID) continue;
    if (id === config.STAFF_CARGO_ID) continue;
    // Se tem permissão de ViewChannel, provavelmente é o cliente
    if (overwrite.allow.has(PermissionFlagsBits.ViewChannel)) {
      return id;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────
// Comando /pago — staff confirma entrega e fecha o ticket
// ─────────────────────────────────────────────────────
async function handlePago(interaction) {
  if (!isStaffOuDono(interaction)) {
    return interaction.reply({ content: PAGO.respostas.semPermissao, flags: 64 });
  }

  const canal = interaction.channel;

  // Verifica se é um canal de ticket (pelo nome ou pelo Map)
  const ticket = tickets.get(interaction.channelId);
  const isTicketChannel = canal.name.startsWith('ticket-') || canal.name.startsWith('robux') || canal.name.startsWith('✅-') || ticket;

  if (!isTicketChannel) {
    return interaction.reply({ content: PAGO.respostas.naoETicket, flags: 64 });
  }

  // Encontra o dono do ticket (Map ou fallback pelas permissões)
  const userId = encontrarDonoDoTicket(canal, interaction.client);

  if (!userId) {
    return interaction.reply({ content: PAGO.respostas.donoNaoEncontrado, flags: 64 });
  }

  await interaction.reply({ content: PAGO.respostas.encerrando, flags: 64 });

  // Edita a mensagem principal com o status final
  const msgData = PAGO.embedFinal(userId);
  const embedFinal = criarEmbed(msgData);

  if (ticket?.mensagemPrincipalId) {
    try {
      const mensagemPrincipal = await canal.messages.fetch(ticket.mensagemPrincipalId);
      await mensagemPrincipal.edit({
        content: `<@${userId}>`,
        embeds: [embedFinal],
        components: [],
      });
    } catch (err) {
      console.error('Erro ao editar mensagem principal no /pago:', err);
      // Fallback: envia normalmente
      await canal.send({ content: `<@${userId}>`, embeds: [embedFinal] });
    }
  } else {
    // Fallback caso não tenha a referência
    await canal.send({ content: `<@${userId}>`, embeds: [embedFinal] });
  }

  // Adiciona o cargo "cliente" ao dono do ticket
  try {
    const membro = await interaction.guild.members.fetch(userId);
    await membro.roles.add(config.CLIENTE_CARGO_ID);
    console.log(`✅ Cargo "cliente" adicionado ao usuário ${userId}.`);
  } catch (err) {
    console.error('Erro ao adicionar cargo "cliente":', err);
  }

  // Envia DM ao cliente
  try {
    const cliente = await interaction.client.users.fetch(userId);
    const dm = PAGO.dm;
    const embedDM = new EmbedBuilder()
      .setTitle(dm.title)
      .setDescription(dm.description)
      .setColor(dm.color)
      .setFooter({ text: dm.footer })
      .setTimestamp();
    await cliente.send({ embeds: [embedDM] });
  } catch (_) { }

  // Arquiva o canal após 8 segundos
  setTimeout(async () => {
    try {
      await canal.delete();
      if (ticket) ticket.status = 'encerrado';
      tickets.delete(canal.id);
      console.log(`✅ Ticket deletado com sucesso.`);
    } catch (err) {
      console.error('Erro ao deletar ticket após /pago:', err);
    }
  }, 8000);
}

module.exports = { handlePago };
