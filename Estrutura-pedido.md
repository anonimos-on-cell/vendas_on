# Árvore da Aplicação - Registradora de Pedidos (Versão Remodelada v2.0.0)

Esta é a estrutura de arquivos e diretórios da aplicação remodelada para suporte avançado de formas de pagamento (PIX, Cartão Virtual, Dinheiro com Assinatura e Boleto Bancário).

```text
pedido-system-remodulado/
│
├── index.html            # Interface de usuário principal (Formulário, Campos Dinâmicos e Recibo)
├── style.css             # Estilização responsiva e moderna para formulários e canvas
├── script.js             # Lógica do Front-end (Validações, Canvas de Assinatura e Requisições Fetch)
├── server.js             # Servidor Back-end em Node.js com Express e CORS (suporte a Base64)
├── banco.sql             # Script SQL para criação do banco de dados relacional e colunas estendidas
├── README.md             # Instruções completas de uso e configuração do projeto
├── estrutura_versionamento.md # Documentação sobre o padrão de versionamento semântico
└── package.json          # Configuração de dependências e metadados do Node.js (v2.0.0)
```

## Descrição dos Componentes

- **`index.html`**: Contém o formulário estruturado em fieldsets para dados gerais e um seletor dinâmico de formas de pagamento que exibe campos específicos para **Cartão**, **Dinheiro** (com canvas para assinatura) e **Boleto**.
- **`style.css`**: Estilos visuais otimizados para garantir usabilidade em dispositivos móveis e desktops, organizando os blocos condicionais de pagamento.
- **`script.js`**: Gerencia interações do usuário, manipulação do DOM, controle do desenho por touch/mouse no canvas de assinatura, montagem do recibo e envio via `fetch` POST para a API.
- **`server.js`**: API Node.js configurada para receber requisições de grande porte (suportando imagens em Base64 de assinaturas) e realizar a persistência segura no MySQL.
- **`banco.sql`**: Script de criação da base de dados e da tabela `pedidos` contendo colunas dedicadas para dados de cartão, assinatura digital e informações completas do pagador (boleto).
- **`package.json`**: Gerenciador de pacotes do projeto com as dependências `express`, `mysql2` e `cors`.
