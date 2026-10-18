// Função para calcular o CRC16 (CCITT-FALSE / 0x1021) do BR Code Pix conforme especificação do Bacen
function calcularCRC16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= (str.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    let hex = (crc & 0xFFFF).toString(16).toUpperCase();
    return hex.padStart(4, '0');
}

// Função para gerar o payload EMV do Pix com Valor Total Obrigatório (Tag 54)
function gerarPayloadPix(chavePix, valorTotal) {
    const gui = "0014BR.GOV.BCB.PIX";
    const chave = "01" + String(chavePix.length).padStart(2, '0') + chavePix;
    const merchantAccountInfo = gui + chave;
    const tag26 = "26" + String(merchantAccountInfo.length).padStart(2, '0') + merchantAccountInfo;
    
    const tag00 = "000201"; 
    const tag52 = "52040000"; 
    const tag53 = "5303986"; // BRL (Real)
    
    // Tag 54: Insere o valor total formatado obrigatoriamente
    const valorStr = (parseFloat(valorTotal) || 0.00).toFixed(2);
    const tag54 = "54" + String(valorStr.length).padStart(2, '0') + valorStr;
    
    const tag58 = "5802BR"; 
    const tag59 = "5925JOSE PAULO DE JESUS FERRE"; 
    const tag60 = "6015FEIRA DE SANTAN"; // Cidade ajustada
    const tag62 = "62070503***"; // TXID padrão genérico seguro
    
    let payloadSemCRC = tag00 + tag26 + tag52 + tag53 + tag54 + tag58 + tag59 + tag60 + tag62 + "6304";
    let crc = calcularCRC16(payloadSemCRC);
    
    return payloadSemCRC + crc;
}

let configApp = { 
    chave_pix: "dc529730-f4e4-4370-a87d-658ed8ab9eb9",
    chave_pix_alternativa: ""
};

let servidorAtivo = false;

async function carregarConfiguracoes() {
    try {
        const res = await fetch("config.json");
        if (res.ok) {
            const data = await res.json();
            configApp = { ...configApp, ...data };
        }
    } catch (e) {
        console.warn("Não foi possível carregar config.json, usando padrão.", e);
    }
}

async function verificarServidor() {
    try {
        const res = await fetch("http://localhost:3000/status", { method: "GET" });
        servidorAtivo = res.ok;
    } catch (e) {
        servidorAtivo = false;
    }
}

carregarConfiguracoes();
verificarServidor();

const form = document.getElementById("pedidoForm");
const recibo = document.getElementById("recibo");
const selectPagamento = document.getElementById("pagamento");

const camposCartao = document.getElementById("campos-cartao");
const camposDinheiro = document.getElementById("campos-dinheiro");
const camposBoleto = document.getElementById("campos-boleto");

let numeroPedido = 1000;

const canvas = document.getElementById("canvasAssinatura");
const ctx = canvas ? canvas.getContext("2d") : null;
let desenhando = false;

function iniciarAssinatura(e) {
    if(!ctx) return;
    desenhando = true;
    ctx.beginPath();
    const pos = obterPosicaoCursor(e);
    ctx.moveTo(pos.x, pos.y);
}

function desenhar(e) {
    if (!desenhando || !ctx) return;
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

if(canvas){
    canvas.addEventListener("mousedown", iniciarAssinatura);
    canvas.addEventListener("mousemove", desenhar);
    canvas.addEventListener("mouseup", pararAssinatura);
    canvas.addEventListener("mouseleave", pararAssinatura);

    canvas.addEventListener("touchstart", (e) => { iniciarAssinatura(e); e.preventDefault(); });
    canvas.addEventListener("touchmove", (e) => { desenhar(e); e.preventDefault(); });
    canvas.addEventListener("touchend", pararAssinatura);
}

const btnLimpar = document.getElementById("limparAssinatura");
if(btnLimpar && ctx){
    btnLimpar.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

selectPagamento.addEventListener("change", function() {
    const valor = this.value;
    if(camposCartao) camposCartao.style.display = valor === "Cartão" ? "block" : "none";
    if(camposDinheiro) camposDinheiro.style.display = valor === "Dinheiro" ? "block" : "none";
    if(camposBoleto) camposBoleto.style.display = valor === "Boleto" ? "block" : "none";
});

function imprimirApenasRecibo() {
    window.print();
}

form.addEventListener("submit", async function(e){
    e.preventDefault();
    numeroPedido++;

    await verificarServidor();

    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    const quantidade = parseFloat(document.getElementById("quantidade").value);
    const valor = parseFloat(document.getElementById("valor").value);
    const pagamento = selectPagamento.value;
    const total = quantidade * valor;
    const dataObj = new Date();
    const dataStr = dataObj.toLocaleDateString('pt-BR');
    const horaStr = dataObj.toLocaleTimeString('pt-BR');

    let htmlPagamento = "";
    let dadosExtras = {};

    if (pagamento === "PIX") {
        const chavePix = configApp.chave_pix || "dc529730-f4e4-4370-a87d-658ed8ab9eb9";
        const pixCopiaECola = gerarPayloadPix(chavePix, total);
        
        htmlPagamento = `
        <div class="pagamento-bloco pix-container">
            <h3>Pagamento via PIX (Valor Fixo)</h3>
            <p class="pix-instrucao">Escaneie o QR Code abaixo. O valor exato de <strong>R$ ${total.toFixed(2)}</strong> já está integrado:</p>
            <div id="qrcode-wrapper">
                <div id="qrcode-container"></div>
            </div>
            <p class="pix-copia-titulo">Código PIX Copia e Cola:</p>
            <div class="pix-copia-cola" id="pixCodeText">${pixCopiaECola}</div>
            <button type="button" class="btn-secundario btn-copiar-pix" onclick="navigator.clipboard.writeText('${pixCopiaECola}'); alert('Código PIX copiado!');">Copiar Código PIX</button>
        </div>`;

    } else if (pagamento === "Cartão") {
        const cartao_numero = document.getElementById("cartao_numero") ? document.getElementById("cartao_numero").value : "4000 1234 5678 9010";
        const cartao_titular = document.getElementById("cartao_titular") ? document.getElementById("cartao_titular").value : cliente;
        const cartao_validade = document.getElementById("cartao_validade") ? document.getElementById("cartao_validade").value : "12/28";
        const cartao_cvv = document.getElementById("cartao_cvv") ? document.getElementById("cartao_cvv").value : "852";

        htmlPagamento = `
        <div class="pagamento-bloco">
            <h3>Detalhes do Cartão</h3>
            <div class="detalhe-grid">
                <span>Número:</span> <strong>${cartao_numero}</strong>
                <span>Titular:</span> <strong>${cartao_titular}</strong>
                <span>Validade:</span> <strong>${cartao_validade}</strong>
                <span>CVV:</span> <strong>${cartao_cvv}</strong>
            </div>
        </div>`;
        dadosExtras = { cartao_numero, cartao_titular, cartao_validade, cartao_cvv };

    } else if (pagamento === "Dinheiro") {
        const assinaturaDataURL = canvas ? canvas.toDataURL() : "";
        htmlPagamento = `
        <div class="pagamento-bloco">
            <h3>Pagamento em Dinheiro</h3>
            <p><strong>Assinatura do Cliente:</strong></p>
            <div class="assinatura-preview">
                <img src="${assinaturaDataURL}" alt="Assinatura" />
            </div>
        </div>`;
        dadosExtras = { assinatura: assinaturaDataURL };

    } else if (pagamento === "Boleto") {
        htmlPagamento = `
        <div class="pagamento-bloco">
            <h3>Boleto Bancário</h3>
            <p><strong>Valor do Documento:</strong> R$ ${total.toFixed(2)}</p>
        </div>`;
    }

    recibo.style.display = "block";
    recibo.innerHTML = `
        <div class="recibo-card">
            <div class="recibo-header">
                <h2>Comprovante de Pedido</h2>
                <span class="badge-pedido">#${numeroPedido}</span>
            </div>
            
            <div class="acoes-recibo">
                <button type="button" class="btn-imprimir" onclick="imprimirApenasRecibo()">🖨️ Imprimir Recibo</button>
            </div>

            <div class="recibo-info-grid">
                <div class="info-item">
                    <span class="info-label">Data e Hora</span>
                    <span class="info-value">${dataStr} às ${horaStr}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cliente</span>
                    <span class="info-value">${cliente}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Produto</span>
                    <span class="info-value">${produto}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Quantidade</span>
                    <span class="info-value">${quantidade}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Valor Unitário</span>
                    <span class="info-value">R$ ${valor.toFixed(2)}</span>
                </div>
                <div class="info-item total-highlight">
                    <span class="info-label">Total a Pagar</span>
                    <span class="info-value">R$ ${total.toFixed(2)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Forma de Pagamento</span>
                    <span class="info-value">${pagamento}</span>
                </div>
            </div>

            ${htmlPagamento}
        </div>
    `;

    if (pagamento === "PIX") {
        setTimeout(() => {
            const qrContainer = document.getElementById("qrcode-container");
            if (qrContainer) {
                qrContainer.innerHTML = "";
                const chavePix = configApp.chave_pix || "dc529730-f4e4-4370-a87d-658ed8ab9eb9";
                const qrPixCode = gerarPayloadPix(chavePix, total);
                new QRCode(qrContainer, {
                    text: qrPixCode,
                    width: 180,
                    height: 180
                });
            }
        }, 100);
    }

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
        console.log("Servidor offline ou erro no envio:", err);
    }
}