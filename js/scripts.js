/******************************************************************************
| A. DEBUG E SICUREZZA                                                        |
*******************************************************************************/
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error("Errore: " + msg + " alla linea: " + lineNo);
    return false;
};

/******************************************************************************
| B. GESTIONE SFONDO - FORZATURA DIMENSIONI                                   |
*******************************************************************************/
const applicaSfondoDinamico = () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    
    if (typeof impostazioniApp === 'undefined' || !bgContainer) {
        setTimeout(applicaSfondoDinamico, 50);
        return;
    }

    // FORZA ALTEZZA DA JS (per sicurezza extra)
    bgContainer.style.height = "100vh";
    bgContainer.style.width = "100vw";

    if (impostazioniApp.sfondoLink) {
        const imgBuffer = new Image();
        const v = typeof APP_VERSION !== 'undefined' ? APP_VERSION : new Date().getTime();
        const urlFresco = impostazioniApp.sfondoLink + "?v=" + v;
        
        imgBuffer.onload = () => {
            bgContainer.style.backgroundImage = `url('${urlFresco}')`;
            bgContainer.style.opacity = "1"; 
        };

        imgBuffer.onerror = () => {
            bgContainer.style.backgroundColor = "#1a1a1a";
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
    
    // 1. Controllo sicurezza
    if (!grid || typeof catalogoProdotti === 'undefined') return;
    
    // 2. Pulizia griglia
    grid.innerHTML = ""; 

    catalogoProdotti.forEach((p, index) => {
        // Creiamo la card
        const card = document.createElement('div');
        card.className = 'product-card banner-hidden'; // Parte nascosta
        
        // Creiamo l'immagine
        const imgOggetto = new Image();
        const v = typeof APP_VERSION !== 'undefined' ? APP_VERSION : new Date().getTime();
        
        imgOggetto.onload = () => {
            imgOggetto.className = "product-banner-img";
            card.appendChild(imgOggetto);
            
            // Mostriamo la card con un delay progressivo (effetto cascata)
            setTimeout(() => {
                card.classList.add('banner-visible');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100); 
        };

        imgOggetto.onerror = () => {
            console.error("Errore caricamento immagine per:", p.nome);
            card.innerHTML = `<div style="color:#666; font-size:10px; padding:20px;">Non disponibile</div>`;
            card.classList.add('banner-visible'); // La mostriamo comunque per non rompere la griglia
        };

        // Assegniamo l'URL (questo avvia il download)
        imgOggetto.src = p.img + "?v=" + v;
        
        // Click per aprire il foglio prodotto
        card.onclick = () => {
            if (typeof openSheet === 'function') openSheet(p);
        };
        
        grid.appendChild(card);
    });
};

/******************************************************************************
| D. AVVIO (FIXED: Forza visibilità immediata)                                |
*******************************************************************************/
const initAppLogic = () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    // Mostriamo subito l'app per evitare il bianco
    const app = document.getElementById('app');
    if(app) app.style.opacity = "1";

    applicaSfondoDinamico();

    // Riduciamo il ritardo per l'animazione banner
    const staticBanners = document.querySelectorAll('.banner-hidden:not(.product-card)');
    staticBanners.forEach((b, i) => {
        setTimeout(() => {
            b.classList.add('banner-visible');
            // Debug: forziamo l'opacità se la classe fallisce
            b.style.opacity = "1"; 
        }, i * 100);
    });

    const checkData = setInterval(() => {
        if (typeof catalogoProdotti !== 'undefined') {
            inizializzaCatalogo();
            clearInterval(checkData);
        }
    }, 100);
};

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', initAppLogic);
} else {
    initAppLogic();
}

/******************************************************************************
| E. NAVIGAZIONE SEZIONI                                                       |
*******************************************************************************/
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    const activeSection = document.getElementById(sectionId);
    if (!activeSection) return;
    activeSection.style.display = 'block';

    const banners = activeSection.querySelectorAll('.banner-hidden');
    banners.forEach((banner, index) => {
        banner.classList.remove('banner-visible');
        setTimeout(() => banner.classList.add('banner-visible'), index * 100); 
    });
}