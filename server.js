const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "registradora"
});

app.post("/pedidos", (req, res) => {
    const {
        cliente,
        produto,
        quantidade,
        valor,
        total,
        pagamento,
        cartao_numero,
        cartao_titular,
        cartao_validade,
        cartao_cvv,
        assinatura,
        boleto_nome,
        boleto_documento,
        boleto_endereco
    } = req.body;

    const sql = `
        INSERT INTO pedidos
        (cliente, produto, quantidade, valor_unitario, total, forma_pagamento, 
         cartao_numero, cartao_titular, cartao_validade, cartao_cvv, 
         assinatura, boleto_nome, boleto_documento, boleto_endereco)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        cliente,
        produto,
        quantidade,
        valor,
        total,
        pagamento,
        cartao_numero || null,
        cartao_titular || null,
        cartao_validade || null,
        cartao_cvv || null,
        assinatura || null,
        boleto_nome || null,
        boleto_documento || null,
        boleto_endereco || null
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao salvar pedido" });
        }
        res.json({ mensagem: "Pedido salvo com sucesso!" });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});