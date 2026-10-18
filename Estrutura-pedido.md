# Árvore da Aplicação - Registradora de Pedidos (v3.20.0)

Esta é a estrutura completa de arquivos da aplicação contida na pasta `pedidos_v3.20.0`:

```text
pedidos_v3.20.0/
│
├── index.html            # Interface principal
├── style.css             # Estilização completa do formulário, boleto e impressão
├── script.js             # Lógica front-end, gerador do Boleto com bloco de cópia no rodapé
├── server.js             # API Node.js (Express + CORS)
├── banco.sql             # Script para MySQL
├── config.json           # Configurações dinâmicas de empresa e chave Pix
├── clientes.json         # Base de clientes em formato JSON
├── produtos.json         # Base de produtos em formato JSON
├── registro_mudancas.md  # Histórico detalhado de versões
├── README.md             # Instruções de instalação e uso
├── gerar_versao_zip.py   # Script de automação de versionamento e empacotamento
└── package.json          # Dependências e versão da aplicação
```