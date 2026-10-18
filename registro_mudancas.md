# Registro de Mudanças no Código (Changelog) - Versão v3.13.0

## Versão v3.13.0
- **Correção de Validação do QR Code PIX**:
  - Removido o TXID fixo que gerava a mensagem de "QR Code removido pelo usuário recebedor" nos aplicativos dos bancos, substituindo pela tag genérica padrão (`62070503***`).
- **Fixação Automática do Valor Total (Tag 54)**:
  - Integração do valor total da venda no payload Pix, impedindo a necessidade de digitação do valor pelo cliente no aplicativo do banco.
- **Design do Recibo Reorganizado**:
  - Layout do recibo reformulado em grade/cartões com visual atraente, QR Code centralizado e caixa limpa para o código Copia e Cola.
