# Árvore da Aplicação - Registradora de Pedidos (v3.32.0)

Esta é a estrutura completa de arquivos da aplicação contida na pasta `pedidos_v3.32.0`:

```text
pedidos_v3.32.0/
│
├── index.html            # Interface principal com min="0.01" no Valor Unitário
├── style.css             # Estilização completa com contenção de texto
├── script.js             # Lógica front-end com validação estrita anti-negativos no Valor Unitário
├── server.js             # API Node.js (Express + CORS + MySQL)
├── banco.sql             # Script SQL com restrição de valores positivos
├── config.json           # Configurações dinâmicas de empresa e Pix
├── clientes.json         # Base de clientes em formato JSON
├── produtos.json         # Base de produtos em formato JSON
├── registro_mudancas.md  # Histórico detalhado de versões
├── README.md             # Instruções de instalação e uso
├── gerar_versao_zip.py   # Script de automação de versionamento
└── package.json          # Dependências e versão da aplicação
```
