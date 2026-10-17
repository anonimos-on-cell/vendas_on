const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

host:"localhost",
user:"root",
password:"",
database:"registradora"

});

app.post("/pedidos",(req,res)=>{

const {

cliente,
produto,
quantidade,
valor,
total,
pagamento

} = req.body;

const sql = `
INSERT INTO pedidos
(cliente,produto,quantidade,valor_unitario,total,forma_pagamento)
VALUES (?,?,?,?,?,?)
`;

db.query(sql,[
cliente,
produto,
quantidade,
valor,
total,
pagamento
]);

res.json({
mensagem:"Pedido salvo!"
});

});

app.listen(3000,()=>{
console.log("Servidor rodando");
});