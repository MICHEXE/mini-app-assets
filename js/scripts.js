/******************************************************************************
| A. CONFIGURAZIONE E UTILS                                                   |
*******************************************************************************/
const AppConfig = {
    version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : Date.now(),
    isReady: false
};

const logger = {
    error: (msg, err) => console.error(`[App Error] ${msg}`, err),
    info: (msg) => console.log(`[App Info] ${msg}`)
};

/******************************************************************************
| B. GESTIONE SFONDO (CON FALLBACK GARANTITO)                                 |
*******************************************************************************/
const applicaSfondoDinamico = async () => {
    const bgContainer = document.getElementById('sfondo-dinamico');
    if (!bgContainer || typeof impostazioniApp === 'undefined') return;

    const urlFresco = `${impostazioniApp.sfondoLink}?v=${AppConfig.version}`;
    
    const img = new Image();
    img.src = urlFresco;
    img.onload = () => {
        bgContainer.style.backgroundImage = `url('${urlFresco}')`;
        bgContainer.style.opacity = "1";
    };
    img.onerror = () => {
        bgContainer.style.backgroundColor = "#1a1a1a";
        bgContainer.style.opacity = "1";
    };
};

/******************************************************************************
| C. GENERAZIONE CATALOGO (RENDERING IMMEDIATO)                               |
*******************************************************************************/
const inizializzaCatalogo = () => {
    const grid = document.getElementById('grid-prodotti');
    if (!grid || typeof catalogoProdotti === 'undefined') return;

    const fragment = document.createDocumentFragment();
    grid.innerHTML = ""; 

    catalogoProdotti.forEach((prodotto, index) => {
        const card = document.createElement('div');
        // Usiamo banner-hidden per l'animazione, ma gestiamo l'interno subito
        card.className = 'product-card banner-hidden';
        
        card.innerHTML = `
            <div class="img-loader-skeleton"></div>
            <img src="${prodotto.img}?v=${AppConfig.version}" class="product-banner-img" style="opacity:0">
            <div class="product-info-mini">
                <span>${prodotto.nome}</span>
            </div>
        `;

        const img = card.querySelector('.product-banner-img');
        img.onload = () => {
            img.style.opacity = "1";
            card.querySelector('.img-loader-skeleton')?.remove();
        };
        
        img.onerror = () => {
            card.innerHTML = `<div class="error-placeholder">N/A</div>`;
        };

        card.onclick = () => openSheet(prodotto);
        fragment.appendChild(card);

        // Animazione a cascata
        setTimeout(() => {
            card.classList.replace('banner-hidden', 'banner-visible');
        }, index * 60);
    });

    grid.appendChild(fragment);
};

/******************************************************************************
| D. GESTIONE BOTTOM SHEET (PRO VERSION)                                      |
*******************************************************************************/
const openSheet = (p) => {
    const sheet = document.getElementById('product-sheet'); // ID corretto come da tuo HTML
    const body = document.getElementById('sheet-body');
    if (!sheet || !body) return;

    body.innerHTML = `
        <div class="sheet-handle-container"><div class="sheet-handle"></div></div>
        <img src="${p.img}?v=${AppConfig.version}" class="sheet-img-main">
        <div class="sheet-info-content">
            <h2 class="sheet-title">${p.nome}</h2>
            <div class="sheet-meta-data">
                <div class="location-badge"><span>${p.luogo || 'Italia'}</span></div>
                <div class="info-badge"><span>${p.info || 'Disponibile'}</span></div>
            </div>
            <div class="sheet-desc-container">
                <p>${p.desc || 'Nessuna descrizione.'}</p>
            </div>
            <div class="sheet-order-actions">
                <button class="order-btn signal" onclick="window.Telegram.WebApp.openLink('${LINK_SIGNAL}')">Signal</button>
                <button class="order-btn telegram" onclick="window.Telegram.WebApp.openLink('${LINK_TELEGRAM}')">Telegram</button>
            </div>
        </div>
        <button class="close-sheet-btn" onclick="closeSheet()">Chiudi</button>
    `;

    sheet.style.display = 'block';
    setTimeout(() => sheet.classList.add('active'), 10);
    
    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
};

const closeSheet = () => {
    const sheet = document.getElementById('product-sheet');
    if (!sheet) return;
    sheet.classList.remove('active');
    setTimeout(() => { sheet.style.display = 'none'; }, 500);
};

/******************************************************************************
| E. NAVIGAZIONE E BOOTSTRAP                                                  |
*******************************************************************************/
function showSection(sectionId) {
    // Nascondi tutte le sezioni
    document.querySelectorAll('section, .section').forEach(s => s.style.display = 'none');
    
    // Mostra quella attiva
    const activeSection = document.getElementById(sectionId) || document.getElementById(`sezione-${sectionId}`);
    if (activeSection) {
        activeSection.style.display = 'block';
        
        // Se è la sezione prodotti, assicurati che sia renderizzata
        if (sectionId === 'prodotti' || sectionId === 'sezione-prodotti') {
            inizializzaCatalogo();
        }
    }

    // Animazione banner statici
    const banners = document.querySelectorAll('.banner-hidden');
    banners.forEach((b, i) => {
        setTimeout(() => b.classList.add('banner-visible'), i * 100);
    });
}

const initAppLogic = () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Forza opacità app
    const app = document.getElementById('app');
    if (app) app.style.opacity = "1";

    applicaSfondoDinamico();

    // Avvio della sezione principale
    if (typeof catalogoProdotti !== 'undefined') {
        // Renderizziamo subito il catalogo così è pronto
        inizializzaCatalogo();
        // Mostriamo la home (che contiene i banner benvenuto)
        showSection('home');
    } else {
        logger.error("Dati non caricati.");
    }
};

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppLogic);
} else {
    initAppLogic();
}