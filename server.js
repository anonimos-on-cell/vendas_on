const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registradora'
});

db.connect(err => {
    if (err) {
        console.log('Banco de dados offline ou não configurado localmente.');
    } else {
        console.log('Conectado ao MySQL com sucesso.');
    }
});

app.post('/api/pedidos', (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO pedidos (cliente, produto, quantidade, valor_unitario, total, forma_pagamento, cartao_numero, cartao_titular, cartao_validade, cartao_cvv, assinatura, boleto_nome, boleto_documento, boleto_endereco)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
        data.cliente, data.produto, data.quantidade, data.valor_unitario, data.total,
        data.forma_pagamento, data.cartao_numero || null, data.cartao_titular || null,
        data.cartao_validade || null, data.cartao_cvv || null, data.assinatura || null,
        data.boleto_nome || null, data.boleto_documento || null, data.boleto_endereco || null
    ];

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
