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
| B. GESTIONE SFONDO CON PRE-CARICAMENTO ASINCRONO (SOLUZIONE PRO)             |
*******************************************************************************/

// Funzione "Promessa" che scarica l'immagine prima di usarla
function precaricaImmagine(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // Aggiungiamo il timestamp per saltare la cache del server
        const urlFresco = url + "?t=" + new Date().getTime();
        img.src = urlFresco;
        img.onload = () => resolve(urlFresco);
        img.onerror = () => reject(new Error("Errore caricamento: " + url));
    });
}

/******************************************************************************
| B. GESTIONE SFONDO - TECNICA DOUBLE-BUFFER (FIX DEFINITIVO)                 |
*******************************************************************************/

const applicaSfondoDinamico = () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    
    if (typeof impostazioniApp === 'undefined') {
        setTimeout(applicaSfondoDinamico, 100);
        return;
    }

    if (bgContainer && impostazioniApp.sfondoLink) {
        // Creiamo un elemento immagine "fantasma" per forzare il download
        const imgBuffer = new Image();
        const urlFresco = impostazioniApp.sfondoLink + "?t=" + new Date().getTime();
        
        imgBuffer.onload = () => {
            // L'immagine è ora fisicamente nella RAM del telefono
            console.log("Buffer pronto, applico lo sfondo.");
            
            // Applichiamo l'immagine e forziamo il CSS
            bgContainer.style.backgroundImage = `url('${urlFresco}')`;
            
            // Rimuoviamo eventuali filtri che potrebbero scurire troppo (test)
            bgContainer.style.display = "block";
            bgContainer.style.opacity = "1";
            bgContainer.style.visibility = "visible";
        };

        imgBuffer.onerror = () => {
            console.error("Errore critico: il link non risponde.");
            // Se fallisce, mettiamo un colore di emergenza per non lasciare nero
            bgContainer.style.backgroundColor = "#2c3e50"; 
        };

        imgBuffer.src = urlFresco;
    }
};

/******************************************************************************
| C. GENERAZIONE CATALOGO (CON TIMESTAMP)                                      |
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

        // Timestamp anche qui per l'ordine e le foto sempre fresche
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

    // Avvio asincrono dello sfondo
    applicaSfondoDinamico();

    // Animazione banner statici
    const staticBanners = document.querySelectorAll('.banner-hidden:not(.product-card)');
    staticBanners.forEach((b, i) => {
        setTimeout(() => b.classList.add('banner-visible'), i * 150);
    });

    const avviaQuandoPronto = () => {
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