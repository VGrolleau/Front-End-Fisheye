async function getPhotographerById(id) {
    let rep = await fetch('data/photographers.json' + id, { method: 'GET' });
    let response = await rep.json();
    return response;
}

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographerById(id);
    displayData(photographers);
};

init();