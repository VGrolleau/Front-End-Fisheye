/* eslint-disable no-unused-vars */
const modal = document.getElementById("contact_modal");
let activModal = null;
const focusableSelector = 'input, textarea, button';
let focusables = [];
let previouslyFocusedElement = null;

modal.addEventListener("submit", (event) => {
    event.preventDefault();
    const formSelector = 'input, textarea';
    const formSelectors = document.querySelectorAll(formSelector);
    let formValuesComplete = 0;
    formSelectors.forEach(selector => {
        if (selector.value === "") {
            selector.labels.forEach(label => console.warn(`Le champ "${label.textContent}" est vide`));
        } else {
            selector.labels.forEach(label => console.log(`${label.textContent} : ${selector.value}`));
            formValuesComplete += 1;
        }
    });

    // console.log(formSelectors.length);

    formValuesComplete === formSelectors.length ? console.log("formValuesComplete :", formValuesComplete) : console.log("");

    closeModal();
})

function displayModal() {
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus');
    focusables[0].focus();
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    activModal = modal;
}

function closeModal() {
    if (activModal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();

    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.querySelector('.modal-close').removeEventListener('click', closeModal);

    const hideModal = function() {
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal);
        activModal = null;
    }
    activModal.addEventListener("animationend", hideModal);
}

function focusInModal(event) {
    event.preventDefault();
    let index = focusables.findIndex(element => element === activModal.querySelector(':focus'));

    if (event.shiftKey === true) {
        index--;
    } else {
        index++;
    }

    if (index >= focusables.length) {
        index = 0;
    }

    if (index < 0) {
        index = focusables.length - 1;
    }

    focusables[index].focus();
}

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }

    if (event.key === "Tab" && activModal !== null) {
        focusInModal(event);
    }
})