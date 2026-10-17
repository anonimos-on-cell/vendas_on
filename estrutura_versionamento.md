# Estrutura de Versionamento Semântico (SemVer)

Esta é a representação em árvore da estrutura de uma versão de software seguindo o padrão **v X.Y.Z** (como a versão **v 2.0.0**).

## Árvore Conceitual do Versionamento

```text
[v 2.0.0] (Versão do Software)
  │
  ├── 2 ── MAJOR (Maior)   ──► Mudanças incompatíveis / Grandes reformulações
  │
  ├── 0 ── MINOR (Menor)   ──► Novas funcionalidades (compatibilidade mantida)
  │
  └── 0 ── PATCH (Correção) ──► Correções de bugs e melhorias de segurança
```

---

## Detalhes dos Componentes

| Componente | Valor Atual | Tipo de Impacto | Quando muda? |
| :--- | :---: | :--- | :--- |
| **MAJOR** | `2` | Quebra de Compatibilidade | Quando recursos antigos são removidos ou alterados drasticamente. |
| **MINOR** | `0` | Nova Funcionalidade | Quando novas ferramentas são adicionadas sem quebrar o que já funciona. |
| **PATCH** | `0` | Correção / Ajuste | Quando o foco é apenas resolver problemas, bugs ou falhas de segurança. |
