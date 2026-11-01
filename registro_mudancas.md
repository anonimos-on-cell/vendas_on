# Registro de Mudanças no Código (Changelog) - Versão v3.28.0

## Versão v3.28.0
- **Contenção e Quebra de Texto em Inputs e Blocos (`overflow` / `word-wrap`)**:
  - Ajustado o `style.css` para garantir que textos longos digitados em inputs, textareas ou exibidos em seções de recibos e boletos permaneçam rigorosamente dentro de suas regiões, aplicando `box-sizing: border-box`, `max-width: 100%`, `overflow: hidden`, `word-break: break-word` e `text-overflow: ellipsis` conforme necessário.
