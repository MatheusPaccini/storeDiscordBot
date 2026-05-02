# Discord Ticket Bot - Venda de Robux

Um bot para Discord focado em automação de vendas de Robux via tickets. O bot permite que clientes criem tickets de compra, converte valores de Reais (BRL) para Robux (e vice-versa), exibe chaves de pagamento (PIX) e gerencia a aprovação do pedido através da equipe de Staff.

## Funcionalidades

- **Cálculo Automático:** Conversão bilateral entre Reais (R$) e quantidade de Robux de forma automática.
- **Sistema de Tickets:** Criação de canais privados para atendimento entre o cliente e a equipe.
- **Painel Interativo:** Interações por meio de botões e formulários (Modais) nativos do Discord.
- **Fluxo de Aprovação:** Notificação automática para a Staff e botões para concluir e encerrar o ticket de forma simples.
- **Configuração Segura:** Gerenciamento de chaves e IDs sensíveis por meio de variáveis de ambiente (`.env`).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão 16.9.0 ou mais recente).
- Um bot criado no [Discord Developer Portal](https://discord.com/developers/applications).

## Instalação e Configuração

1. Clone este repositório ou faça o download dos arquivos.
2. Abra o terminal na pasta do projeto e instale as dependências necessárias:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Localize o arquivo `.env.example` e faça uma cópia dele chamada `.env`.
   - Preencha as informações dentro do `.env` com os dados do seu servidor e do bot:
     - `TOKEN`: O token do seu bot (nunca compartilhe).
     - `GUILD_ID`: ID do seu servidor do Discord.
     - `CLIENT_ID`: ID da aplicação (Client ID) do seu bot.
     - `DONO_ID`: Seu ID de usuário no Discord.
     - `STAFF_CARGO_ID`: ID do cargo da sua equipe.
     - `CATEGORIA_TICKETS_ID`: ID da categoria onde os novos canais de ticket serão criados.
     - `CHAVE_PIX`: Sua chave de recebimento.

4. Registre os comandos de barra (Slash Commands) no servidor:
   ```bash
   npm run deploy
   ```

5. Inicie o bot:
   ```bash
   npm start
   ```

## Fluxo de Venda (Como Funciona)

1. **Painel de Atendimento:** O administrador envia o painel em um canal usando o comando do bot (ex: `/painel`).
2. **Início da Compra:** O cliente visualiza os produtos e clica no botão "Comprar Robux".
3. **Formulário:** Um modal aparece para o cliente preencher a quantidade de Robux desejada ou o valor em Reais.
4. **Criação do Ticket:** O bot calcula automaticamente os valores, cria um canal restrito de ticket, e mostra o resumo do pedido junto com a chave PIX.
5. **Aprovação:** A equipe (Staff) é mencionada. O cliente envia o comprovante no chat do ticket.
6. **Encerramento:** A Staff aprova o pagamento através de um botão interativo ("Confirmar Pagamento e Fechar"). O bot avisa o cliente e arquiva o canal.

## Licença

Este projeto é de código aberto. Sinta-se livre para modificar, estudar e adaptar para as necessidades do seu servidor.
Muito obrigado ler até aqui!