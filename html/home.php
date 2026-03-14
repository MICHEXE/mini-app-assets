<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Home - Mini App</title>
    
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css?v=2.8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css?v=2.8">

</head>

<body>
<div id="sfondo-dinamico" class="sfondo-main"></div>
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

    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/database.js?v=2.9"></script>
    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/scripts.js?v=2.9"></script>
    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/sheet.js?v=2.9"></script>
    

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const tg = window.Telegram.WebApp;
            tg.expand(); // Espande la mini app al massimo
            const user = tg.initDataUnsafe?.user;
            document.getElementById('user-name').innerText = user ? user.first_name : "Ospite";
            
            // Avvia la funzione che crea la griglia (che sta in scripts.js)
            if (typeof inizializzaCatalogo === 'function') {
                inizializzaCatalogo();
            }
        });

        
    </script>
</body>
</html>