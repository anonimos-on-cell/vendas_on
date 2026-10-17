# Registradora de Pedidos - Versão v2.0.0

Sistema completo de registro de pedidos com suporte a formas de pagamento dinâmicas, renderização visual de comprovantes/boletos e persistência em MySQL.

## Funcionalidades
- **PIX**: QR Code gerado em tempo real com código Copia e Cola [cite: 16].
- **Cartão Virtual**: Coleta de Número, Titular, Validade e CVV Dinâmico [cite: 14].
- **Dinheiro**: Assinatura digital do cliente gravada via Canvas HTML5 [cite: 14, 16].
- **Boleto Bancário**: Layout estruturado com dados do Beneficiário, Pagador, Datas, Valores e Código de Barras [cite: 16].
- **Geração de Recibo**: Visualização imediata e detalhada após o registro [cite: 16].

## Instalação e Execução
1. Importe o arquivo `banco.sql` no seu banco de dados MySQL [cite: 13].
2. Execute `npm install` no terminal para instalar as dependências [cite: 15].
3. Inicie a API com `npm start` [cite: 15].
4. Abra o arquivo `index.html` no navegador [cite: 14].
