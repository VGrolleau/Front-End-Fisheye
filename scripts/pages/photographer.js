/* eslint-disable no-undef */
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
    const photographerInfo = document.querySelector(".photographer-info");
    const photographerImg = document.querySelector(".photographer_img");
    const photographersSection = document.querySelector(".photographer_section");
    const urlId = Number(getUrlId());

    photographers.forEach(photographer => {
        if (urlId === photographer.id) {
            const photographerModel = new PhotographerFactory(photographer);
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
            const mediaModel = new MediaFactory(media, namePhotographer);
            photographersSection.appendChild(mediaModel.getMediaCardDOM());
            mediasPhotographer.push(mediaModel);
            currentMediaModel = mediaModel;
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
            orderByBtn.textContent = orderByLi.textContent
        })
    );
}

function sidebarPriceLikes() {
    const priceLikesSidebar = document.querySelector(".price-likes-sidebar");

    const likesDiv = document.createElement('div');
    likesDiv.innerHTML += `<span class="like-span">${likesNumber}</span> <i class="fa-solid fa-heart"></i>`;

    const priceDiv = document.createElement('div');
    priceDiv.innerText = pricePhotographer + "€ / jour";

    priceLikesSidebar.appendChild(likesDiv);
    priceLikesSidebar.appendChild(priceDiv);
}

function getAriaModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-labelledby", "Contact me " + namePhotographer);
}

function getNameModal() {
    const modalNamePhotographer = document.querySelector(".modal-name-photographer");
    modalNamePhotographer.innerText = namePhotographer;
}

function displayLightbox(media) {
    const lightboxModel = new Lightbox(mediasPhotographer, namePhotographer);
    lightboxModel.getLightbox(media);
    lightboxModel.open = false;
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
    selectCustomize();
    sidebarPriceLikes();
    getAriaModal();
    getNameModal();
}

init();