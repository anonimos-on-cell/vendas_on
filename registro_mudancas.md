# Registro de Mudanças no Código (Changelog) - Versão v3.23.0

## Versão v3.23.0
- **Validação de Campos Obrigatórios do Pedido**:
  - Garantida a validação dos 4 campos superiores (Nome do Cliente, Descrição do Produto, Quantidade e Valor Unitário) antes de liberar o processamento.
  - Validação dos campos condicionais específicos do pagamento selecionado (Cartão ou Boleto).
  - Somente após o preenchimento válido de todos esses campos, o sistema libera e exibe o bloco de Assinatura de Confirmação do Cliente seguido pelo Detalhamento do Pagamento (Pix com QR Code, Cartão ou Boleto Itaú).
