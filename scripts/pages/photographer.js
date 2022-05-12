/* eslint-disable no-undef */
let pricePhotographer = 0;
let idPhotographer = 0;
let namePhotographer = "";
let mediasPhotographer = [];
let currentMediaModel = "";
let currentMediaId = 0;

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
            // console.log(mediaModel);
            mediasPhotographer.push(mediaModel);
            // console.log(mediasPhotographer);
            currentMediaModel = mediaModel;
        }
    });
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
    likesDiv.innerHTML += " <i class=\"fa-solid fa-heart\"></i>";

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

const lightbox = document.querySelector('.lightbox');

function displayLightbox(idMedia) {
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";

    getLightboxImg(idMedia);
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

function getLightboxImg(idMedia) {
    const lightboxImgContainer = document.querySelector(".lightbox__container");
    // console.log(currentMediaModel);
    // console.log(mediasPhotographer);
    // console.log(mediasPhotographer.getElementById(idMedia));
    // console.log(idMedia);
    mediasPhotographer.forEach(mediaPhotographer => {
            // console.log(typeof mediaPhotographer.id);
            // console.log(typeof idMedia);
            if (mediaPhotographer.id === idMedia) {
                console.log(mediaPhotographer);
                lightboxImgContainer.innerHTML = `<img src="assets/${namePhotographer}/${mediaPhotographer.image}" alt="${mediaPhotographer.title}">`;
            }
            // console.log(mediaPhotographer)
        })
        // lightboxImgContainer.
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
    selectCustomize();
    sidebarPriceLikes();
    getAriaModal();
    getNameModal();
    // getLightboxImg();
}

init();