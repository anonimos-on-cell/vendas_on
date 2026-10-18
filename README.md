# Registradora de Pedidos - Versão v3.8.0

Sistema completo para registro de pedidos com QR Code Pix estático por produto (valor exato preenchido e travado no campo ID 54) e suporte a fallback offline via `config.json`.

## Funcionalidades
- **QR Codes Estáticos por Produto/Serviço**: Cada venda gera um payload Pix com o valor exato do produto/serviço.
- **Chave Pix Aleatória**: Configurada com a chave `77e79306-f90f-4ed6-9815-1fd759dbc425`.
- **Verificação de Servidor**: Checagem automática do estado da API.
- **Fallback Automático**: Se o servidor estiver offline, o sistema utiliza a chave alternativa do `config.json`.

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.