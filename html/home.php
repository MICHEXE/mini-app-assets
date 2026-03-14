<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Home - Mini App</title>
    
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/style.css?v=3.2">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/css/interattivo.css?v=3.1">

</head>

<body>
<style>
  /* STILE DI EMERGENZA INTEGRATO */
  .sfondo-fisso {
    position: fixed !important;
    top: 0; left: 0; 
    width: 100vw; height: 100vh;
    z-index: -1 !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-color: #1a1a1a !important; /* Grigio se la foto fallisce */
    filter: brightness(0.5) contrast(1.1);
    opacity: 0; /* Parte invisibile per evitare il flash nero */
    transition: opacity 0.8s ease;
    display: block !important;
  }
</style>

<div id="sfondo-dinamico" class="sfondo-fisso"></div>
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

    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/database.js?v=3.4"></script>
    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/scripts.js?v=3.4"></script>
    <script src="https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets/js/sheet.js?v=3.4"></script>
    

    <script>
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); 

    // Recupera il nome utente
    const user = tg.initDataUnsafe?.user;
    const nameElement = document.getElementById('user-name');
    if (nameElement) {
        nameElement.innerText = user ? user.first_name : "Ospite";
    }
    
    // NOTA: Lo sfondo e il catalogo vengono già avviati 
    // automaticamente dal tuo file "scripts.js"
});
</script>
</script>
</body>
</html>