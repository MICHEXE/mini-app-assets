<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Home - Mini App</title>
    
    
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css?v=1.4">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css?v=1.4">

</head>

<body>
    <video id="v0" preload="auto" muted playsinline webkit-playsinline autoplay loop 
       style="position: fixed; top: 0; left: 0; min-width: 100%; min-height: 100%; z-index: -1; object-fit: cover;">
    <source src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/img/camper-scroll.mp4" type="video/mp4">
</video>

    <div id="app">
        <div id="banner-home-1" class="banner-hidden">
            <div class="banner-titolo">
                <div class="header-left">
                    <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/ciao.svg" class="icon-ciao" alt="ciao">
                    <span>Benvenuto</span>
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


    
    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/database.js?v=1.1"></script>
<script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/sheet.js?v=1.1"></script>
<script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/scripts.js?v=1.1"></script>


    <script>
        // Opzionale: Visualizza il nome dell'utente Telegram
        document.addEventListener('DOMContentLoaded', () => {
            const tg = window.Telegram.WebApp;
            const user = tg.initDataUnsafe?.user;
            if (user) {
                document.getElementById('user-name').innerText = user.first_name;
            } else {
                document.getElementById('user-name').innerText = "Ospite";
            }
        });
    </script>