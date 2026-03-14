/******************************************************************************
| CONFIGURAZIONI GLOBALI & LINK ESTERNI                                       |
*******************************************************************************/
const LINK_SIGNAL = "https://signal.me/#p/+39123456789";
const LINK_TELEGRAM = "https://t.me/donmichhh";

const impostazioniApp = {
    sfondoLink: "https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets@main/img/sfondo.jpg"
};

/******************************************************************************
| CATALOGO PRODOTTI                                                           |
| id: Univoco per ogni prodotto                                               |
| info: Testo che apparirà nel badge azzurro (Sheet)                          |
| luogo: Testo che apparirà nel badge scuro (Sheet)                           |
*******************************************************************************/
const catalogoProdotti = [
    { 
        id: 1, 
        nome: "Prodotto 1", 
        luogo: "ROMA, IT", 
        info: "DISPONIBILE", 
        img: "https://raw.githubusercontent.com/MICHEXE/mini-app-assets/main/img/prodotto2.jpg",
        desc: "In una piccola cittadina, c'era un giovane di nome Luca. Luca era sempre stato un sognatore, un ragazzo con la testa piena di idee e progetti. Tuttavia, c'era una cosa che lo bloccava: la paura del giudizio degli altri. Ogni volta che pensava di avviare un nuovo progetto, si lasciava sopraffare dai dubbi." 
    },
    { 
        id: 2, 
        nome: "Prodotto 2", 
        luogo: "ROMA, IT", 
        info: "EDIZIONE LIMITATA", 
        img: "https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets@main/img/prodotto1.jpg", 
        desc: "Questo prodotto rappresenta l'eccellenza del design moderno. Disponibile solo per un periodo limitato, offre caratteristiche uniche nel suo genere per chi cerca l'esclusività."
    },
    { 
        id: 3, 
        nome: "Prodotto 3", 
        luogo: "MILANO, IT", 
        info: "NUOVO", 
        img: "https://cdn.jsdelivr.net/gh/MICHEXE/mini-app-assets@main/img/prodotto3.jpg", 
        desc: "Nuovo arrivo in catalogo. Qualità garantita e testata per offrire la migliore esperienza possibile all'utente finale."
    }
];

// Esporta per eventuale uso con moduli (opzionale)
// if (typeof module !== 'undefined') module.exports = { catalogoProdotti, impostazioniApp, LINK_SIGNAL, LINK_TELEGRAM };