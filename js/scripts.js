/******************************************************************************
| A. DEBUG E INIZIALIZZAZIONE TELEGRAM                                         |
*******************************************************************************/
window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showAlert("Errore: " + msg + "\nLinea: " + lineNo);
    }
    return false;
};

/******************************************************************************
| B. GESTIONE SFONDO - TECNICA DOUBLE-BUFFER                                   |
*******************************************************************************/
const applicaSfondoDinamico = () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    
    if (typeof impostazioniApp === 'undefined') {
        setTimeout(applicaSfondoDinamico, 100);
        return;
    }

    if (bgContainer && impostazioniApp.sfondoLink) {
        const imgBuffer = new Image();
        const urlFresco = impostazioniApp.sfondoLink + "?t=" + new Date().getTime();
        
        imgBuffer.onload = () => {
            console.log("Immagine caricata in RAM, la visualizzo.");
            bgContainer.style.backgroundImage = `url('${urlFresco}')`;
            bgContainer.style.opacity = "1"; // Fa apparire lo sfondo con dissolvenza
        };

        imgBuffer.onerror = () => {
            console.error("Link immagine non valido o lento.");
            bgContainer.style.opacity = "1"; // Mostra almeno il colore grigio
        };

        imgBuffer.src = urlFresco;
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

        // Cache busting per le immagini prodotto
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

    // Avvia lo sfondo
    applicaSfondoDinamico();

    // Animazione banner
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