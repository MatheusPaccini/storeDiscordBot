const { REST, Routes } = require('discord.js');
const config = require('./config');

const commands = [
  {
    name: 'painel',
    description: 'Envia o painel de abertura de tickets no canal atual',
    options: [
      {
        name: 'tipo',
        description: 'Tipo de painel a enviar',
        type: 3, // String
        choices: [
          { name: 'Vendas', value: 'vendas' },
          { name: 'Ajuda', value: 'ajuda' },
        ],
        required: false,
      }
    ],
  },
  {
    name: 'calcular',
    description: 'Envia a calculadora de preços de Robux no canal atual',
  },
  {
    name: 'pago',
    description: 'Confirma entrega dos Robux e encerra o ticket (apenas staff)',
  },
];

const rest = new REST().setToken(config.TOKEN);

(async () => {
  try {
    console.log('⏳ Registrando comandos...');
    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error);
  }
})();
