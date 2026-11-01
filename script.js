// Função para calcular o CRC16 do BR Code Pix
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
    beneficiario: "JOSE PAULO DE JESUS FERRE",
    cnpj: "12.345.678/0001-90",
    agencia_conta: "1234 / 56789-0"
};

async function carregarConfiguracoes() {
    try {
        const res = await fetch("config.json");
        if (res.ok) {
            const data = await res.json();
            configApp = { ...configApp, ...data };
        }
    } catch (e) {
        console.warn("Usando configuração padrão.", e);
    }
}
carregarConfiguracoes();

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("pedidoForm");
    const selectPagamento = document.getElementById("pagamento");
    const camposCartao = document.getElementById("campos-cartao");
    const camposBoleto = document.getElementById("campos-boleto");
    const recibo = document.getElementById("recibo");

    let numeroPedido = 1000;

    selectPagamento.addEventListener("change", function() {
        const valor = this.value;
        camposCartao.style.display = valor === "Cartão" ? "block" : "none";
        camposBoleto.style.display = valor === "Boleto" ? "block" : "none";
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // 1. VALIDAÇÃO DOS 4 CAMPOS SUPERIORES DO PEDIDO
        const clienteInput = document.getElementById("cliente");
        const produtoInput = document.getElementById("produto");
        const quantidadeInput = document.getElementById("quantidade");
        const valorInput = document.getElementById("valor");

        const cliente = clienteInput.value.trim();
        const produto = produtoInput.value.trim();
        const quantidadeVal = parseInt(quantidadeInput.value);
        const valorUnitarioVal = parseFloat(valorInput.value);

        if (!cliente || !produto || isNaN(quantidadeVal) || quantidadeVal <= 0 || isNaN(valorUnitarioVal) || valorUnitarioVal <= 0) {
            alert("Por favor, preencha corretamente os 4 campos do pedido (Nome do Cliente, Produto, Quantidade válida e Valor Unitário) antes de prosseguir.");
            return;
        }

        const formaPagamento = selectPagamento.value;
        if (!formaPagamento) {
            alert("Por favor, selecione uma forma de pagamento.");
            return;
        }

        // 2. VALIDAÇÃO DOS CAMPOS ESPECÍFICOS DE PAGAMENTO
        if (formaPagamento === "Cartão") {
            const numCartao = document.getElementById("cartao_numero").value.trim();
            const titular = document.getElementById("cartao_titular").value.trim();
            const validade = document.getElementById("cartao_validade").value.trim();
            const cvv = document.getElementById("cartao_cvv").value.trim();

            if (!numCartao || !titular || !validade || !cvv) {
                alert("Por favor, preencha todos os dados do Cartão Virtual (Número, Titular, Validade e CVV) antes de prosseguir.");
                return;
            }
        } else if (formaPagamento === "Boleto") {
            const bolNome = document.getElementById("boleto_nome").value.trim();
            const bolDoc = document.getElementById("boleto_documento").value.trim();
            const bolEnd = document.getElementById("boleto_endereco").value.trim();

            if (!bolNome || !bolDoc || !bolEnd) {
                alert("Por favor, preencha todas as informações do Pagador para o Boleto (Nome, CPF/CNPJ e Endereço) antes de prosseguir.");
                return;
            }
        }

        numeroPedido++;
        const total = (quantidadeVal * valorUnitarioVal).toFixed(2);

        // Limpa recibo anterior
        recibo.innerHTML = "";
        recibo.style.display = "block";

        // 3. MONTAGEM DO RECIBO (EXIBE A ASSINATURA E A FORMA DE PAGAMENTO EM SEGUIDA)
        let htmlRecibo = `
            <div class="secao-recibo">
                <h2>Resumo do Pedido #${numeroPedido}</h2>
                <div class="detalhes-pedido">
                    <p><strong>Cliente:</strong> ${cliente}</p>
                    <p><strong>Produto:</strong> ${produto} (x${quantidadeVal})</p>
                    <p><strong>Valor Total:</strong> R$ ${total}</p>
                    <p><strong>Forma de Pagamento:</strong> ${formaPagamento}</p>
                </div>
            </div>

            <!-- QUADRO DE ASSINATURA (Liberado após validação dos campos) -->
            <div class="secao-recibo">
                <h2>Assinatura de Confirmação do Cliente</h2>
                <p style="font-size:13px; color:#4a5568; margin-bottom:8px;">
                    Assine dentro do quadro abaixo para confirmar e validar legalmente este pedido:
                </p>
                <div class="canvas-container">
                    <canvas id="canvasAssinatura" width="400" height="150"></canvas>
                </div>
                <button type="button" id="limparAssinatura" class="btn-secundario">Limpar Assinatura</button>
            </div>

            <!-- DETALHAMENTO DA FORMA DE PAGAMENTO -->
            <div class="secao-recibo" id="bloco-forma-pagamento">
                <h2>Detalhamento do Pagamento</h2>
        `;

        if (formaPagamento === "PIX") {
            const payloadPix = gerarPayloadPix(configApp.chave_pix, total);
            htmlRecibo += `
                <div class="pix-container">
                    <h3 style="font-size:16px; margin-bottom:8px;">Pagamento via PIX</h3>
                    <p style="font-size:13px; color:#4a5568;">Escaneie o QR Code abaixo com o app do seu banco:</p>
                    <div id="qrcode" style="display:flex; justify-content:center; margin:15px 0;"></div>
                    <p style="font-size:13px; font-weight:bold;">Código PIX Copia e Cola:</p>
                    <div class="pix-code-box" id="pixCodeText">${payloadPix}</div>
                    <button type="button" class="btn-secundario" id="btnCopiarPix">Copiar Código PIX</button>
                </div>
            `;
        } else if (formaPagamento === "Cartão") {
            const cartaoNum = document.getElementById("cartao_numero").value.trim();
            const cartaoTitular = document.getElementById("cartao_titular").value.trim();
            const cartaoVal = document.getElementById("cartao_validade").value.trim();
            
            htmlRecibo += `
                <div class="detalhes-pedido">
                    <h3 style="font-size:16px; margin-bottom:8px;">Pagamento com Cartão de Crédito / Débito</h3>
                    <p><strong>Número do Cartão:</strong> ${cartaoNum}</p>
                    <p><strong>Titular:</strong> ${cartaoTitular}</p>
                    <p><strong>Validade:</strong> ${cartaoVal}</p>
                    <p><strong>Status:</strong> Aprovado e Processado com Sucesso</p>
                </div>
            `;
        } else if (formaPagamento === "Boleto") {
            const bolNome = document.getElementById("boleto_nome").value.trim();
            const bolDoc = document.getElementById("boleto_documento").value.trim();
            const bolEnd = document.getElementById("boleto_endereco").value.trim();
            const linhaDigitavel = "34191.79001 01043.510047 91020.150008 8 95000000" + Math.floor(total * 100);

            htmlRecibo += `
                <div class="boleto-box">
                    <div class="boleto-header">
                        <h3>Itaú | 341-7</h3>
                        <span class="boleto-linha-digitavel">${linhaDigitavel}</span>
                    </div>
                    <div class="boleto-grid">
                        <div class="boleto-field">
                            <label>Beneficiário</label>
                            <strong>${configApp.beneficiario}</strong><br>CNPJ: ${configApp.cnpj}
                        </div>
                        <div class="boleto-field">
                            <label>Agência / Código Beneficiário</label>
                            <strong>${configApp.agencia_conta}</strong>
                        </div>
                        <div class="boleto-field">
                            <label>Pagador (Sacado)</label>
                            <strong>${bolNome}</strong><br>CPF/CNPJ: ${bolDoc}<br>${bolEnd}
                        </div>
                        <div class="boleto-field">
                            <label>Valor do Documento</label>
                            <strong>R$ ${total}</strong>
                        </div>
                    </div>
                    <div class="barcode-container">
                        <div class="barcode"></div>
                        <span style="font-size:11px; color:#555;">${linhaDigitavel}</span>
                    </div>
                    <div class="boleto-copiar-linha">
                        <p style="font-size:12px; margin-bottom:5px;"><strong>Número do Código de Barras / Linha Digitável:</strong></p>
                        <button type="button" class="btn-secundario" onclick="navigator.clipboard.writeText('${linhaDigitavel}'); alert('Linha digitável copiada!');">Copiar Linha Digitável</button>
                    </div>
                </div>
            `;
        }

        htmlRecibo += `</div>`;
        recibo.innerHTML = htmlRecibo;

        // Configura o Canvas de Assinatura
        const canvas = document.getElementById("canvasAssinatura");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            let desenhando = false;

            function obterPos(e) {
                const rect = canvas.getBoundingClientRect();
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);
                return { x: clientX - rect.left, y: clientY - rect.top };
            }

            function iniciar(e) {
                desenhando = true;
                ctx.beginPath();
                const pos = obterPos(e);
                ctx.moveTo(pos.x, pos.y);
            }

            function mover(e) {
                if (!desenhando) return;
                const pos = obterPos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }

            function parar() { desenhando = false; }

            canvas.addEventListener("mousedown", iniciar);
            canvas.addEventListener("mousemove", mover);
            canvas.addEventListener("mouseup", parar);
            canvas.addEventListener("mouseleave", parar);

            canvas.addEventListener("touchstart", (e) => { iniciar(e); e.preventDefault(); });
            canvas.addEventListener("touchmove", (e) => { mover(e); e.preventDefault(); });
            canvas.addEventListener("touchend", parar);

            document.getElementById("limparAssinatura").addEventListener("click", () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }

        // Configura o QR Code Pix
        if (formaPagamento === "PIX") {
            const payloadPix = gerarPayloadPix(configApp.chave_pix, total);
            new QRCode(document.getElementById("qrcode"), {
                text: payloadPix,
                width: 160,
                height: 160
            });

            document.getElementById("btnCopiarPix").addEventListener("click", function() {
                navigator.clipboard.writeText(payloadPix);
                alert("Código PIX Copia e Cola copiado para a área de transferência!");
            });
        }

        recibo.scrollIntoView({ behavior: 'smooth' });
    });
});
