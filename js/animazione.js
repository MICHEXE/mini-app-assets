const bannerSignal = document.getElementById('banner-contatti-2');
const iconShare = bannerSignal.querySelector('.icon-condividi');

bannerSignal.addEventListener('mouseenter', () => {
    // Effetto vibrazione opzionale al passaggio
    iconShare.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
});

bannerSignal.addEventListener('mouseleave', () => {
    iconShare.style.transform = "translateX(0)";
});