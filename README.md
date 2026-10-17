# 🛒 Sistema de Registro de Pedidos e Pagamentos Avançado

Um sistema completo de registro e gerenciamento de pedidos com suporte a múltiplas formas de pagamento e geração dinâmica de comprovantes e boletos bancários (Layout Itaú).

---

## 🚀 Funcionalidades

- **Cadastro de Pedidos:** Entrada de dados gerais (Cliente, Produto, Quantidade e Valor Unitário) com cálculo automático do total.
- **Formas de Pagamento Dinâmicas:**
  - **PIX:** Geração automática de QR Code e código PIX Copia e Cola.
  - **Cartão Virtual:** Suporte a Cartão Virtual de 16 dígitos, Titular, Validade e CVV Dinâmico.
  - **Dinheiro:** Assinatura digital do cliente coletada em tela via Touch/Mouse (`Canvas`).
  - **Boleto Bancário:** Geração completa de boleto de cobrança com padrão visual do **Banco Itaú (341-7)**, incluindo linha digitável, código de barras e dados do Pagador/Beneficiário.
- **Persistência de Dados:** API Node.js/Express integrada a banco de dados MySQL para armazenamento de histórico e comprovantes.

---

## 📁 Estrutura de Arquivos

```text
pedido-system-detalhado/
├── index.html          # Interface principal
├── style.css           # Estilização responsiva e layout do boleto
├── script.js           # Lógica do front-end e assinaturas
├── server.js           # Servidor Node.js Express (API REST)
├── banco.sql           # Script de criação do Banco de Dados MySQL
├── Estrutura-pedido.md # Documentação da árvore da aplicação
└── package.json        # Configuração e dependências do Node.js
```

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3, JavaScript (ES6+), Canvas API, QRCode.js (via CDN).
- **Back-end:** Node.js, Express, CORS.
- **Banco de Dados:** MySQL / MariaDB (`mysql2`).

---

## ⚙️ Como Executar o Projeto

### Pró-requisitos
- [Node.js](https://nodejs.org/) instalado.
- Servidor MySQL rodando (via XAMPP, WampServer ou instalação standalone).

### 1. Configurar o Banco de Dados
Execute o script do arquivo `banco.sql` no seu gerenciador de banco de dados (phpMyAdmin, MySQL Workbench, DBeaver, etc.):

```sql
CREATE DATABASE registradora;
USE registradora;
-- (O restante das tabelas será criado via script banco.sql)
```

### 2. Configurar e Iniciar o Servidor Back-end
No terminal, navegue até a pasta do projeto e instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm start
```
O servidor estará rodando em: `http://localhost:3000`

### 3. Executar o Front-end
Abra o arquivo `index.html` diretamente em seu navegador web (ou utilize a extensão **Live Server** no VS Code).

---

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizar e customizar conforme necessário!