const form = document.getElementById("pedidoForm");
const recibo = document.getElementById("recibo");

let numeroPedido = 1000;

form.addEventListener("submit", function(e){

e.preventDefault();

numeroPedido++;

const cliente =
document.getElementById("cliente").value;

const produto =
document.getElementById("produto").value;

const quantidade =
parseFloat(document.getElementById("quantidade").value);

const valor =
parseFloat(document.getElementById("valor").value);

const pagamento =
document.getElementById("pagamento").value;

const total = quantidade * valor;

const data = new Date();

recibo.innerHTML = `

============================

RECIBO DE VENDA

Pedido Nº ${numeroPedido}

Data:
${data.toLocaleDateString()}

Hora:
${data.toLocaleTimeString()}

Cliente:
${cliente}

Produto:
${produto}

Quantidade:
${quantidade}

Valor Unitário:
R$ ${valor.toFixed(2)}

TOTAL:
R$ ${total.toFixed(2)}

Pagamento:
${pagamento}

Obrigado pela preferência!

============================
`;

salvarPedido({
cliente,
produto,
quantidade,
valor,
total,
pagamento
});

});

async function salvarPedido(dados){

try{

await fetch("http://localhost:3000/pedidos",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(dados)

});

}catch(err){

console.log(err);

}

}