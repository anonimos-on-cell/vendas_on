# Registradora de Pedidos - Versão v3.21.0

Sistema completo para registro de pedidos com suporte a formas de pagamento (Pix, Cartão de Crédito/Débito e Boleto Bancário) e validação jurídica por Assinatura Digital condicional para legalização posterior.

## Novidades na Versão v3.21.0
- **Remoção do Pagamento em Dinheiro**: Retirada a opção de pagamento via Dinheiro direto.
- **Assinatura Condicional de Confirmação**: A assinatura do cliente agora é exibida dinamicamente apenas após a seleção da forma de pagamento desejada (Pix, Cartão ou Boleto), servindo como confirmação legal.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.
