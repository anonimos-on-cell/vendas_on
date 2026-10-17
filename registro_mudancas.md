# Registro de Mudanças no Código (Changelog)

Este documento descreve as alterações e atualizações realizadas no código do sistema **Registradora de Pedidos**.

---

## 1. Arquivo de Configuração (`config.json`)
Criação de um arquivo JSON centralizado para gerenciar os dados bancários e a chave Pix no formato oficial de e-mail (sem espaços):

```json
{
  "chave_pix": "contacorrente166@gmail.com",
  "beneficiario": "Empresa Vendedora Ltda.",
  "cnpj": "12.345.678/0001-90",
  "agencia_conta": "1234 / 56789-0"
}
```

---

## 2. Carregamento Dinâmico no Front-End (`script.js`)
Função assíncrona `carregarConfiguracoes()` para carregar os dados de `config.json` ao inicializar a página.

---

## 3. Atualização e Simplificação da Exibição do PIX
- **Chave Pix em Formato E-mail**: Integração da chave `contacorrente166@gmail.com` diretamente na geração do payload do Pix.
- **Remoção de Texto Redundante**: Removido o rótulo com o texto "Chave PIX / Conta Corrente de Destino:" no recibo.
- **Exibição Limpa**: A interface do Pix exibe unicamente:
  1. Título "Pagamento via PIX"
  2. Instrução "Escaneie o QR Code abaixo com o app do seu banco:"
  3. QR Code gerado em Canvas
  4. Código Pix Copia e Cola
  5. Botão "Copiar Código PIX"
