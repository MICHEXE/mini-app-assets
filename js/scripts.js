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
    if (!grid || typeof catalogoProdotti === 'undefined') return;
    
    grid.innerHTML = ""; 

    catalogoProdotti.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        // Placeholder iniziale per evitare il punto di domanda
        card.style.backgroundColor = "#222"; 

        // 1. Creiamo l'oggetto immagine in memoria
        const imgOggetto = new Image();
        
        // 2. Definiamo cosa fare quando l'immagine è pronta
        imgOggetto.onload = () => {
            imgOggetto.className = "product-banner-img";
            card.appendChild(imgOggetto);
            // Animazione di comparsa
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        };

        // 3. Gestione errore
        imgOggetto.onerror = () => {
            card.innerHTML = `<div style="color:white; font-size:10px; padding:20px;">IMG Error</div>`;
        };

        // 4. Facciamo partire il download (aggiungiamo un timestamp per la cache)
        imgOggetto.src = p.img + "?v=" + new Date().getTime();
        
        card.addEventListener('click', () => {
            if(typeof openSheet === 'function') openSheet(p);
        });
        
        grid.appendChild(card);
    });
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