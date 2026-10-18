# Registradora de Pedidos - Versão v3.20.0

Sistema completo para registro de pedidos com o bloco da Linha Digitável e botão Copiar reposicionado estrategicamente para o rodapé do Boleto Bancário, abaixo do Código de Barras.

## Novidades na Versão v3.20.0
- **Reorganização do Layout do Boleto Bancário**:
  - O bloco "Número do Código de Barras / Linha Digitável" contendo a caixa do código e o botão "Copiar Linha Digitável" foi movido para o rodapé, situado logo abaixo da representação visual do Código de Barras e do número correspondente.
  - A parte superior do boleto ficou mais limpa, mantendo o cabeçalho bancário, dados do beneficiário, sacado, datas e demonstrativo do item.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.