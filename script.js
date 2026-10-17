const form = document.getElementById("pedidoForm");
const recibo = document.getElementById("recibo");
const selectPagamento = document.getElementById("pagamento");

const camposCartao = document.getElementById("campos-cartao");
const camposDinheiro = document.getElementById("campos-dinheiro");
const camposBoleto = document.getElementById("campos-boleto");

let numeroPedido = 1000;

// Configuração do Canvas para assinatura
const canvas = document.getElementById("canvasAssinatura");
const ctx = canvas.getContext("2d");
let desenhando = false;

function iniciarAssinatura(e) {
    desenhando = true;
    ctx.beginPath();
    const pos = obterPosicaoCursor(e);
    ctx.moveTo(pos.x, pos.y);
}

function desenhar(e) {
    if (!desenhando) return;
    const pos = obterPosicaoCursor(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function pararAssinatura() {
    desenhando = false;
}

function obterPosicaoCursor(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

canvas.addEventListener("mousedown", iniciarAssinatura);
canvas.addEventListener("mousemove", desenhar);
canvas.addEventListener("mouseup", pararAssinatura);
canvas.addEventListener("mouseleave", pararAssinatura);

canvas.addEventListener("touchstart", (e) => { iniciarAssinatura(e); e.preventDefault(); });
canvas.addEventListener("touchmove", (e) => { desenhar(e); e.preventDefault(); });
canvas.addEventListener("touchend", pararAssinatura);

document.getElementById("limparAssinatura").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Alternar campos dinâmicos baseados na forma de pagamento
selectPagamento.addEventListener("change", function() {
    const valor = this.value;
    camposCartao.style.display = valor === "Cartão" ? "block" : "none";
    camposDinheiro.style.display = valor === "Dinheiro" ? "block" : "none";
    camposBoleto.style.display = valor === "Boleto" ? "block" : "none";
});

form.addEventListener("submit", function(e){
    e.preventDefault();
    numeroPedido++;

    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    const quantidade = parseFloat(document.getElementById("quantidade").value);
    const valor = parseFloat(document.getElementById("valor").value);
    const pagamento = selectPagamento.value;
    const total = quantidade * valor;
    const data = new Date();

    let detalhesPagamentoTexto = "";
    let dadosExtras = {};

    if (pagamento === "Cartão") {
        const cartao_numero = document.getElementById("cartao_numero").value;
        const cartao_titular = document.getElementById("cartao_titular").value;
        const cartao_validade = document.getElementById("cartao_validade").value;
        const cartao_cvv = document.getElementById("cartao_cvv").value;

        detalhesPagamentoTexto = `
Cartão Virtual: ${cartao_numero}
Titular: ${cartao_titular}
Validade: ${cartao_validade}
CVV Dinâmico: ${cartao_cvv}`;

        dadosExtras = { cartao_numero, cartao_titular, cartao_validade, cartao_cvv };
    } else if (pagamento === "Dinheiro") {
        const assinatura = canvas.toDataURL();
        detalhesPagamentoTexto = `Assinatura do Cliente: [Registrada Digitalmente]`;
        dadosExtras = { assinatura };
    } else if (pagamento === "Boleto") {
        const boleto_nome = document.getElementById("boleto_nome").value;
        const boleto_documento = document.getElementById("boleto_documento").value;
        const boleto_endereco = document.getElementById("boleto_endereco").value;

        detalhesPagamentoTexto = `
Pagador: ${boleto_nome}
Documento (CPF/CNPJ): ${boleto_documento}
Endereço: ${boleto_endereco}`;

        dadosExtras = { boleto_nome, boleto_documento, boleto_endereco };
    }

    recibo.innerHTML = `
============================
RECIBO DE VENDA
Pedido Nº ${numeroPedido}

Data: ${data.toLocaleDateString()}
Hora: ${data.toLocaleTimeString()}

Cliente: ${cliente}
Produto: ${produto}
Quantidade: ${quantidade}
Valor Unitário: R$ ${valor.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}

Forma de Pagamento: ${pagamento}
${detalhesPagamentoTexto}

Obrigado pela preferência!
============================
`;

    salvarPedido({
        cliente,
        produto,
        quantidade,
        valor,
        total,
        pagamento,
        ...dadosExtras
    });
});

async function salvarPedido(dados){
    try{
        await fetch("http://localhost:3000/pedidos",{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify(dados)
        });
    }catch(err){
        console.log(err);
    }
}