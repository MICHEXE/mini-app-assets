/******************************************************************************
| A. DEBUG E SICUREZZA                                                        |
*******************************************************************************/
window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (window.Telegram && window.Telegram.WebApp) {
        // showAlert è utile in dev, ma puoi commentarlo in produzione
        console.error("Errore: " + msg + " alla linea: " + lineNo);
    }
    return false;
};

/******************************************************************************
| B. GESTIONE SFONDO - TECNICA DOUBLE-BUFFER (FIXED)                          |
*******************************************************************************/
const applicaSfondoDinamico = () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    
    // Se il database non è ancora stato iniettato dal loader, attendi
    if (typeof impostazioniApp === 'undefined' || !bgContainer) {
        setTimeout(applicaSfondoDinamico, 50);
        return;
    }

    if (impostazioniApp.sfondoLink) {
        const imgBuffer = new Image();
        // Usiamo APP_VERSION se disponibile, altrimenti timestamp
        const v = typeof APP_VERSION !== 'undefined' ? APP_VERSION : new Date().getTime();
        const urlFresco = impostazioniApp.sfondoLink + "?v=" + v;
        
        imgBuffer.onload = () => {
            bgContainer.style.backgroundImage = `url('${urlFresco}')`;
            bgContainer.style.opacity = "1"; 
            console.log("Sfondo applicato correttamente.");
        };

        imgBuffer.onerror = () => {
            console.error("Impossibile caricare l'immagine di sfondo.");
            bgContainer.style.backgroundColor = "#1a1a1a"; // Fallback colore
            bgContainer.style.opacity = "1";
        };

        imgBuffer.src = urlFresco;
    }
};

/******************************************************************************
| C. GENERAZIONE CATALOGO                                                     |
*******************************************************************************/
const inizializzaCatalogo = () => {
    const grid = document.getElementById('grid-prodotti');
    
    // Protezione contro caricamenti multipli o mancanti
    if (!grid || typeof catalogoProdotti === 'undefined') return;
    
    grid.innerHTML = ""; 

    catalogoProdotti.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Lo stile base della card lo lasciamo al CSS per pulizia
        const imgOggetto = new Image();
        const v = typeof APP_VERSION !== 'undefined' ? APP_VERSION : new Date().getTime();
        
        imgOggetto.onload = () => {
            imgOggetto.className = "product-banner-img";
            card.appendChild(imgOggetto);
            
            // Animazione d'entrata fluida
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        };

        imgOggetto.onerror = () => {
            card.innerHTML = `<div style="color:#555; font-size:10px; padding:20px;">Immagine non disponibile</div>`;
        };

        imgOggetto.src = p.img + "?v=" + v;
        
        card.onclick = () => {
            if (typeof openSheet === 'function') openSheet(p);
        };
        
        grid.appendChild(card);
    });
};

/******************************************************************************
| D. AVVIO E GESTIONE EVENTI                                                  |
*******************************************************************************/
// Usiamo una funzione di init chiamata direttamente o via DOMContentLoaded
const initAppLogic = () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    // 1. Applica lo sfondo
    applicaSfondoDinamico();

    // 2. Anima i banner statici presenti nell'HTML
    const staticBanners = document.querySelectorAll('.banner-hidden:not(.product-card)');
    staticBanners.forEach((b, i) => {
        setTimeout(() => b.classList.add('banner-visible'), i * 150);
    });

    // 3. Avvia il catalogo non appena i dati sono pronti
    const checkData = setInterval(() => {
        if (typeof catalogoProdotti !== 'undefined') {
            inizializzaCatalogo();
            clearInterval(checkData);
        }
    }, 100);
};

// Se lo script è caricato asincronamente, verifichiamo lo stato del documento
if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', initAppLogic);
} else {
    initAppLogic();
}

/******************************************************************************
| E. NAVIGAZIONE SEZIONI (SMART)                                               |
*******************************************************************************/
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.style.display = 'none');
    
    const activeSection = document.getElementById(sectionId);
    if (!activeSection) return;

    activeSection.style.display = 'block';

    // Riavvia animazioni banner nella sezione
    const banners = activeSection.querySelectorAll('.banner-hidden');
    banners.forEach((banner, index) => {
        banner.classList.remove('banner-visible');
        setTimeout(() => {
            banner.classList.add('banner-visible');
        }, index * 100); 
    });
}