<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Recensioni - Mini App</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css?v=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css?v=1.0">
</head>
<body>
    <video id="v0" preload="auto" muted playsinline webkit-playsinline autoplay loop 
       style="position: fixed; top: 0; left: 0; min-width: 100%; min-height: 100%; z-index: -1; object-fit: cover;">
    <source src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/img/camper-scroll.mp4" type="video/mp4">
</video>
    <div id="app">

    <div id="banner-recensioni-1" class="banner-hidden">
        <div class="banner-titolo"> Recensioni Clienti </div>
        <div class="banner-contenuto">Cosa pensano i nostri clienti di noi</div>
    </div>

        <nav id="bottom-menu">
            <a href="home.php" class="menu-link">
                <img src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/svg/home.svg" class="menu-svg" alt="home">
                <span>Home</span>
            </a>

            <a href="Recensioni.php" class="menu-link active">
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
    </div> 

    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/scripts.js?v=1.1"></script>
        <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/interattivo.js?v=1.1"></script>

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