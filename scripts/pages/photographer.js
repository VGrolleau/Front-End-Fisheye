async function getPhotographers() {
    let rep = await fetch('data/photographers.json', { method: 'GET' });
    let response = await rep.json();
    return response;
}

async function displayData(photographers, medias) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographersSection = document.querySelector(".photographer_section");
    const urlId = Number(getUrlId());

    medias.forEach(media => {
        if (urlId === media.photographerId) {
            console.log(media);
        }
    });

    photographers.forEach(photographer => {
        const photographerModel = photographerFactory(photographer);
        // const userCardDOM = photographerModel.getUserCardDOM();
        // photographersSection.appendChild(userCardDOM);
        if (urlId === photographer.id) {
            console.log(photographer);
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