<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Home - Mini App</title>
    
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <script>
        // =============================================================
        // L'UNICA COSA DA CAMBIARE PER AGGIORNARE TUTTI GLI ASSET:
        // =============================================================
        const APP_VERSION = "4.7"; 

        function caricaAsset(tipo, url) {
            return new Promise((resolve, reject) => {
                const freshUrl = url + "?v=" + APP_VERSION;
                if (tipo === 'css') {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = freshUrl;
                    link.onload = resolve;
                    link.onerror = reject;
                    document.head.appendChild(link);
                } else if (tipo === 'js') {
                    const script = document.createElement('script');
                    script.src = freshUrl;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                }
            });
        }

        // Caricamento SEQUENZIALE professionale
        async function inizializzaApp() {
            try {
                await caricaAsset('css', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css');
                await caricaAsset('css', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css');
                await caricaAsset('js', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/database.js');
                await caricaAsset('js', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/scripts.js');
                await caricaAsset('js', 'https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/sheet.js');
                
                // --- AGGIUNTA: Forza la visibilità appena finito il caricamento ---
                document.getElementById('app').style.opacity = "1";
                
                console.log("Sistema caricato con Versione: " + APP_VERSION);
            } catch (e) {
                console.error("Errore critico nel caricamento asset:", e);
            }
        }

        // Avvia il caricamento degli asset esterni
        inizializzaApp();
    </script>

</head>
<style>
    /* Fix immediato pre-caricamento */
    #sfondo-dinamico { 
        position: fixed; 
        top:0; left:0; 
        width:100vw; height:100vh; 
        background-color: #1a1a1a; 
        z-index: -1; 
    }
    #app { 
        opacity: 0; 
        position: relative; 
        z-index: 1; 
    }
</style>

<body>
    <div id="sfondo-dinamico"></div>

    <div id="app">
        <div id="banner-home-1" class="banner-hidden">
            <div class="banner-titolo">
                <div class="header-left">
                    <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/ciao.svg" class="icon-ciao" alt="ciao">
                    <span>BenvenutooO</span>
                </div>
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/shuriken.svg" class="icon-shuriken" alt="shuriken">
            </div>
            <div class="banner-contenuto">
                <div id="user-name">Caricamento...</div>
            </div>
        </div>

        <div id="banner-home-2" class="banner-hidden">  
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
            <a href="home.php" class="menu-link active">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/home.svg" class="menu-svg" alt="home">
                <span>Home</span>
            </a>
            <a href="Recensioni.php" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/star.svg" class="menu-svg" alt="star">
                <span>Recensioni</span>
            </a>
            <a href="Info.php" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/info.svg" class="menu-svg" alt="info">
                <span>Info</span>
            </a>
            <a href="Contatti.php" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/mail.svg" class="menu-svg" alt="mail">
                <span>Contatti</span>
            </a>
        </nav>

        <div id="product-sheet" class="bottom-sheet">
            <div class="sheet-overlay" onclick="closeSheet()"></div>
            <div class="sheet-content">
                <div id="sheet-body"></div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand(); 

            // Recupera il nome utente da Telegram
            const user = tg.initDataUnsafe?.user;
            const nameElement = document.getElementById('user-name');
            if (nameElement) {
                nameElement.innerText = user ? user.first_name : "Ospite";
            }
        });
    </script>
</body>
</html>