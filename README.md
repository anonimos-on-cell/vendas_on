# Registradora de Pedidos - Versão v3.27.0

Sistema completo para registro de pedidos com limite máximo de 100 caracteres nos campos de formato texto.

## Novidades na Versão v3.27.0
- **Limite de Caracteres em Textos**:
  - Todos os campos de formato texto (ex: Nome do Cliente, Produto, Titular do Cartão, Nome do Pagador no Boleto) possuem restrição estrita de no máximo **100 caracteres** (`maxlength="100"` e validação).

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.
