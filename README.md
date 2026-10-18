# Registradora de Pedidos - Versão v3.13.0

Sistema completo para registro de pedidos com QR Code Pix estático/dinâmico, valor total travado (tag 54) e recibo organizado visualmente.

## Funcionalidades
- **Recibo Visualmente Atraente**: Layout em cartões e grade limpa, com QR Code Pix centralizado.
- **Valor PIX Preenchido e Travado**: O valor total calculado é inserido diretamente no payload EMV (Tag 54) para o cliente não precisar digitar.
- **Formato PIX Universal Seguro**: TXID genérico estático (`***`) sem conflito nos bancos.
- **Fallback e Suporte Offline**: Leitura dinâmica via `config.json`.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.
