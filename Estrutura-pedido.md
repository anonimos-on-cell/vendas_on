# Árvore da Aplicação - Registradora de Pedidos (v3.30.0)

Esta é a estrutura completa de arquivos da aplicação contida na pasta `pedidos_v3.30.0`:

```text
pedidos_v3.30.0/
│
├── index.html            # Interface principal com campo Quantidade decimal
├── style.css             # Estilização completa com contenção de texto
├── script.js             # Lógica front-end com suporte a decimais em quantidade e limpeza ao trocar pagamento
├── server.js             # API Node.js (Express + CORS + MySQL)
├── banco.sql             # Script SQL com suporte a quantidade decimal
├── config.json           # Configurações dinâmicas de empresa e Pix
├── clientes.json         # Base de clientes em formato JSON
├── produtos.json         # Base de produtos em formato JSON
├── registro_mudancas.md  # Histórico detalhado de versões
├── README.md             # Instruções de instalação e uso
├── gerar_versao_zip.py   # Script de automação de versionamento
└── package.json          # Dependências e versão da aplicação
```
