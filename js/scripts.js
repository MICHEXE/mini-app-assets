/******************************************************************************
| A. CONFIGURAZIONE E UTILS                                                   |
*******************************************************************************/
const AppConfig = {
    version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : Date.now(),
    isReady: false
};

// Logger personalizzato per debug pulito
const logger = {
    error: (msg, err) => console.error(`[App Error] ${msg}`, err),
    info: (msg) => console.log(`[App Info] ${msg}`)
};

window.onerror = (msg, url, line) => {
    logger.error(`Errore alla linea ${line}: ${msg}`);
    return false;
};

/******************************************************************************
| B. GESTIONE SFONDO (ASINCRONA E OTTIMIZZATA)                                |
*******************************************************************************/
const applicaSfondoDinamico = async () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    if (!bgContainer || typeof impostazioniApp === 'undefined') return;

    const urlFresco = `${impostazioniApp.sfondoLink}?v=${AppConfig.version}`;
    
    try {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = urlFresco;
            img.onload = resolve;
            img.onerror = reject;
        });
        
        bgContainer.style.backgroundImage = `url('${urlFresco}')`;
        bgContainer.style.opacity = "1";
    } catch (err) {
        logger.error("Impossibile caricare lo sfondo, uso fallback.");
        bgContainer.style.backgroundColor = "#1a1a1a";
        bgContainer.style.opacity = "1";
    }
};

/******************************************************************************
| C. GENERAZIONE CATALOGO (SMART RENDERING)                                   |
*******************************************************************************/
const inizializzaCatalogo = () => {
    const grid = document.getElementById('grid-prodotti');
    if (!grid || typeof catalogoProdotti === 'undefined') return;

    // Usiamo un DocumentFragment per migliorare le performance di rendering
    const fragment = document.createDocumentFragment();
    grid.innerHTML = ""; 

    catalogoProdotti.forEach((prodotto, index) => {
        const card = document.createElement('div');
        card.className = 'product-card banner-hidden';
        
        // Gestione immagine con lazy-loading logico
        const img = new Image();
        img.className = "product-banner-img";
        img.src = `${prodotto.img}?v=${AppConfig.version}`;

        img.onload = () => {
            card.appendChild(img);
            // Trigger animazione a cascata
            setTimeout(() => {
                card.classList.replace('banner-hidden', 'banner-visible');
            }, index * 80); // 80ms è il "golden ratio" per la fluidità
        };

        img.onerror = () => {
            card.innerHTML = `<div style="color:#666; font-size:10px; display:flex; align-items:center; justify-content:center; height:100%;">N/A</div>`;
            card.classList.replace('banner-hidden', 'banner-visible');
        };

        card.onclick = () => {
            if (typeof openSheet === 'function') openSheet(prodotto);
        };

        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
};

/******************************************************************************
| D. GESTIONE BOTTOM SHEET (LOGICA APERTURA/CHIUSURA)                         |
*******************************************************************************/
const openSheet = (prodotto) => {
    const sheet = document.getElementById('bottom-sheet');
    const body = document.getElementById('sheet-body');
    if (!sheet || !body) return;

    // Popoliamo la sheet con i dati del prodotto
    body.innerHTML = `
        <img src="${prodotto.img}?v=${AppConfig.version}" alt="${prodotto.nome}">
        <div class="sheet-info-content">
            <h2 class="sheet-title">${prodotto.nome}</h2>
            <div class="sheet-meta-data">
                <span class="location-badge">Disponibile</span>
                <span class="info-badge">${prodotto.prezzo || 'Contattaci'}</span>
            </div>
            <div class="sheet-desc-container">
                <img src="path/to/desc-icon.svg" class="desc-icon">
                ${prodotto.descrizione || 'Nessuna descrizione disponibile.'}
            </div>
        </div>
    `;

    sheet.style.display = 'block';
    setTimeout(() => sheet.classList.add('active'), 10);
};

const closeSheet = () => {
    const sheet = document.getElementById('bottom-sheet');
    if (!sheet) return;
    
    sheet.classList.remove('active');
    setTimeout(() => {
        sheet.style.display = 'none';
    }, 500); // Deve matchare la durata della transizione CSS
};

/******************************************************************************
| E. NAVIGAZIONE E INIT                                                       |
*******************************************************************************/
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.style.display = 'none');

    const activeSection = document.getElementById(sectionId);
    if (!activeSection) return;

    activeSection.style.display = 'block';
    
    // Reset e ri-animazione banner interni
    const banners = activeSection.querySelectorAll('[id*="banner-"]');
    banners.forEach((b, i) => {
        b.classList.remove('banner-visible');
        b.classList.add('banner-hidden');
        setTimeout(() => b.classList.add('banner-visible'), i * 100);
    });

    if (sectionId === 'prodotti') inizializzaCatalogo();
}

const initAppLogic = () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // Espande l'app per usare tutto lo schermo

    const appContainer = document.getElementById('app');
    if (appContainer) appContainer.style.opacity = "1";

    applicaSfondoDinamico();
    
    // Gestione caricamento dati iniziale
    if (typeof catalogoProdotti !== 'undefined') {
        showSection('home'); // Mostra la home di default
    } else {
        logger.error("Dati catalogo non trovati al caricamento.");
    }
};

// Avvio pulito
document.addEventListener('DOMContentLoaded', initAppLogic);