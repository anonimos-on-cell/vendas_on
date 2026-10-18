# Registradora de Pedidos - Versão v3.12.0

Sistema completo para registro de pedidos com QR Code Pix estático e dinâmico onde o valor total do pedido fica fixado e bloqueado no payload Pix (campo ID 54), impedindo que o cliente precise digitar o valor.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.