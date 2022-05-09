let activModal = null;
const focusableSelector = 'input, textarea, button';
let focusables = [];
let previouslyFocusedElement = null;

function displayModal() {
    const modal = document.getElementById("contact_modal");
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

    const modal = document.getElementById("contact_modal");

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
    console.log(focusables[index]);
}

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }

    if (event.key === "Tab" && activModal !== null) {
        focusInModal(event);
    }
})