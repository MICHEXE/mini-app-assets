<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Mini App Pro</title>
    
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <script>
        // Versione globale per il controllo della cache
        const APP_VERSION = "4.9"; 

        /**
         * Carica dinamicamente script e stili con cache busting
         */
        function caricaAsset(tipo, url) {
            return new Promise((resolve, reject) => {
                const freshUrl = `${url}?v=${APP_VERSION}`;
                let el;
                
                if (tipo === 'css') {
                    el = document.createElement('link');
                    el.rel = 'stylesheet';
                    el.href = freshUrl;
                } else {
                    el = document.createElement('script');
                    el.src = freshUrl;
                    el.async = false; // Mantiene l'ordine di esecuzione
                }

                el.onload = resolve;
                el.onerror = () => reject(new Error(`Errore caricamento: ${url}`));
                document.head.appendChild(el);
            });
        }

        /**
         * Orchestrazione del caricamento sequenziale
         */
        async function inizializzaApp() {
            try {
                // Carichiamo prima i CSS per evitare glitch visivi
                await Promise.all([
                    caricaAsset('css', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css'),
                    caricaAsset('css', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css')
                ]);

                // Carichiamo i JS in ordine logico
                await caricaAsset('js', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/database.js');
                await caricaAsset('js', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/scripts.js');
                
                // Una volta caricati i dati, mostriamo l'interfaccia
                document.documentElement.classList.add('app-loaded');
                console.log(`[System] Versione ${APP_VERSION} pronta.`);
            } catch (e) {
                console.error("Errore critico durante l'avvio:", e);
            }
        }

        inizializzaApp();
    </script>

    <style>
        /* CSS Critico per il pre-load */
        :root { --bg-dark: #1a1a1a; }
        body { background-color: var(--bg-dark); margin: 0; overflow: hidden; }
        #sfondo-dinamico { position: fixed; inset: 0; background-color: var(--bg-dark); z-index: -1; }
        #app { opacity: 0; transition: opacity 0.5s ease; position: relative; z-index: 1; }
        .app-loaded #app { opacity: 1; }
    </style>
</head>

<body>
    <div id="sfondo-dinamico"></div>

    <div id="app">
        <header id="banner-home-1" class="banner-hidden">
            <div class="banner-titolo">
                <div class="header-left">
                    <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/ciao.svg" class="icon-ciao" alt="Ciao">
                    <span>Benvenuto</span>
                </div>
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/shuriken.svg" class="icon-shuriken" alt="Star">
            </div>
            <div class="banner-contenuto">
                <div id="user-name">Ospite</div>
            </div>
        </header>

        <div id="banner-home-2" class="banner-hidden">  
            <div class="banner-titolo">
                <div class="titolo-left">
                    <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/filtro.svg" class="icon-filtro" alt="Filtro">
                    <span>Catalogo Prodotti</span>
                </div>
            </div>
        </div>

        <main id="sezione-prodotti">
            <div id="grid-prodotti" class="grid-container">
                </div>
        </main>

        <nav id="bottom-menu">
            <a href="#" onclick="showSection('home')" class="menu-link active">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/home.svg" class="menu-svg" alt="Home">
                <span>Home</span>
            </a>
            <a href="#" onclick="showSection('recensioni')" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/star.svg" class="menu-svg" alt="Recensioni">
                <span>Feedback</span>
            </a>
            <a href="#" onclick="showSection('info')" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/info.svg" class="menu-svg" alt="Info">
                <span>Info</span>
            </a>
            <a href="#" onclick="showSection('contatti')" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/mail.svg" class="menu-svg" alt="Mail">
                <span>Supporto</span>
            </a>
        </nav>

        <div id="bottom-sheet" class="bottom-sheet">
            <div class="sheet-overlay" onclick="closeSheet()"></div>
            <div class="sheet-content">
                <div class="sheet-handle"></div> <div id="sheet-body">
                    </div>
            </div>
        </div>
    </div>

    <script>
        // Inizializzazione dati utente Telegram
        document.addEventListener('DOMContentLoaded', () => {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
            
            // Imposta colore header Telegram
            tg.setHeaderColor('#1a1a1a');

            const user = tg.initDataUnsafe?.user;
            if (user && user.first_name) {
                document.getElementById('user-name').innerText = user.first_name;
            }
        });
    </script>
</body>
</html>