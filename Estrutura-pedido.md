# Árvore da Aplicação - Registradora de Pedidos (Versão Remodelada v2.0.0)

Esta é a estrutura de arquivos e diretórios da aplicação remodelada para suporte avançado de formas de pagamento (PIX, Cartão Virtual, Dinheiro com Assinatura e Boleto Bancário).

```text
pedido-system-remodulado/
│
├── index.html            # Interface de usuário principal (Formulário, Campos Dinâmicos e Recibo)
├── style.css             # Estilização responsiva e moderna para formulários, recibo e boleto
├── script.js             # Lógica do Front-end (Canvas de Assinatura, QR Code PIX, Boleto e Fetch)
├── server.js             # Servidor Back-end em Node.js com Express e CORS (suporte a Base64)
├── banco.sql             # Script SQL para criação do banco de dados relacional e colunas estendidas
├── README.md             # Instruções completas de uso e configuração do projeto
├── estrutura_versionamento.md # Documentação sobre o padrão de versionamento semântico
└── package.json          # Configuração de dependências e metadados do Node.js (v2.0.0)
```

## Descrição dos Componentes

- **`index.html`**: Contém o formulário estruturado com campos dinâmicos para **Cartão**, **Dinheiro** (canvas de assinatura) e **Boleto**, além de incluir a biblioteca `qrcode.min.js` para renderização do PIX [cite: 14].
- **`style.css`**: Estilos visuais otimizados para usabilidade, layout responsivo e formatação visual completa para recibos, QR Codes e Boletos bancários (padrão Itaú) [cite: 18].
- **`script.js`**: Gerencia interações do usuário, manipulação do DOM, controle de desenho no canvas, geração dinâmica de QR Code e Boleto bancário, montagem do recibo e envio via `fetch` POST [cite: 16].
- **`server.js`**: API Node.js configurada para receber requisições com suporte a imagens em Base64 e realizar a persistência segura no MySQL [cite: 17].
- **`banco.sql`**: Script de criação da base de dados `registradora` e da tabela `pedidos` contendo colunas estendidas para cartão, assinatura e pagador [cite: 13].
- **`package.json`**: Gerenciador de pacotes do Node.js com dependências como `express`, `mysql2` e `cors` [cite: 15].
