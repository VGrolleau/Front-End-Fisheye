/* eslint-disable no-undef */
let pricePhotographer = 0;
let idPhotographer = 0;
let namePhotographer = "";
let mediasPhotographer = [];
// const focusableSelectors = 'button, img, video';
// let focusablesArray = [];

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

    // focusablesArray = Array.from(document.body.querySelectorAll(focusableSelectors));
    // console.log(focusablesArray);

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
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";

    getLightboxImg(idMedia);
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

function getLightboxImg(idMedia) {
    const lightboxImgContainer = document.querySelector(".lightbox__container");
    const prevButton = document.querySelector(".lightbox__prev");
    const nextButton = document.querySelector(".lightbox__next");
    const closeButton = document.querySelector(".lightbox__close");
    let indexMedia = 0;
    // console.log(mediasPhotographer);
    mediasPhotographer.forEach(mediaPhotographer => {

        if (mediaPhotographer.id === idMedia) {
            if ("video" in mediaPhotographer) {
                console.log("video");
                lightboxImgContainer.innerHTML = `<video controls="">
                <source src="assets/${namePhotographer}/${mediaPhotographer.video}" type="video/mp4">
                </video>`;
            } else {
                console.log("not video");
                lightboxImgContainer.innerHTML = `<img src="assets/${namePhotographer}/${mediaPhotographer.image}" alt="${mediaPhotographer.title}">`;
            }

            const titleMedia = document.createElement('p');
            titleMedia.innerText = mediaPhotographer.title;

            lightboxImgContainer.appendChild(titleMedia);

            indexMedia = mediasPhotographer.findIndex(element => element === mediaPhotographer);
            // console.log(`index n° ${indexMedia} :`, mediasPhotographer[indexMedia]);
        }
    })

    prevButton.addEventListener("click", function() {
        console.log("clicked prev");
        indexMedia--;
        // console.log(`index n° ${indexMedia} :`, mediasPhotographer[indexMedia]);
        if (indexMedia < 0) {
            indexMedia = mediasPhotographer.length - 1;
        }
        console.log(`index n° ${indexMedia} :`, mediasPhotographer[indexMedia]);

        getLightboxImg(mediasPhotographer[indexMedia].id);
    })

    nextButton.addEventListener("click", function() {
        console.log("clicked next");
        indexMedia++;
        if (indexMedia >= mediasPhotographer.length) {
            indexMedia = 0;
        }
        console.log(`index n° ${indexMedia} :`, mediasPhotographer[indexMedia]);

        getLightboxImg(mediasPhotographer[indexMedia].id);
    })

    closeButton.addEventListener("click", function() {
        indexMedia = 0;
    })
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