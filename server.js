const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/pedidos', (req, res) => {
    console.log("Pedido recebido:", req.body);
    res.status(201).json({ status: "sucesso", mensagem: "Pedido registrado com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
