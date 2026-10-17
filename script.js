// Carregar configurações dinâmicas (Chave PIX, Beneficiário, etc.)
let Beneficiado = {Destinatario: "Jose_paulo_de_Jesus_Ferreira"};
let configApp = { chave_pix: "contacorrente166@gmail.com" };

async function carregarConfiguracoes() {
    try {
        const res = await fetch("config.json");
        if (res.ok) {
            configApp = await res.json();
        }
    } catch (e) {
        console.warn("Não foi possível carregar config.json, usando padrão.", e);
    }
}
carregarConfiguracoes();

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
    const dataObj = new Date();
    const dataStr = dataObj.toLocaleDateString('pt-BR');
    const horaStr = dataObj.toLocaleTimeString('pt-BR');

    const dataVenc = new Date();
    dataVenc.setDate(dataVenc.getDate() + 3);
    const vencimentoStr = dataVenc.toLocaleDateString('pt-BR');

    let htmlPagamento = "";
    let dadosExtras = {};

    if (pagamento === "PIX") {
        const chavePix = configApp.chave_pix || "contacorrente166@gmail.com";
        const pixCopiaECola = `00020126580014BR.GOV.BCB.PIX0136${chavePix}5204000053039865405${total.toFixed(2)}5802BR5920Empresa Vendedora6009SAO PAULO62070503***6304E2CA`;
        
        htmlPagamento = `
        <div class="pagamento-bloco pix-container">
            <h3>Pagamento via PIX</h3>
            <p style="margin-bottom: 15px;">Escaneie o QR Code abaixo com o app do seu banco:</p>
            <div id="qrcode-container"></div>
            <p style="font-weight: bold; margin-top: 15px; margin-bottom: 8px;">Código PIX Copia e Cola:</p>
            <div class="pix-copia-cola" id="pixCodeText">${pixCopiaECola}</div>
            <button type="button" class="btn-secundario" onclick="navigator.clipboard.writeText('${pixCopiaECola}'); alert('Código PIX copiado!');">Copiar Código PIX</button>
        </div>`;

    } else if (pagamento === "Cartão") {
        const cartao_numero = document.getElementById("cartao_numero").value || "4000 1234 5678 9010";
        const cartao_titular = document.getElementById("cartao_titular").value || cliente;
        const cartao_validade = document.getElementById("cartao_validade").value || "12/28";
        const cartao_cvv = document.getElementById("cartao_cvv").value || "852";

        htmlPagamento = `
        <div class="pagamento-bloco cartao-detalhes">
            <h3>Detalhes do Pagamento com Cartão Virtual</h3>
            <p>• <strong>Número do Cartão Virtual:</strong> ${cartao_numero}</p>
            <p>• <strong>Nome do Titular:</strong> ${cartao_titular}</p>
            <p>• <strong>Data de Validade:</strong> ${cartao_validade}</p>
            <p>• <strong>CVV Dinâmico (Código de Segurança):</strong> ${cartao_cvv}</p>
        </div>`;

        dadosExtras = { cartao_numero, cartao_titular, cartao_validade, cartao_cvv };

    } else if (pagamento === "Dinheiro") {
        const assinaturaDataURL = canvas ? canvas.toDataURL() : "";

        htmlPagamento = `
        <div class="pagamento-bloco">
            <h3>Pagamento em Dinheiro</h3>
            <p><strong>Assinatura de Confirmação do Cliente:</strong></p>
            <div class="assinatura-preview">
                <img src="${assinaturaDataURL}" alt="Assinatura do Cliente" />
            </div>
        </div>`;

        dadosExtras = { assinatura: assinaturaDataURL };

    } else if (pagamento === "Boleto") {
        const boleto_nome = document.getElementById("boleto_nome").value || cliente;
        const boleto_documento = document.getElementById("boleto_documento").value || "000.000.000-00";
        const boleto_endereco = document.getElementById("boleto_endereco").value || "Rua Exemplo, 123 - Centro";

        const nossoNumero = `341/98765432-1`;
        const numeroDocumento = `PED-${numeroPedido}`;
        const linhaDigitavel = "34191.09008 61234.567891 01234.567893 1 96540000" + Math.floor(total * 100);

        htmlPagamento = `
        <div class="pagamento-bloco">
            <h3>Boleto Bancário de Cobrança</h3>
            <div class="boleto-box">
                <div class="boleto-header-banco">
                    <span class="banco-logo">Itaú</span>
                    <span class="banco-codigo">341-7</span>
                    <span class="linha-digitavel">${linhaDigitavel}</span>
                </div>

                <div class="boleto-grid">
                    <div class="boleto-campo-full">
                        <span class="boleto-label">2. Beneficiário (Quem Recebe)</span>
                        <div class="boleto-valor-txt">${configApp.beneficiario || "Empresa Vendedora Ltda."} | CNPJ: ${configApp.cnpj || "12.345.678/0001-90"}</div>
                        <span class="boleto-label" style="margin-top:4px;">Agência / Código Beneficiário</span>
                        <div class="boleto-valor-txt">${configApp.agencia_conta || "1234 / 56789-0"}</div>
                    </div>

                    <div class="boleto-campo-full">
                        <span class="boleto-label">3. Pagador (Sacado)</span>
                        <div class="boleto-valor-txt">Nome: ${boleto_nome}</div>
                        <div class="boleto-valor-txt">Documento (CPF/CNPJ): ${boleto_documento}</div>
                        <div class="boleto-valor-txt">Endereço: ${boleto_endereco}</div>
                    </div>

                    <div class="boleto-campo">
                        <span class="boleto-label">Data do Documento</span>
                        <div class="boleto-valor-txt">${dataStr}</div>
                    </div>
                    <div class="boleto-campo">
                        <span class="boleto-label">Data de Vencimento</span>
                        <div class="boleto-valor-txt">${vencimentoStr}</div>
                    </div>
                    <div class="boleto-campo">
                        <span class="boleto-label">Data de Processamento</span>
                        <div class="boleto-valor-txt">${dataStr}</div>
                    </div>
                    <div class="boleto-campo">
                        <span class="boleto-label">Valor do Documento</span>
                        <div class="boleto-valor-txt">R$ ${total.toFixed(2)}</div>
                    </div>
                    <div class="boleto-campo">
                        <span class="boleto-label">Nosso Número</span>
                        <div class="boleto-valor-txt">${nossoNumero}</div>
                    </div>
                    <div class="boleto-campo">
                        <span class="boleto-label">Nº do Documento</span>
                        <div class="boleto-valor-txt">${numeroDocumento}</div>
                    </div>

                    <div class="boleto-campo-full">
                        <span class="boleto-label">5. Instruções e Condições</span>
                        <div class="boleto-valor-txt">
                            • Após o vencimento, cobrar juros de R$ 0,50 por dia e multa de 2%.<br>
                            • Não receber após 30 dias do vencimento.<br>
                            • Descontos / Abatimentos / Juros / Multa: Conforme contrato.
                        </div>
                    </div>
                </div>

                <div class="barcode-container">
                    <span class="boleto-label">Código de Barras</span>
                    <div class="barcode-lines"></div>
                </div>
            </div>
        </div>`;

        dadosExtras = { boleto_nome, boleto_documento, boleto_endereco };
    }

    recibo.style.display = "block";
    recibo.innerHTML = `
        <div class="recibo-header">
            <h2>RECIBO DE VENDA</h2>
            <p><strong>Pedido Nº ${numeroPedido}</strong></p>
        </div>
        <div class="recibo-info">
            <p><strong>Data:</strong> ${dataStr} às ${horaStr}</p>
            <p><strong>Cliente:</strong> ${cliente}</p>
            <p><strong>Produto:</strong> ${produto}</p>
            <p><strong>Quantidade:</strong> ${quantidade}</p>
            <p><strong>Valor Unitário:</strong> R$ ${valor.toFixed(2)}</p>
            <p><strong>TOTAL:</strong> R$ ${total.toFixed(2)}</p>
            <p><strong>Forma de Pagamento Selecionada:</strong> ${pagamento}</p>
        </div>
        ${htmlPagamento}
    `;

    if (pagamento === "PIX") {
        setTimeout(() => {
            const qrContainer = document.getElementById("qrcode-container");
            if (qrContainer) {
                qrContainer.innerHTML = "";
                const chavePix = configApp.chave_pix || "contacorrente166@gmail.com";
                const pixCode = `00020126580014BR.GOV.BCB.PIX0136${chavePix}5204000053039865405${total.toFixed(2)}5802BR5920Empresa Vendedora6009SAO PAULO62070503***6304E2CA`;
                new QRCode(qrContainer, {
                    text: pixCode,
                    width: 160,
                    height: 160
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
