# Registradora de Pedidos - Versão v3.5.0

Sistema completo para registro de pedidos com verificação de status do servidor e fallback inteligente para chave Pix alternativa vinda do `config.json`.

## Funcionalidades
- **Verificação de Servidor**: Checagem automática se o servidor Node.js/Banco de Dados está ativo.
- **Fallback Pix Alternativo**: Quando o servidor estiver desativado, o sistema utiliza automaticamente a chave Pix/código alternativo configurado no `config.json` tanto para o QR Code quanto para o botão "Copiar Código PIX".

## Como Executar
1. Importe o `banco.sql` no MySQL.
2. Altere os valores no `config.json` conforme sua preferência.
3. Execute `npm install` e `npm start`.
4. Abra o `index.html` no navegador.
