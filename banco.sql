CREATE DATABASE IF NOT EXISTS registradora;
USE registradora;
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100),
    produto VARCHAR(100),
    quantidade INT,
    valor_unitario DECIMAL(10,2),
    total DECIMAL(10,2),
    forma_pagamento VARCHAR(30),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);