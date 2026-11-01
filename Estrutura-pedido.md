# Árvore da Aplicação - Registradora de Pedidos (v3.23.0)

Esta é a estrutura completa de arquivos da aplicação contida na pasta `pedidos_v3.23.0`:

```text
pedidos_v3.23.0/
│
├── index.html            # Interface principal com validação de campos do pedido
├── style.css             # Estilização completa do formulário, boleto e área de assinatura
├── script.js             # Lógica front-end com validações obrigatórias e geração dinâmica
├── server.js             # API Node.js (Express + CORS + MySQL)
├── banco.sql             # Script SQL para criação da tabela de pedidos
├── config.json           # Configurações dinâmicas de empresa e Pix
├── clientes.json         # Base de clientes em formato JSON
├── produtos.json         # Base de produtos em formato JSON
├── registro_mudancas.md  # Histórico detalhado de versões
├── README.md             # Instruções de instalação e uso
├── gerar_versao_zip.py   # Script de automação de versionamento
└── package.json          # Dependências e versão da aplicação
```
