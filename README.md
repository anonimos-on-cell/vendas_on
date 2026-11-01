# Registradora de Pedidos - Versão v3.23.0

Sistema completo para registro de pedidos com validação dos 4 campos superiores dos Dados do Pedido (Cliente, Produto, Quantidade e Valor) e dos campos específicos do método de pagamento (Cartão ou Boleto). Apenas com os campos válidos, o fluxo abre a tela de Assinatura do Cliente e exibe logo em seguida a Forma de Pagamento processada.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.
