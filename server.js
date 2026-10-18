const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registradora'
});

app.get('/status', (req, res) => {
    res.json({ status: 'online' });
});

app.post('/pedidos', (req, res) => {
    const { cliente, produto, quantidade, valor, total, pagamento, cartao_numero, cartao_titular, cartao_validade, cartao_cvv, assinatura, boleto_nome, boleto_documento, boleto_endereco } = req.body;
    const query = `INSERT INTO pedidos (cliente, produto, quantidade, valor_unitario, total, forma_pagamento, cartao_numero, cartao_titular, cartao_validade, cartao_cvv, assinatura, boleto_nome, boleto_documento, boleto_endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [cliente, produto, quantidade, valor, total, pagamento, cartao_numero, cartao_titular, cartao_validade, cartao_cvv, assinatura, boleto_nome, boleto_documento, boleto_endereco], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao salvar no banco' });
        }
        res.json({ message: 'Pedido salvo com sucesso', id: result.insertId });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});