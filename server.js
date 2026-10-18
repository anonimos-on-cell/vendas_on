const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/status', (req, res) => res.json({ status: 'online' }));
app.post('/pedidos', (req, res) => res.json({ message: 'Sucesso' }));
app.listen(3000, () => console.log('Servidor na porta 3000'));