# Estrutura da Aplicação - Sistema de Pedidos

Abaixo está a árvore de diretórios e arquivos que compõem o sistema completo de registro de pedidos com opções avançadas de pagamento.

```text
pedido-system-detalhado/
├── index.html          # Interface principal (Formulário e área do Recibo)
├── style.css           # Estilização completa do layout e do boleto Itaú
├── script.js           # Lógica do front-end (Canvas, QR Code dinâmico, trocas de tela)
├── server.js           # Servidor Node.js/Express para recebimento dos dados
├── banco.sql           # Script SQL para criação do banco de dados MySQL
└── package.json        # Dependências do projeto Node.js (express, mysql2, cors)
```

---

## 📄 Descrição dos Arquivos

### 1. `index.html`
* **Descrição:** Estrutura HTML do sistema. Contém o formulário com dados gerais do pedido (Cliente, Produto, Quantidade, Valor) e os campos condicionais dinâmicos para cada forma de pagamento (Cartão, Dinheiro com Canvas de assinatura, Boleto).
* **Dependências Externas:** Inclui a biblioteca `qrcode.min.js` para geração visual do QR Code do PIX.

### 2. `style.css`
* **Descrição:** Folha de estilos CSS da aplicação.
* **Destaques:**
  * Estilização responsiva do formulário e painéis.
  * Área de assinatura interativa (`<canvas>`).
  * Moldura e formatação idêntica ao layout bancário do **Banco Itaú (341-7)** para exibição de boletos.

### 3. `script.js`
* **Descrição:** Lógica da aplicação no navegador.
* **Funcionalidades:**
  * **Alternância dinâmica:** Exibe apenas os campos relevantes conforme a forma de pagamento selecionada.
  * **Assinatura Virtual:** Gerencia o desenho via toque ou mouse na tela.
  * **Geração do Recibo:** Constrói dinamicamente os comprovantes/boletos e QR Code PIX após o envio do formulário.
  * **Integração:** Envia todos os dados coletados para a API back-end.

### 4. `server.js`
* **Descrição:** Servidor backend desenvolvido em Node.js utilizando o framework Express.
* **Funcionalidades:**
  * Define a rota `POST /pedidos` para receber as informações da compra.
  * Conecta-se ao banco de dados MySQL e realiza o armazenamento dos pedidos e detalhes dos pagamentos.

### 5. `banco.sql`
* **Descrição:** Script de criação da base de dados MySQL (`registradora`).
* **Estrutura:** Tabela `pedidos` configurada para armazenar dados do cliente, itens, detalhes do cartão, imagem em Base64 da assinatura e dados de cobrança do boleto.

### 6. `package.json`
* **Descrição:** Arquivo de configuração do projeto Node.js que lista as bibliotecas necessárias (`express`, `mysql2`, `cors`) para rodar o servidor.