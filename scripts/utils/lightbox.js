const lightbox = document.querySelector('.lightbox');

function displayLightbox() {
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}