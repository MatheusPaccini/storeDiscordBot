const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} = require('discord.js');
const config = require('../config');
const { TICKET, CATALOGO } = require('../messages');
const { criarEmbed } = require('../utils/embedBuilder');
const tickets = require('../utils/ticketStore');

// ─────────────────────────────────────────────────────
// Modal do nick Roblox → cria o ticket
// ─────────────────────────────────────────────────────
async function handleModalRoblox(interaction) {
  const [, tipo] = interaction.customId.split(':'); // ── pega 'gamepass' ou 'grupo'
  const nickRoblox = interaction.fields.getTextInputValue('nick_roblox');
  const guild = interaction.guild;
  const usuario = interaction.user;

  await interaction.deferReply({ flags: 64 });
  await interaction.editReply({ content: TICKET.respostas.criando });

  const ticketExistente = guild.channels.cache.find(
    c => c.name === `ticket-${usuario.username.toLowerCase()}` && c.parentId === config.CATEGORIA_TICKETS_ID
  );

  if (ticketExistente) {
    return interaction.editReply({ content: TICKET.respostas.jaAberto(ticketExistente.id) });
  }

  try {
    const canal = await guild.channels.create({
      name: `ticket-${usuario.username}`,
      type: ChannelType.GuildText,
      parent: config.CATEGORIA_TICKETS_ID,
      permissionOverwrites: [
        { id: guild.roles.everyone.id, type: 0, deny: [PermissionFlagsBits.ViewChannel] },
        {
          id: interaction.client.user.id, type: 1,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageChannels],
        },
        {
          id: usuario.id, type: 1,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
        },
        {
          id: config.DONO_ID, type: 1,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
        },
        {
          id: config.STAFF_CARGO_ID, type: 0,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
        },
      ],
    });

    const msgData = TICKET.bemVindo(usuario.id, nickRoblox);
    const embedBemVindo = criarEmbed(msgData);

    const rowCatalogo = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('catalogo')
        .setLabel(TICKET.botaoCatalogo.label)
        .setEmoji(TICKET.botaoCatalogo.emoji)
        .setStyle(ButtonStyle.Success)
    );

    // Envia a mensagem principal e salva a referência
    const mensagemPrincipal = await canal.send({ content: `<@${usuario.id}>`, embeds: [embedBemVindo], components: [rowCatalogo] });

    tickets.set(canal.id, {
      canalId: canal.id,
      userId: usuario.id,
      nickRoblox,
      tipo, // 'gamepass' ou 'grupo'
      status: 'aberto',
      criadoEm: new Date(),
      mensagemPrincipalId: mensagemPrincipal.id, // ← salva o ID da mensagem principal
    });

    interaction.client.users.fetch(config.DONO_ID).then(dono => {
      const notif = TICKET.notificacaoDono(usuario.tag, nickRoblox, canal.id);
      dono.send({ embeds: [criarEmbed(notif)] });
    }).catch(() => { });

    await interaction.editReply({ content: TICKET.respostas.criado(canal.id) });

  } catch (err) {
    console.error('Erro ao criar ticket:', err);
    await interaction.editReply({ content: TICKET.respostas.erroCriar });
  }
}

// ─────────────────────────────────────────────────────
// Catálogo — edita a mensagem principal
// ─────────────────────────────────────────────────────
async function handleCatalogo(interaction) {
  const ticket = tickets.get(interaction.channelId);
  const tipo = ticket?.tipo ?? 'gamepass';

  const msgData = CATALOGO.embed(tipo);
  const embed = criarEmbed(msgData);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('pedido_por_robux')
      .setLabel(CATALOGO.botoes.porRobux.label)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('pedido_por_reais')
      .setLabel(CATALOGO.botoes.porReais.label)
      .setStyle(ButtonStyle.Success),
  );

  // Edita a mensagem principal em vez de enviar uma nova
  await interaction.update({ embeds: [embed], components: [row] });
}

module.exports = {
  handleModalRoblox,
  handleCatalogo,
};
