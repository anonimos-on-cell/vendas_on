# Registradora de Pedidos - Versão v3.26.0

Sistema completo para registro de pedidos com validação inteligente de entradas de dados (inputs).

## Novidades na Versão v3.26.0
- **Filtro de Entradas Texto x Número**:
  - Campos de **Texto** (ex: Nome do Cliente, Produto, Titular do Cartão, Nome do Pagador no Boleto): Não aceitam dígitos numéricos. Qualquer número inserido é imediatamente filtrado e removido na digitação.
  - Campos **Numéricos** (ex: Quantidade, Valor Unitário, Número do Cartão, CVV, CPF/CNPJ): Não aceitam caracteres alfabéticos/letras.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.
