# Árvore da Aplicação - Registradora de Pedidos (v3.15.0)

Esta é a estrutura completa de arquivos da aplicação contida na pasta `pedidos_v3.15.0`:

```text
pedidos_v3.15.0/
│
├── index.html            # Interface principal e formulário
├── style.css             # Estilização completa, contêiner rígido para canvas e regras @media print
├── script.js             # Front-end, controle de limites do Canvas de assinatura e BR Code Pix
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