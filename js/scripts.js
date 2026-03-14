/******************************************************************************
| A. DEBUG E INIZIALIZZAZIONE TELEGRAM                                         |
*******************************************************************************/
window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showAlert("Errore: " + msg + "\nLinea: " + lineNo);
    }
    return false;
};

const appContainer = document.getElementById('app');

/******************************************************************************
| B. GESTIONE SFONDO DAL DATABASE (CON FIX CACHE)                              |
*******************************************************************************/
const applicaSfondoDinamico = () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    
    // Se non trova il database, aspetta 100ms e riprova
    if (typeof impostazioniApp === 'undefined') {
        setTimeout(applicaSfondoDinamico, 100);
        return;
    }

    if (bgContainer && impostazioniApp.sfondoLink) {
        // AGGIUNTO: timestamp per forzare il caricamento immediato dell'immagine sfondo
        const timestamp = new Date().getTime();
        const urlFresco = impostazioniApp.sfondoLink + "?v=" + timestamp;
        
        console.log("Sfondo caricato con successo:", urlFresco);
        bgContainer.style.backgroundImage = `url('${urlFresco}')`;
        
        // Forza la visibilità
        bgContainer.style.opacity = "1";
        bgContainer.style.display = "block";
    }
};

/******************************************************************************
| C. GENERAZIONE CATALOGO (CON FIX ORDINE E CACHE)                             |
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

        // AGGIUNTO: timestamp per forzare il caricamento delle immagini prodotto
        // Questo risolve il problema delle Jeep o di altre foto che "non partivano"
        imgOggetto.src = p.img + "?t=" + new Date().getTime();
        
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

    // 1. Applica lo sfondo dal DB appena il DOM è pronto
    applicaSfondoDinamico();

    // 2. Animazione banner statici
    const staticBanners = document.querySelectorAll('.banner-hidden:not(.product-card)');
    staticBanners.forEach((b, i) => {
        setTimeout(() => b.classList.add('banner-visible'), i * 150);
    });

    const avviaQuandoPronto = () => {
        // Se hai aggiornato il database.js su GitHub, assicurati che 
        // l'URL nell'HTML abbia un ?v= nuovo (es: ?v=3.1)
        if (typeof catalogoProdotti !== 'undefined') {
            inizializzaCatalogo();
        } else {
            setTimeout(avviaQuandoPronto, 100);
        }
    };

    avviaQuandoPronto();
});

/******************************************************************************
| E. NAVIGAZIONE SEZIONI                                                       |
*******************************************************************************/
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