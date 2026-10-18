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
    const tag53 = "5303986"; 
    
    const valorStr = (parseFloat(valorTotal) || 0.00).toFixed(2);
    const tag54 = "54" + String(valorStr.length).padStart(2, '0') + valorStr;
    
    const tag58 = "5802BR"; 
    const tag59 = "5925JOSE PAULO DE JESUS FERRE"; 
    const tag60 = "6015FEIRA DE SANTAN"; 
    const tag62 = "62070503***"; 
    
    let payloadSemCRC = tag00 + tag26 + tag52 + tag53 + tag54 + tag58 + tag59 + tag60 + tag62 + "6304";
    let crc = calcularCRC16(payloadSemCRC);
    
    return payloadSemCRC + crc;
}

let configApp = { 
    chave_pix: "dc529730-f4e4-4370-a87d-658ed8ab9eb9",
    chave_pix_alternativa: "",
    beneficiario: "JOSE PAULO DE JESUS FERRE",
    cidade: "FEIRA DE SANTAN",
    cnpj: "12.345.678/0001-90",
    agencia_conta: "1234 / 56789-0"
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

// CONTROLE DO CANVAS DE ASSINATURA CONFINADA
const canvas = document.getElementById("canvasAssinatura");
const ctx = canvas ? canvas.getContext("2d") : null;
let desenhando = false;

if (ctx && canvas) {
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0b2b26";
}

function obterPosicaoCursorClamped(e) {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    let posX = (clientX - rect.left) * (canvas.width / rect.width);
    let posY = (clientY - rect.top) * (canvas.height / rect.height);
    
    posX = Math.max(1, Math.min(canvas.width - 1, posX));
    posY = Math.max(1, Math.min(canvas.height - 1, posY));
    
    return { x: posX, y: posY };
}

function iniciarAssinatura(e) {
    if(!ctx) return;
    desenhando = true;
    ctx.beginPath();
    const pos = obterPosicaoCursorClamped(e);
    ctx.moveTo(pos.x, pos.y);
}

function desenhar(e) {
    if (!desenhando || !ctx) return;
    const pos = obterPosicaoCursorClamped(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function pararAssinatura() {
    if(ctx) ctx.closePath();
    desenhando = false;
}

if(canvas){
    canvas.addEventListener("mousedown", iniciarAssinatura);
    canvas.addEventListener("mousemove", desenhar);
    canvas.addEventListener("mouseup", pararAssinatura);
    canvas.addEventListener("mouseleave", pararAssinatura);

    canvas.addEventListener("touchstart", (e) => { iniciarAssinatura(e); e.preventDefault(); }, { passive: false });
    canvas.addEventListener("touchmove", (e) => { desenhar(e); e.preventDefault(); }, { passive: false });
    canvas.addEventListener("touchend", pararAssinatura);
}

const btnLimpar = document.getElementById("limparAssinatura");
if(btnLimpar && ctx && canvas){
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

function copiarPix(codigo) {
    navigator.clipboard.writeText(codigo).then(() => {
        const btn = document.getElementById("btnCopiarPix");
        if (btn) {
            const txtOriginal = btn.innerHTML;
            btn.innerHTML = "✅ Código PIX Copiado!";
            btn.classList.add("copiado");
            setTimeout(() => {
                btn.innerHTML = txtOriginal;
                btn.classList.remove("copiado");
            }, 2500);
        } else {
            alert("Código PIX copiado com sucesso!");
        }
    }).catch(() => {
        alert("Erro ao copiar. Selecione e copie manualmente o código.");
    });
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

    const dataVenc = new Date();
    dataVenc.setDate(dataVenc.getDate() + 3);
    const vencimentoStr = dataVenc.toLocaleDateString('pt-BR');

    let htmlPagamento = "";
    let dadosExtras = {};

    if (pagamento === "PIX") {
        const chavePix = configApp.chave_pix || "dc529730-f4e4-4370-a87d-658ed8ab9eb9";
        const pixCopiaECola = gerarPayloadPix(chavePix, total);
        
        htmlPagamento = `
        <div class="pix-card-remodelado">
            <div class="pix-header">
                <div class="pix-titulo-grupo">
                    <div class="pix-icon-badge">❖</div>
                    <div>
                        <h3>Pagamento via PIX</h3>
                        <p class="pix-subtitulo">Aprovação imediata e sem taxas</p>
                    </div>
                </div>
                <span class="pix-badge-status">Valor Fixo Inserido</span>
            </div>

            <div class="pix-corpo">
                <div class="pix-detalhes-info">
                    <div class="pix-info-row">
                        <span class="pix-label">Beneficiário:</span>
                        <span class="pix-valor">${configApp.beneficiario || "JOSE PAULO DE JESUS FERRE"}</span>
                    </div>
                    <div class="pix-info-row">
                        <span class="pix-label">Cidade:</span>
                        <span class="pix-valor">${configApp.cidade || "FEIRA DE SANTAN"}</span>
                    </div>
                    <div class="pix-info-row">
                        <span class="pix-label">Valor do Pagamento:</span>
                        <span class="pix-valor-destaque">R$ ${total.toFixed(2)}</span>
                    </div>
                </div>

                <div class="pix-qr-secao">
                    <p class="pix-instrucao">Aponte a câmera do seu aplicativo de banco para escanear:</p>
                    <div class="pix-qr-wrapper">
                        <div id="qrcode-container"></div>
                    </div>
                </div>

                <div class="pix-copia-secao">
                    <p class="pix-copia-instrucao">Ou utilize a opção <strong>Pix Copia e Cola</strong>:</p>
                    <div class="pix-copia-box">
                        <input type="text" readonly id="pixCodeText" value="${pixCopiaECola}" onclick="this.select();" />
                        <button type="button" id="btnCopiarPix" class="btn-pix-copiar" onclick="copiarPix('${pixCopiaECola}')">
                            📋 Copiar Código PIX
                        </button>
                    </div>
                </div>
            </div>
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
            <p style="margin-bottom: 8px;"><strong>Assinatura do Cliente:</strong></p>
            <div class="assinatura-preview">
                <img src="${assinaturaDataURL}" alt="Assinatura" />
            </div>
        </div>`;
        dadosExtras = { assinatura: assinaturaDataURL };

    } else if (pagamento === "Boleto") {
        const boleto_nome = (document.getElementById("boleto_nome") && document.getElementById("boleto_nome").value) ? document.getElementById("boleto_nome").value : cliente;
        const boleto_documento = (document.getElementById("boleto_documento") && document.getElementById("boleto_documento").value) ? document.getElementById("boleto_documento").value : "000.000.000-00";
        const boleto_endereco = (document.getElementById("boleto_endereco") && document.getElementById("boleto_endereco").value) ? document.getElementById("boleto_endereco").value : "Endereço não informado";

        const valorCentavos = Math.round(total * 100).toString().padStart(10, '0');
        const linhaDigitavel = `34191.09008 61234.567891 01234.567893 1 ${valorCentavos}`;
        const linhaDigitavelLimpa = linhaDigitavel.replace(/\./g, '').replace(/ /g, '');

        htmlPagamento = `
        <div class="pagamento-bloco boleto-container">
            <h3>Boleto Bancário para Pagamento</h3>
            
            <div class="boleto-box">
                <div class="boleto-header-banco">
                    <div class="banco-identificacao">
                        <span class="banco-logo">Itaú</span>
                        <span class="banco-codigo">341-7</span>
                    </div>
                    <span class="linha-digitavel">${linhaDigitavel}</span>
                </div>

                <div class="boleto-copiar-linha">
                    <span class="boleto-label">Número do Código de Barras / Linha Digitável:</span>
                    <div class="linha-digitavel-box">${linhaDigitavel}</div>
                    <button type="button" class="btn-secundario btn-copiar-linha" onclick="navigator.clipboard.writeText('${linhaDigitavelLimpa}'); alert('Linha digitável copiada!');">📋 Copiar Linha Digitável</button>
                </div>

                <div class="boleto-grid">
                    <div class="boleto-campo-full">
                        <span class="boleto-label">Beneficiário (Quem Recebe)</span>
                        <div class="boleto-valor-txt">${configApp.beneficiario || "JOSE PAULO DE JESUS FERRE"} | CNPJ: ${configApp.cnpj || "12.345.678/0001-90"}</div>
                    </div>

                    <div class="boleto-campo-full">
                        <span class="boleto-label">Pagador (Sacado)</span>
                        <div class="boleto-valor-txt">Nome: ${boleto_nome} | CPF/CNPJ: ${boleto_documento}</div>
                    </div>

                    <div class="boleto-campo">
                        <span class="boleto-label">Data do Documento</span>
                        <div class="boleto-valor-txt">${dataStr}</div>
                    </div>
                    <div class="boleto-campo">
                        <span class="boleto-label">Vencimento</span>
                        <div class="boleto-valor-txt">${vencimentoStr}</div>
                    </div>

                    <div class="boleto-campo-full">
                        <span class="boleto-label">Demonstrativo e Descrição do Produto / Serviço</span>
                        <div class="boleto-valor-txt demonstrativo-box">
                            • <strong>Item:</strong> ${produto}<br>
                            • <strong>Quantidade:</strong> ${quantidade} unidade(s)<br>
                            • <strong>Valor Unitário:</strong> R$ ${valor.toFixed(2)}<br>
                            • <strong>Subtotal do Item:</strong> R$ ${total.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div class="barcode-container">
                    <div class="barcode-lines"></div>
                    <span class="barcode-number">${linhaDigitavelLimpa}</span>
                </div>
            </div>
        </div>`;
        dadosExtras = { boleto_nome, boleto_documento, boleto_endereco };
    }

    recibo.style.display = "block";
    recibo.innerHTML = `
        <div class="recibo-card">
            <div class="recibo-header">
                <h2>Comprovante do Pedido</h2>
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
                    width: 190,
                    height: 190,
                    colorDark: "#0b2b26",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
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