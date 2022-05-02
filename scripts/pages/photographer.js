async function getPhotographers() {
    let rep = await fetch('data/photographers.json', { method: 'GET' });
    let response = await rep.json();
    return response;
}

async function displayData(photographers, medias) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerInfo = document.querySelector(".photographer-info");
    const photographerImg = document.querySelector(".photographer_img");
    const photographersSection = document.querySelector(".photographer_section");
    const urlId = Number(getUrlId());

    photographers.forEach(photographer => {
        if (urlId === photographer.id) {
            const photographerModel = new PhotographerFactory(photographer);
            photographerModel.getUserInfo(photographerInfo);
            photographerImg.appendChild(photographerModel.getUserImg());
        }
    });

    medias.forEach(media => {
        if (urlId === media.photographerId) {
            console.log(media);
        }
    });
};

// Récupération de l'id dans l'URL
function getUrlId() {
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const urlId = urlSearchParams.get("id");

    return urlId;
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
};

init();