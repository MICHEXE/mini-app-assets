<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Info - Mini App</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link rel="stylesheet" href="../css/style.css?v=8.2">
    <link rel="stylesheet" href="../css/interattivo.css?v=8.2">
</head>
<body>
<video id="v0" preload="auto" muted playsinline webkit-playsinline autoplay loop 
       style="position: fixed; top: 0; left: 0; min-width: 100%; min-height: 100%; z-index: -1; object-fit: cover;">
    <source src="../img/camper-scroll.mp4" type="video/mp4">
</video>

    <div id="app">
        <div id="banner-info-1" class="banner-hidden">
            <div class="banner-titolo"> INFORMAZIONI </div>
            <div class="banner-contenuto">Tutti gli ordini vengono effettuati su Telegram.</div>
        </div>

        <div id="banner-info-2" class="banner-hidden">
            <div class="banner-titolo">
                <div class="icon-wrapper">
                    <img src="../svg/box.svg" class="icon-img" >
                </div> 
                Servizio Di Spedizione 
            </div>
            <div class="banner-contenuto">pagamento in contanti</div>
        </div>

        <div id="banner-info-3" class="banner-hidden">
            <div class="banner-titolo">
                <div class="icon-wrapper">
                    <img src="../svg/twouser.svg" class="icon-img">
                </div> 
                MEET UP 
            </div>
            <div class="banner-contenuto">
                <p>POSIZIONE</p>
                <p>Orari: NO STOP</p>
            </div>
        </div>

        <div id="banner-info-4" class="banner-hidden">
    <div class="banner-titolo">
        <div class="icon-wrapper">
            <img src="../svg/shield.svg" class="icon-img">
        </div> 
        ALL INFO HERE 
    </div>
    <div class="banner-contenuto">24h/24h</div>

    <a href="https://t.me/donmichhh" target="_blank" class="btn-chat-banner">
        @donmichhh
    </a>
</div>

        <nav id="bottom-menu">
            <a href="home.php" class="menu-link">
                <img src="../svg/home.svg" class="menu-svg" alt="home">
                <span>Home</span>
            </a>
            <a href="Recensioni.php" class="menu-link">
                <img src="../svg/star.svg" class="menu-svg" alt="star">
                <span>Recensioni</span>
            </a>
            <a href="Info.php" class="menu-link active">
                <img src="../svg/info.svg" class="menu-svg" alt="info">
                <span>Info</span>
            </a>
            <a href="Contatti.php" class="menu-link">
                <img src="../svg/mail.svg" class="menu-svg" alt="mail">
                <span>Contatti</span>
            </a>
        </nav>
    </div>

    <script src="../js/scripts.js"></script>
<script src="../js/interattivo.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    // Seleziona tutti i banner che hanno la classe hidden
    const banners = document.querySelectorAll('.banner-hidden');
    
    banners.forEach((banner, index) => {
        // Li rendiamo visibili con un piccolo ritardo "a cascata"
        setTimeout(() => {
            banner.classList.add('banner-visible');
        }, index * 150); // 150ms di ritardo tra un banner e l'altro
    });
});
</script>
</body>
</html>