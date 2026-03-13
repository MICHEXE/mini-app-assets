<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Home - Mini App</title>
    
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css?v=3.2">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css?v=3.2">

    <style>
        /* FIX DEFINITIVO PER EVITARE IL ROSSO */
        .product-card {
            background-color: #1a1a1a !important; /* Sfondo scuro neutro */
            min-height: 150px;
            display: block !important;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }
        .product-banner-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
        }
    </style>
</head>

<body>
    <video id="v0" preload="auto" muted playsinline webkit-playsinline autoplay loop 
           style="position: fixed; top: 0; left: 0; min-width: 100%; min-height: 100%; z-index: -1; object-fit: cover;">
        <source src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/img/camper-scroll.mp4" type="video/mp4">
    </video>

    <div id="app">
        <div id="banner-home-1">
            <div class="banner-titolo">
                <div class="header-left">
                    <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/ciao.svg" class="icon-ciao" alt="ciao">
                    <span>Benvenuto</span>
                </div>
            </div>
            <div class="banner-contenuto">
                <div id="user-name">Caricamento...</div>
            </div>
        </div>

        <div id="banner-home-2">  
            <div class="banner-titolo">
                <div class="titolo-left">
                    <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/filtro.svg" class="icon-filtro" alt="filtro">
                    <span>Prodotti</span>
                </div>
            </div>
        </div>

        <section id="sezione-prodotti">
            <div id="grid-prodotti" class="grid-container"></div>
        </section>

        <nav id="bottom-menu">
            <a href="home.php" class="menu-link active">Home</a>
            <a href="Recensioni.php" class="menu-link">Recensioni</a>
            <a href="Info.php" class="menu-link">Info</a>
            <a href="Contatti.php" class="menu-link">Contatti</a>
        </nav>

        <div id="product-sheet" class="bottom-sheet">
            <div class="sheet-overlay" onclick="closeSheet()"></div>
            <div class="sheet-content"><div id="sheet-body"></div></div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/database.js?v=3.0"></script>
    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/sheet.js?v=3.0"></script>

    <script>
        const inizializzaCatalogo = () => {
            const grid = document.getElementById('grid-prodotti');
            if (!grid || typeof catalogoProdotti === 'undefined') {
                console.error("Database non caricato!");
                return;
            }
            
            grid.innerHTML = ""; 

            catalogoProdotti.forEach((p, index) => {
                const card = document.createElement('div');
                card.className = 'product-card'; 
                
                // Usiamo un link pulito e forziamo il caricamento
                const cleanImg = p.img.trim();

                card.innerHTML = `
                    <img src="${cleanImg}" 
                         alt="${p.nome}" 
                         class="product-banner-img" 
                         onerror="this.src='https://via.placeholder.com/500x500?text=Errore+Immagine'"
                         onload="this.parentElement.style.opacity='1'; this.parentElement.style.transform='translateY(0)'">
                `;
                
                card.addEventListener('click', () => {
                    if(typeof openSheet === 'function') openSheet(p);
                });
                
                grid.appendChild(card);
            });
        };

        document.addEventListener('DOMContentLoaded', () => {
            const tg = window.Telegram.WebApp;
            tg.expand();
            const user = tg.initDataUnsafe?.user;
            document.getElementById('user-name').innerText = user ? user.first_name : "Ospite";
            
            // Un piccolo ritardo per essere sicuri che il database sia pronto
            setTimeout(inizializzaCatalogo, 300);
        });
    </script>
</body>
</html>