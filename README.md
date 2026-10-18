# Registradora de Pedidos - Versão v3.9.0

Sistema completo para registro de pedidos com QR Code Pix estático por produto e chave aleatória funcional.

## Funcionalidades
- **QR Codes Estáticos por Produto/Serviço**: Payload EMV Válido gerado para a chave Pix `dfd6038c-64a7-4143-b17b-3eced0fba32a`.
- **Botão Copiar Código PIX e QR Code Sincronizados**: Ambos geram o código EMV válido para leitura pelos aplicativos bancários.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.