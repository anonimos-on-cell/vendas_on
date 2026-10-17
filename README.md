# Registradora de Pedidos - Versão v2.0.0

Sistema completo de registro de pedidos com suporte a formas de pagamento dinâmicas e persistência no MySQL via Node.js.

## Funcionalidades
- **PIX**: Processamento simples e direto do pedido.
- **Cartão Virtual**: Coleta de Número, Titular, Validade e CVV Dinâmico.
- **Dinheiro**: Campo de assinatura digital via Touch/Mouse utilizando Canvas HTML5.
- **Boleto**: Coleta de informações completas do pagador (Nome/Razão Social, CPF/CNPJ e Endereço).
- **Geração de Recibo Instantânea**: Exibição dos dados diretamente na tela após o envio.

## Instalação e Execução
1. Importe o arquivo `banco.sql` no seu servidor MySQL.
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm start`
4. Abra o arquivo `index.html` no seu navegador.
