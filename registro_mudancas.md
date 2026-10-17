# Registro de Mudanças no Código (Changelog) - Versão v3.5.0

Este documento descreve as alterações e atualizações realizadas no código do sistema **Registradora de Pedidos**.

---

## 1. Atualização para a Versão v3.5.0
- **Verificação de Status do Servidor e Fallback Pix via config.json**:
  - Implementada função assíncrona de verificação de conectividade com a API (`/status` ou `/pedidos`).
  - Quando o servidor está **ativo**, o payload Pix é gerado dinamicamente com o valor total atualizado do pedido.
  - Quando o servidor está **inativo/desativado**, o sistema busca automaticamente a `chave_pix_alternativa` definida no arquivo `config.json` para exibir o QR Code e preencher o botão "Copiar Código PIX".
