# Registro de Mudanças no Código (Changelog) - Versão v3.29.0

## Versão v3.29.0
- **Limpeza Automática do Recibo ao Alterar a Forma de Pagamento**:
  - Adicionado evento de escuta na seleção de forma de pagamento (`change` no select `#pagamento`) que limpa e oculta imediatamente qualquer recibo/comprovante anterior gerado. Assim, ao mudar entre Pix, Cartão ou Boleto e finalizar novamente, um novo recibo atualizado é gerado do zero.
