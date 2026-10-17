# Registro de Mudanças no Código (Changelog)

Este documento descreve as principais alterações e inclusões feitas no código do sistema **Registradora de Pedidos**.

---

## 1. Arquivo de Configuração Separado (`config.json`)
Foi criado um arquivo JSON exclusivo para armazenar os dados bancários e a chave PIX, permitindo alterações rápidas sem alterar o código-fonte principal:

```json
{
  "chave_pix": "166@gmail.com",
  "beneficiario": "Empresa Vendedora Ltda.",
  "cnpj": "12.345.678/0001-90",
  "agencia_conta": "1234 / 56789-0"
}
```

---

## 2. Carregamento Dinâmico em JavaScript (`script.js`)
No início do arquivo `script.js`, foi adicionada a função assíncrona `carregarConfiguracoes()` para buscar as informações diretamente do arquivo `config.json`:

```javascript
let configApp = { chave_pix: "166@gmail.com" };

async function carregarConfiguracoes() {
    try {
        const res = await fetch("config.json");
        if (res.ok) {
            configApp = await res.json();
        }
    } catch (e) {
        console.warn("Não foi possível carregar config.json, usando padrão.", e);
    }
}
carregarConfiguracoes();
```

---

## 3. Armazenamento de Dados de Clientes e Produtos (`clientes.json` e `produtos.json`)
Foram criados dois arquivos JSON adicionais para gerenciar informações cadastrais:
- **`clientes.json`**: Guarda nomes, documentos, e-mails, telefones e endereços.
- **`produtos.json`**: Guarda itens, categorias, preços unitários e estoque.

---

## 4. Atualização da Interface do Recibo e PIX
- A chave PIX informada no recibo passa a refletir dinamicamente a variável `${configApp.chave_pix}`.
- O layout do Boleto utiliza os dados de beneficiário e agência/conta contidos no `config.json`.
