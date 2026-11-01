# Registro de Mudanças no Código (Changelog) - Versão v3.31.0

## Versão v3.31.0
- **Inversão de Decimais entre Quantidade e Valor Unitário**:
  - O campo **Quantidade** voltou a ser estritamente numérico inteiro (`INT`).
  - O campo **Valor Unitário** agora é o único que aceita e processa números decimais (`step="any"`, com ponto e dígitos numéricos permitidos em tempo real).
