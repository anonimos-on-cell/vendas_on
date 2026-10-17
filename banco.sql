CREATE DATABASE registradora;

USE registradora;

CREATE TABLE pedidos (

id INT AUTO_INCREMENT PRIMARY KEY,

numero_pedido INT NOT NULL,

cliente VARCHAR(100),

produto VARCHAR(100),

quantidade INT,

valor_unitario DECIMAL(10,2),

total DECIMAL(10,2),

forma_pagamento VARCHAR(30),

data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);