# Registradora de Pedidos - Versão v3.16.0

Sistema completo para registro de pedidos com visualização do Boleto Bancário profissional contendo linha digitável copia e cola, código de barras e descrição detalhada do pedido.

## Funcionalidades
- **Boleto Bancário Completo**: Exibição da Linha Digitável formatada para copiar e colar, Código de Barras estilizado, Dados do Sacado, Beneficiário, Vencimento e Descrição/Demonstrativo do produto.
- **Assinatura Confinada na Caixa**: Controle estrito de limites no Canvas da Assinatura para pagamentos em dinheiro.
- **Payload PIX EMV Válido**: Chave Pix `dc529730-f4e4-4370-a87d-658ed8ab9eb9` e valor total preenchido e travado (Tag 54).

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.