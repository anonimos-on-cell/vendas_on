# Registro de Mudanças no Código (Changelog) - Versão v3.19.0

## Versão v3.19.0
- **Correção da Extrapolação da Numeração do Código de Barras**:
  - Ajustado CSS da classe `.barcode-number` para utilizar `word-break: break-all;`, `overflow-wrap: anywhere;` e tamanho de fonte responsivo.
  - Corrigido o cabeçalho do boleto `.linha-digitavel` para flexibilizar a quebra de linha em telas pequenas sem ultrapassar o cabeçalho ou encavalar texto.
  - Adicionadas travas de segurança de margem interna (`padding`) e caixa estrita (`overflow: hidden`).