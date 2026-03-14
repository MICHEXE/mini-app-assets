/******************************************************************************
| A. DEBUG E INIZIALIZZAZIONE TELEGRAM                                         |
*******************************************************************************/
window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showAlert("Errore: " + msg + "\nLinea: " + lineNo);
    }
    return false;
};

const v = document.getElementById('v0');
const appContainer = document.getElementById('app'); // Il nuovo contenitore per lo scroll

const syncVideoConScroll = () => {
    if (v && v.duration && appContainer) {
        // Calcoliamo lo scroll basandoci sul contenitore #app, non sul body
        const scrollabile = appContainer.scrollHeight - appContainer.clientHeight;
        if (scrollabile <= 0) return;
        
        const percentuale = appContainer.scrollTop / scrollabile;
        v.currentTime = Number((percentuale * v.duration).toFixed(2));
    }
};

/******************************************************************************
| C. GENERAZIONE CATALOGO                                                      |
*******************************************************************************/
const inizializzaCatalogo = () => {
    const grid = document.getElementById('grid-prodotti');
    if (!grid || typeof catalogoProdotti === 'undefined') return;
    
    grid.innerHTML = ""; 

    catalogoProdotti.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.backgroundColor = "#222"; 

        const imgOggetto = new Image();
        imgOggetto.onload = () => {
            imgOggetto.className = "product-banner-img";
            card.appendChild(imgOggetto);
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        };

        imgOggetto.onerror = () => {
            card.innerHTML = `<div style="color:white; font-size:10px; padding:20px;">IMG Error</div>`;
        };

        imgOggetto.src = p.img + "?v=" + new Date().getTime();
        
        card.addEventListener('click', () => {
            if(typeof openSheet === 'function') openSheet(p);
        });
        
        grid.appendChild(card);
    });
};

/******************************************************************************
| D. AVVIO E EVENT LISTENERS                                                   |
*******************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const staticBanners = document.querySelectorAll('.banner-hidden:not(.product-card)');
    staticBanners.forEach((b, i) => {
        setTimeout(() => b.classList.add('banner-visible'), i * 150);
    });

    // ASCOLTA LO SCROLL DI #APP, NON DI WINDOW
    if (appContainer) {
        appContainer.addEventListener('scroll', () => {
            window.requestAnimationFrame(syncVideoConScroll);
        });
    }

    if (v) {
        v.addEventListener('loadedmetadata', syncVideoConScroll);
        v.pause();
    }

    const avviaQuandoPronto = () => {
        if (typeof catalogoProdotti !== 'undefined') {
            inizializzaCatalogo();
            // Aspetta un attimo che la griglia sia generata prima di sincronizzare il video
            setTimeout(syncVideoConScroll, 300);
        } else {
            setTimeout(avviaQuandoPronto, 100);
        }
    };

    avviaQuandoPronto();
});

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