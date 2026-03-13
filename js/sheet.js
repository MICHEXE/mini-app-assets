const openSheet = (p) => {
    const sheet = document.getElementById('product-sheet');
    const body = document.getElementById('sheet-body');
    const content = sheet?.querySelector('.sheet-content');

    if (!sheet || !body || !content) return;

    // Blocca scroll
    document.body.style.overflow = 'hidden'; 
    document.body.classList.add('no-scroll'); 



    body.innerHTML = `
        <div class="sheet-handle-container">
            <div class="sheet-handle"></div>
        </div>

        <img src="${p.img}" class="sheet-img-main">
        
        <div class="sheet-info-content">
            <h2 class="sheet-title">${p.nome}</h2>
            
            <div class="sheet-meta-data">
                <div class="location-badge">
                    <svg class="meta-icon" viewBox="0 0 24 24"><path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z" /></svg>
                    <span>${p.luogo}</span>
                </div>

                <div class="info-badge">
                    <svg class="meta-icon" viewBox="0 0 24 24"><path d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.9,2 2,2.9 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.77,11.95 21.41,11.58Z" /></svg>
                    <span>${p.info}</span>
                </div>
            </div>
            
            <div class="sheet-desc-container">
                <svg class="desc-icon" viewBox="0 0 24 24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M11,17H13V11H11V17Z" /></svg>
                <p style="margin: 0;">${p.desc}</p>
            </div>

            <div class="sheet-order-actions">
                <button class="order-btn signal" onclick="window.open('${LINK_SIGNAL}', '_blank')">
                    Ordina su Signal
                </button>
                <button class="order-btn telegram" onclick="window.open('${LINK_TELEGRAM}', '_blank')">
                    Ordina su Telegram
                </button>
            </div>
        </div>

        <div style="padding: 10px 25px 40px;">
            <button class="close-sheet-btn" onclick="closeSheet()">Chiudi</button>
        </div>
    `;

    sheet.style.display = 'block';
    content.scrollTop = 0; 
    setTimeout(() => { sheet.classList.add('active'); }, 10);

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
};

const closeSheet = () => {
    const sheet = document.getElementById('product-sheet');
    if (sheet) {
        sheet.classList.remove('active');
        
        // RIPRISTINA LO SCROLL
        document.body.style.overflow = ''; 
        document.body.classList.remove('no-scroll');
        
        setTimeout(() => { 
            sheet.style.display = 'none'; 
        }, 500);
    }
};