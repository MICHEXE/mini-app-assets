/******************************************************************************
| A. DEBUG E INIZIALIZZAZIONE TELEGRAM                                        |
*******************************************************************************/


window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showAlert("Errore: " + msg + "\nLinea: " + lineNo);
    }
    return false;
};

const v = document.getElementById('v0');

const syncVideoConScroll = () => {
    if (v && v.duration) {
        const scrollabile = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollabile <= 0) return;
        const percentuale = window.pageYOffset / scrollabile;
        v.currentTime = Number((percentuale * v.duration).toFixed(2));
    }
};

/******************************************************************************
| C. GENERAZIONE CATALOGO (CON EFFETTO A CASCATA)                             |
*******************************************************************************/
const inizializzaCatalogo = () => {
    const grid = document.getElementById('grid-prodotti');
    if (!grid) return;
    grid.innerHTML = ""; 

    if (typeof catalogoProdotti !== 'undefined') {
        catalogoProdotti.forEach((p, index) => {
            const card = document.createElement('div');
            // Usiamo la classe product-card che ora gestirà il banner
            card.className = 'product-card banner-hidden';
            
            // Inseriamo SOLO l'immagine del banner
            card.innerHTML = `
    <img src="${p.img}" alt="${p.nome}" class="product-banner-img">
    <div class="banner-overlay-glass"></div>
`;
            
            card.addEventListener('click', () => openSheet(p));
            grid.appendChild(card);

            setTimeout(() => {
                card.classList.add('banner-visible');
            }, index * 100);
        });
    }
};

/******************************************************************************
| D. AVVIO E EVENT LISTENERS                                                  |
*******************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const staticBanners = document.querySelectorAll('.banner-hidden:not(.product-card)');
    staticBanners.forEach((b, i) => {
        setTimeout(() => b.classList.add('banner-visible'), i * 150);
    });

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(syncVideoConScroll);
    });

    if (v) {
        v.addEventListener('loadedmetadata', syncVideoConScroll);
        v.pause();
    }

    const avviaQuandoPronto = () => {
        if (typeof catalogoProdotti !== 'undefined') {
            inizializzaCatalogo();
            setTimeout(syncVideoConScroll, 200);
        } else {
            setTimeout(avviaQuandoPronto, 100);
        }
    };

    avviaQuandoPronto();
});

// Per navigazione tra sezioni
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    const activeSection = document.getElementById(sectionId);
    if(!activeSection) return;

    activeSection.style.display = 'block';

    setTimeout(() => {
        const banners = activeSection.querySelectorAll('.banner-hidden');
        banners.forEach((banner, index) => {
            setTimeout(() => {
                banner.classList.add('banner-visible');
            }, index * 100); 
        });
    }, 50);
}