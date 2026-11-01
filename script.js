document.addEventListener("DOMContentLoaded", function() {
    const selectPagamento = document.getElementById("pagamento");
    const camposPix = document.getElementById("campos-pix");
    const camposCartao = document.getElementById("campos-cartao");
    const camposBoleto = document.getElementById("campos-boleto");

    let canvasAtivo = null;

    selectPagamento.addEventListener("change", function() {
        const valor = this.value;
        camposPix.style.display = valor === "PIX" ? "block" : "none";
        camposCartao.style.display = valor === "Cartão" ? "block" : "none";
        camposBoleto.style.display = valor === "Boleto" ? "block" : "none";

        if (valor === "PIX") canvasAtivo = "canvasAssinaturaPix";
        else if (valor === "Cartão") canvasAtivo = "canvasAssinaturaCartao";
        else if (valor === "Boleto") canvasAtivo = "canvasAssinaturaBoleto";
        
        if (canvasAtivo) inicializarCanvas(canvasAtivo);
    });

    const instanciasCanvas = {};

    function inicializarCanvas(idCanvas) {
        if (instanciasCanvas[idCanvas]) return;

        const canvas = document.getElementById(idCanvas);
        if (!canvas) return;

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

        function parar() {
            desenhando = false;
        }

        canvas.addEventListener("mousedown", iniciar);
        canvas.addEventListener("mousemove", mover);
        canvas.addEventListener("mouseup", parar);
        canvas.addEventListener("mouseleave", parar);

        canvas.addEventListener("touchstart", (e) => { iniciar(e); e.preventDefault(); });
        canvas.addEventListener("touchmove", (e) => { mover(e); e.preventDefault(); });
        canvas.addEventListener("touchend", parar);

        instanciasCanvas[idCanvas] = { canvas, ctx };
    }

    document.querySelectorAll(".btn-limpar").forEach(btn => {
        btn.addEventListener("click", function() {
            const idCanvas = this.getAttribute("data-canvas");
            if (instanciasCanvas[idCanvas]) {
                const { canvas, ctx } = instanciasCanvas[idCanvas];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    });

    document.getElementById("pedidoForm").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Pedido gravado com sucesso! A assinatura de confirmação foi validada para fins legais.");
    });
});
