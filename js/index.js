'use strict';
const PAGE_URL='https://atuta.codeberg.page/fierrodiario';

class Estrofa {
    constructor(estrofa, numEstrofa, capEstrofa) {
        this.estrofa = estrofa;
        this.numero = numEstrofa;
        this.capitulo = capEstrofa;
    }
}

/**
 * Tomado directamente de: https://www.4rknova.com/blog/2026/03/01/mulberry32-rng
 * @param {int} seed
 */
function mulberry32(seed) {
    let t = seed >>> 0; // force seed into uint32
    return function next() {
        t = (t + 0x6D2B79F5) >>> 0; // advance internal state (uint32 wrap)

        // Mix bits using xor-shifts and 32-bit multiplication.
        let x = Math.imul(t ^ (t >>> 15), t | 1);
        x ^= x + Math.imul(x ^ (x >>> 7), x | 61);

        // Convert uint32 to float in [0, 1).
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * @param {any[]} arr
 * @param {int} seed
 */
function shuffleArray(arr, seed) {
    const rand = mulberry32(seed);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
}

function getChapter(data, numEstrofa) {
    let capitulo = ""
    const references = data.references;
    for (let i = 0; (i < references.length) && (capitulo == ""); i++) {
        const intervalo = references[i].interval;
        if (intervalo[0] <= numEstrofa && numEstrofa <= intervalo[1]) {
            capitulo = references[i].name;
        }
    }
    return capitulo;
}

/**
 * @param {Estrofa} estrofa
 */
function imprimirEstrofa(estrofa) {
    const estrofaEl = document.getElementById('estrofa');
    const capituloEl = document.getElementById('capitulo');
    const numEstrofaEl = document.getElementById('numeroEstrofa');
    const referenciaEl = document.getElementById('referencia');

    if (!estrofaEl || !capituloEl || !numEstrofaEl || !referenciaEl) {
        throw new Error("No se encontraron ciertos elementos necesarios para imprimir la estrofa.");
    }

    estrofaEl.innerText    = estrofa.estrofa;
    capituloEl.innerText   = estrofa.capitulo;
    numEstrofaEl.innerText = estrofa.numero;
    referenciaEl.href = `https://es.wikisource.org/wiki/El_Gaucho_Mart%C3%ADn_Fierro_(1894)/${estrofa.capitulo}`;
}

/**
 * @param {string} platform
 * @param {Estrofa} estrofa
 */
function getShareUrl(platform, estrofa) {
    const text =
        `"${estrofa.estrofa}"\n\n`+
        "— El Gaucho Martín Fierro, José Hernández, Cap. "
        +`${estrofa.capitulo}, Estrofa ${estrofa.numero}\n\n${PAGE_URL}`;

    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(window.location.href);
    switch (platform) {
        case 'whatsapp':
            return `https://wa.me/?text=${encodedText}`;
        case 'bluesky':
            return `https://bsky.app/intent/compose?text=${encodedText}`;
        case 'mastodon':
            // Servicio que pregunta la instancia del usuario y redirige.
            return `https://toot.kytta.dev/?text=${encodedText}`;
        case 'x':
            return `https://twitter.com/intent/tweet?text=${encodedText}`;
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        case 'telegram':
            return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        case 'email':
            return `mailto:?subject=${encodeURIComponent('El Gaucho Martín Fierro - Estrofa')}&body=${encodedText}`;
        default:
            return '';
    }
}

(()=>{
    const actualInstant = Temporal.Now.instant();
    const ArgDate = actualInstant.toZonedDateTimeISO('America/Argentina/Buenos_Aires');
    const dayOfYear = ArgDate.dayOfYear;
    const year = ArgDate.year;

    document.addEventListener("DOMContentLoaded", async () => {
        const shareButton = document.getElementById("shareButton");
        const shareDialog = document.getElementById("shareDialog");

        if (shareButton && shareDialog) {
            shareButton.addEventListener("click", () => {
                shareDialog.showModal();
            });
        }

        const infoButton = document.getElementById("infoButton");
        const infoDialog = document.getElementById("infoDialog");

        if (infoButton && infoDialog) {
            infoButton.addEventListener("click", () => {
                infoDialog.showModal();
            });
        }

        // Cargar estrofas
        const data = await fetch("./json/estrofas.json")
            .then((r)  => r.json())
            .catch((e) => { throw e; });
        
        const estrofas = data.estrofas; 
        if (!estrofas) { throw new Error("No existe la llave \"estrofas\" en la base de datos.")};

        const mazo = Array.from({ length: estrofas.length }, (_, i) => i);  
        shuffleArray(mazo, year);

        // Definir estrofa del día
        const numEstrofa = mazo[dayOfYear];
        const estrofaDelDia = new Estrofa(
            estrofas[numEstrofa],
            numEstrofa,
            getChapter(data, numEstrofa));
        
        if (estrofaDelDia.capitulo == "") { throw new Error("Error al obtener el capítulo de la estrofa."); }

        imprimirEstrofa(estrofaDelDia);

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const plataforma = btn.dataset.platform;
                const url = getShareUrl(plataforma, estrofaDelDia);

                if (url) {
                    if (plataforma === 'email') {
                        window.location.href = url;
                    } else {
                        window.open(url, '_blank', 'noopener');
                    }
                }
            });
        });

        const loadingEl = document.getElementById('loading');
        const mainContainer = document.getElementById('mainContainer');

        loadingEl.remove();
        mainContainer.classList.remove('hidden');
    });
})();
