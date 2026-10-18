# Registradora de Pedidos - Versão v3.15.0

Sistema completo para registro de pedidos com controle estrito de limites no Canvas da Assinatura de pagamento em dinheiro.

## Funcionalidades
- **Assinatura Confinada na Caixa**: O cursor e o traço de assinatura em dinheiro ficam restritos rigorosamente à área útil do Canvas (`clip` + trava de coordenadas `Math.max` / `Math.min`), impedindo vazamento para fora da borda.
- **Payload PIX EMV Válido**: Chave Pix `dc529730-f4e4-4370-a87d-658ed8ab9eb9`, cidade `FEIRA DE SANTAN` e valor total preenchido e travado (Tag 54).
- **Recibo Organizado e Atraente**: Layout em cartões e grade moderna com QR Code centralizado.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.