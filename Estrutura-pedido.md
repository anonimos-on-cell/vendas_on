# Árvore da Aplicação - Registradora de Pedidos (v3.5.0)

Esta é a estrutura atualizada de arquivos da aplicação contida na pasta `pedidos_v3.5.0`:

```text
pedidos_v3.5.0/
│
├── index.html            # Interface principal
├── style.css             # Estilização completa e CSS @media print
├── script.js             # Front-end com verificação de status do servidor e fallback Pix alternativo do config.json
├── server.js             # API Node.js (Express + CORS)
├── banco.sql             # Script para MySQL
├── config.json           # Configurações dinâmicas (Chave PIX, Chave Alternativa, Empresa)
├── clientes.json         # Base de clientes em formato JSON
├── produtos.json         # Base de produtos em formato JSON
├── registro_mudancas.md  # Histórico detalhado de alterações nos códigos
├── README.md             # Instruções de instalação e uso
└── package.json          # Dependências do projeto
```
