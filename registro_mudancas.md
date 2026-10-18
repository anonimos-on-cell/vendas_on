# Registro de Mudanças no Código (Changelog) - Versão v3.12.0

## Versão v3.12.0
- **Inclusão Obrigatória do Valor Total no PIX (Tag 54)**:
  - Garantido que a função `gerarPayloadPix` sempre inclua a tag EMV `54` formatada com 2 casas decimais contendo o valor total exato do pedido.
  - Ao escanearem o QR Code ou utilizarem o código Copia e Cola, os bancos carregarão automaticamente o valor preenchido e travado para o pagador.