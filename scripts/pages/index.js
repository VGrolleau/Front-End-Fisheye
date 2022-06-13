async function getPhotographers() {
    let rep = await fetch('data/photographers.json', { method: 'GET' });
    let response = await rep.json();
    return response;
}

// let photographersArray = [];

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographersArray = photographers;
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// function focusPhotographer(event) {
//     event.preventDefault();
//     console.log(document.body);
// let index = photographersArray.findIndex(element => element === document.activeElement);

// if (event.shiftKey === true) {
//     index--;
// } else {
//     index++;
// }

// if (index >= photographersArray.length) {
//     index = 0;
// }

// if (index < 0) {
//     index = photographersArray.length - 1;
// }

// photographersArray[index].focus();
// }

// window.addEventListener("keydown", function(event) {
//     // if (event.key === "Escape" || event.key === "Esc") {
//     //     closeModal(event);
//     // }

//     if (event.key === "Tab") {
//         focusPhotographer(event);
//     }
// })

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();