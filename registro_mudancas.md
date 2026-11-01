# Registro de Mudanças no Código (Changelog) - Versão v3.32.0

## Versão v3.32.0
- **Restrição de Valores Decimais Positivos no Valor Unitário**:
  - Adicionado atributo `min="0.01"` e tratamento em tempo real via JavaScript para bloquear o sinal de menos (`-`) e quaisquer caracteres inválidos, garantindo que o campo **Valor Unitário** aceite apenas números decimais estritamente positivos.
