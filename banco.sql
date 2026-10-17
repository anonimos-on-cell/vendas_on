CREATE DATABASE registradora;

USE registradora;

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100),
    produto VARCHAR(100),
    quantidade INT,
    valor_unitario DECIMAL(10,2),
    total DECIMAL(10,2),
    forma_pagamento VARCHAR(30),
    
    -- Campos específicos para Cartão
    cartao_numero VARCHAR(20),
    cartao_titular VARCHAR(100),
    cartao_validade VARCHAR(10),
    cartao_cvv VARCHAR(10),
    
    -- Campo para Dinheiro (Assinatura em Base64 / LongText)
    assinatura LONGTEXT,
    
    -- Campos específicos para Boleto
    boleto_nome VARCHAR(150),
    boleto_documento VARCHAR(30),
    boleto_endereco TEXT,
    
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);