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
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;

    formSelectors.forEach(selector => {
        if (selector.value === "") {
            selector.labels.forEach(label => console.warn(`Le champ "${label.textContent}" est vide`));
        } else {
            switch (selector.id) {
                case "contact_firstname":
                    if (selector.value.length <= 2) {
                        console.warn("Le prénom doit faire plus de 2 caractères");
                    } else {
                        selector.labels.forEach(label => console.log(`${label.textContent} : "${selector.value}"`));
                        formValuesComplete += 1;
                    }
                    break;

                case "contact_lastname":
                    if (selector.value.length <= 1) {
                        console.warn("Le nom doit contenir minimum 1 caractère");
                    } else {
                        selector.labels.forEach(label => console.log(`${label.textContent} : "${selector.value}"`));
                        formValuesComplete += 1;
                    }
                    break;

                case "contact_email":
                    if (!regexEmail.test(selector.value)) {
                        console.warn("Merci de renseigner un email valide");
                    } else {
                        selector.labels.forEach(label => console.log(`${label.textContent} : "${selector.value}"`));
                        formValuesComplete += 1;
                    }
                    break;

                case "contact_message":
                    selector.labels.forEach(label => console.log(`${label.textContent} : "${selector.value}"`));
                    formValuesComplete += 1;
                    break;

                default:
                    break;
            }
        }
    });

    if (formValuesComplete === formSelectors.length) {
        closeModal();
        document.contactForm.reset();
        formValuesComplete = 0;
    }
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