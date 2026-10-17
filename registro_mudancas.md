# Registro de Mudanças no Código (Changelog) - Versão v3.2.0

Este documento descreve as alterações e atualizações realizadas no código do sistema **Registradora de Pedidos**.

---

## 1. Atualização para a Versão v3.2.0
- **Correção de Alinhamento e Quebra de Linha do Bloco PIX**:
  - Alinhamento centralizado e limitação de largura interna do bloco PIX.
  - Inclusão do estilo `word-break: break-all;` / `overflow-wrap: anywhere;` na caixa do **Código PIX Copia e Cola**, evitando que a chave e o payload ultrapassem as margens do cartão do recibo.
  - Alinhamento em coluna centralizada dos componentes: **QR Code**, título **Código PIX Copia e Cola**, caixa de código e botão **Copiar Código PIX**.
