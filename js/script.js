/* ---------------------- */
/*    CORAZONES FLOTANDO  */
/* ---------------------- */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("float-heart");
    heart.style.left = Math.random() * window.innerWidth + "px";
    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = duration + "s";
    const size = 60 + Math.random() * 40;
    heart.style.width = size + "px";
    heart.style.height = size * 0.9 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(createHeart, 400);

/* ---------------------- */
/*  DESTELLOS CLICK       */
/* ---------------------- */
document.addEventListener("click", (e) => {
    const x = e.clientX, y = e.clientY;
    const flash = document.createElement("div");
    flash.classList.add("flash");
    flash.style.left = `${x - 20}px`;
    flash.style.top = `${y - 20}px`;
    document.body.appendChild(flash);

    const ring = document.createElement("div");
    ring.classList.add("ring");
    ring.style.left = `${x - 5}px`;
    ring.style.top = `${y - 5}px`;
    document.body.appendChild(ring);

    for (let i = 0; i < 8; i++) {
        const spark = document.createElement("div");
        spark.classList.add("spark");
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 80 + Math.random() * 40;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        spark.style.setProperty("--dx", `${dx}px`);
        spark.style.setProperty("--dy", `${dy}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
    }
    setTimeout(() => { flash.remove(); ring.remove(); }, 1200);
});

/* ---------------------- */
/*    CARTA NUEVA JS      */
/* ---------------------- */
const seal = document.getElementById("seal");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const letter = document.getElementById("letter");
let isBroken = false, pieces = [];

seal.addEventListener("click", () => {
    if (!isBroken) breakEnvelope(); else assembleEnvelope();
    isBroken = !isBroken;
});

function breakEnvelope() {
    const rect = envelope.getBoundingClientRect();
    const rows = 6, cols = 10;
    const pieceWidth = rect.width / cols, pieceHeight = rect.height / rows;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const piece = document.createElement("div");
            piece.className = "piece";
            piece.style.width = `${Math.ceil(pieceWidth)}px`;
            piece.style.height = `${Math.ceil(pieceHeight)}px`;
            piece.style.left = `${rect.left + c * pieceWidth}px`;
            piece.style.top = `${rect.top + r * pieceHeight}px`;
            document.body.appendChild(piece);
            pieces.push(piece);
        }
    }

    envelope.style.opacity = "0";
    flap.style.opacity = "0";
    letter.classList.add("show");

    pieces.forEach((piece, i) => {
        const delay = Math.random() * 800 + (i % 8) * 40;
        setTimeout(() => {
            const xMove = (Math.random() - 0.5) * 700;
            const yMove = window.innerHeight - rect.top + 300 + Math.random() * 200;
            const rotate = (Math.random() - 0.5) * 720;
            piece.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg)`;
            piece.style.opacity = "0";
        }, delay);
    });

    seal.style.animation = "none";
    seal.style.left = "auto";
    seal.style.right = "10px";
    seal.style.bottom = "10px";
    seal.style.transform = "rotate(-45deg) scale(0.6)";
}

function assembleEnvelope() {
    envelope.style.opacity = "1";
    flap.style.opacity = "1";
    letter.classList.remove("show");
    setTimeout(() => { pieces.forEach(p => p.remove()); pieces = []; }, 600);
    seal.style.right = "";
    seal.style.left = "50%";
    seal.style.bottom = "89px";
    seal.style.transform = "translateX(-50%) rotate(-45deg) scale(1)";
    seal.style.animation = "heartbeat 2.5s ease-in-out infinite";
}

/* ---------------------- */
/* IMÁGENES ALEATORIAS    */
/* ---------------------- */
const imagenes = 
function mostrarImagenAleatoria() {
    const img = document.createElement("img");
    img.src = imagenes[Math.floor(Math.random() * imagenes.length)];
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    document.body.appendChild(img);
    requestAnimationFrame(() => img.classList.add("visible"));
    setTimeout(() => img.classList.add("fade-out"), 4000);
    setTimeout(() => img.remove(), 6000);
}
setInterval(mostrarImagenAleatoria, 3000);