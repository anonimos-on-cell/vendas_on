# Registro de Mudanças no Código (Changelog) - Versão v3.26.0

## Versão v3.26.0
- **Validação de Inputs por Tipo de Dado (Texto vs Número)**:
  - Adicionado escutador em tempo real (`input`) para filtrar caracteres inválidos nos campos do formulário:
    - Se o campo for de formato **Texto**, dígitos numéricos (0-9) são automaticamente bloqueados e removidos.
    - Se o campo for do formato **Número**, letras e caracteres não numéricos são automaticamente bloqueados e removidos.
