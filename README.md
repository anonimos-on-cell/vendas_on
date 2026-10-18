# Registradora de Pedidos - Versão v3.19.0

Sistema completo para registro de pedidos com correção definitiva do estouro e desalinhamento de texto no cabeçalho e na barra inferior do Boleto Bancário.

## Novidades na Versão v3.19.0
- **Ajuste da Linha Digitável e Número do Código de Barras**:
  - `word-break: break-all;` e `overflow-wrap: anywhere;` aplicados em todas as saídas numéricas do boleto.
  - Ajuste de tamanho de fonte responsiva no topo e na numeração abaixo do código de barras (`font-size: 10px` a `12px` e `letter-spacing: 0.5px`).
  - Restrição absoluta de caixa com `max-width: 100%` e `box-sizing: border-box`, garantindo que os números fiquem 100% contidos na moldura, mesmo em telas de celular estreitas.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.