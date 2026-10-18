# Registro de Mudanças no Código (Changelog) - Versão v3.9.0

## Versão v3.9.0
- **Atualização da Chave PIX e Payload EMV**:
  - Chave Pix atualizada para a nova chave aleatória: `dfd6038c-64a7-4143-b17b-3eced0fba32a`.
  - Implementado o cálculo dinâmico de checksum CRC16 (polinômio 0x1021) conforme especificação oficial do Banco Central do Brasil (BR Code EMV) no `script.js`.
  - QR Code e Copiar Código PIX gerados no formato EMV padronizado com valor dinâmico/estático aceito por aplicativos bancários.