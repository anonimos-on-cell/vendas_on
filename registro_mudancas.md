# Registro de Mudanças no Código (Changelog) - Versão v3.15.0

## Versão v3.15.0
- **Bloqueio de Extrapolação da Assinatura no Canvas**:
  - Implementada restrição matemática (`Math.max` e `Math.min`) para clampar a coordenada `(x, y)` estritamente dentro da largura e altura do `<canvas>`.
  - Aplicada regra de recorte estético `ctx.rect()` e `ctx.clip()` no contexto 2D para impedir que o desenho ultrapasse a caixa visual da assinatura.
  - Ajustes de CSS (`overflow: hidden`, `border-box` e `touch-action: none`) para garantir confinement visual total em dispositivos móveis e desktop.