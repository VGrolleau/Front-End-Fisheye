const photographerInfo = document.querySelector(".photographer-info");
const photographerImg = document.querySelector(".photographer_img");
const photographersSection = document.querySelector(".photographer_section");
const urlId = Number(getUrlId());
let photographerModel;
let mediaModel;
let pricePhotographer = 0;
let idPhotographer = 0;
let namePhotographer = "";
let mediasPhotographer = [];
let likesNumber = 0;

async function getPhotographers() {
    let rep = await fetch('data/photographers.json', { method: 'GET' });
    let response = await rep.json();
    return response;
}

function displayData(photographers, medias) {
    photographers.forEach(photographer => {
        if (urlId === photographer.id) {
            photographerModel = new PhotographerFactory(photographer);
            photographerModel.getUserInfo(photographerInfo);
            photographerImg.appendChild(photographerModel.getUserImg());
            idPhotographer = photographer.id;
            namePhotographer = photographer.name;
            pricePhotographer = photographer.price;
            return idPhotographer, namePhotographer;
        }
    });

    medias.forEach(media => {
        if (urlId === media.photographerId) {
            mediaModel = new MediaFactory(media, namePhotographer);
            photographersSection.appendChild(mediaModel.getMediaCardDOM());
            mediasPhotographer.push(mediaModel);
            likesNumber += media.likes;
        }
    });

    const aImg = document.querySelectorAll(".a-img");
    aImg.forEach(a => a.addEventListener("click", (event) => {
        event.preventDefault();
    }))
}

// Récupération de l'id dans l'URL
function getUrlId() {
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const urlId = urlSearchParams.get("id");

    return urlId;
}

// Customisation du select
function selectCustomize() {
    const orderByBtn = document.querySelector(".order-by-btn span");
    const ordersByLi = document.querySelectorAll(".order-by-li");

    ordersByLi.forEach((orderByLi) =>
        orderByLi.addEventListener('click', () => {
            orderByBtn.textContent = orderByLi.textContent;
            if (orderByLi.textContent === "Popularité") {
                orderByPopularity();
            }
            if (orderByLi.textContent === "Date") {
                orderByDate();
            }
            if (orderByLi.textContent === "Titre") {
                orderByTitle();
            }
        })
    );
}

// Tri par popularité
function orderByPopularity() {
    photographersSection.innerHTML = "";

    mediasPhotographer.sort(function(a, b) {
        return a.likes - b.likes;
    });

    displayOrdered();
}

// Tri par date
function orderByDate() {
    photographersSection.innerHTML = "";

    mediasPhotographer.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    displayOrdered();
}

// Tri par titre
function orderByTitle() {
    photographersSection.innerHTML = "";

    mediasPhotographer.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });

    displayOrdered();
}

// Affichage selon le tri
function displayOrdered() {
    mediasPhotographer.forEach(mediaModel => {
        photographersSection.appendChild(mediaModel.getMediaCardDOM());
    })

    const aImg = document.querySelectorAll(".a-img");
    aImg.forEach(a => a.addEventListener("click", (event) => {
        event.preventDefault();
    }))
}

// Affichage de la barre avec le prix et le total des likes
function sidebarPriceLikes() {
    const priceLikesSidebar = document.querySelector(".price-likes-sidebar");

    const likesDiv = document.createElement('div');
    likesDiv.innerHTML += `<span class="like-span">${likesNumber}</span> <i class="fa-solid fa-heart"></i>`;

    const priceDiv = document.createElement('div');
    priceDiv.innerText = pricePhotographer + "€ / jour";

    priceLikesSidebar.appendChild(likesDiv);
    priceLikesSidebar.appendChild(priceDiv);
}

// Obtention du nom du photographe dans la modale
function getNameModal() {
    const modalNamePhotographer = document.querySelector(".modal-name-photographer");
    modalNamePhotographer.innerText = namePhotographer;
}

// Affichage de la lightbox
function displayLightbox(media) {
    const lightboxModel = new Lightbox(mediasPhotographer, namePhotographer);
    lightboxModel.getLightbox(media);

    const lightbox = document.querySelector(".lightbox");
    lightbox.setAttribute("aria-label", "Lightbox");
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
    selectCustomize();
    sidebarPriceLikes();
    getNameModal();
}

init();