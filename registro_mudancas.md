# Registro de Mudanças no Código (Changelog) - Versão v3.7.0

This document describes changes in version v3.7.0 [cite: 3].

---

## 1. Atualização para a Versão v3.7.0
- **Implementação de QR Codes Estáticos por Produto/Serviço (ID 54 com Valor Fixo)**:
  - O payload EMV do Pix gerado (tanto para o QR Code quanto para o botão "Copiar Código PIX") agora insere o valor exato do produto/serviço correspondente ao total do pedido no campo ID 54, permitindo que o cliente escaneie e pague um valor tabelado e travado para edições.
  - Mantida a verificação de status do servidor e o fallback inteligente utilizando a `chave_pix_alternativa` do `config.json` caso o servidor esteja offline.
