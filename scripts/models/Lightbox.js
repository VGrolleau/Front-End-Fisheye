class Lightbox {
    constructor(mediasPhotographer, namePhotographer) {
        this.lightbox = document.querySelector('.lightbox');
        this.previouslyFocused = null;
        this.focusableSelectorsLightbox = 'button';
        this.focusablesLightboxArray = [];
        this.activLightbox = null;
        this.idMedia = mediasPhotographer.id;
        this.image = mediasPhotographer.image;
        this.video = mediasPhotographer.video;
        this.photographerId = mediasPhotographer.photographerId;
        this.title = mediasPhotographer.title;
        this.namePhotographer = namePhotographer;
        // this.mediasPhotographer = mediasPhotographer;
        // this.photographers = photographers;
        // this.namePhotographer = photographers.name;
        // this.idPhotographer = photographers.id;
        // console.log(mediasPhotographer);
        // console.log(mediasPhotographer);
    }

    getLightbox(idMedia, titleMedia, type) {
        // const lightbox = document.querySelector('.lightbox');
        // let previouslyFocused = null;
        // const focusableSelectorsLightbox = 'button';
        // let focusablesLightboxArray = [];
        // let activLightbox = null;
        this.focusablesLightboxArray = Array.from(this.lightbox.querySelectorAll(this.focusableSelectorsLightbox));
        this.previouslyFocused = document.querySelector(':focus');
        this.focusablesLightboxArray[0].focus();
        this.lightbox.style.display = "flex";
        this.lightbox.removeAttribute("aria-hidden");
        this.lightbox.setAttribute("aria-modal", "true");
        document.body.style.overflow = "hidden";

        this.getLightboxImg(idMedia, titleMedia, type);
        this.activLightbox = this.lightbox;
    }

    closeLightbox() {
        if (this.activLightbox === null) return;
        if (this.previouslyFocused !== null) this.previouslyFocused.focus();

        this.lightbox.setAttribute("aria-hidden", "true");
        this.lightbox.removeAttribute("aria-modal");
        this.lightbox.querySelector('.lightbox__close').removeEventListener('click', this.closeLightbox);

        this.lightbox.style.display = "none";
        document.body.style.overflow = "auto";
        this.activLightbox = null;
    }

    getLightboxImg(idMedia, titleMedia, type) {
        const lightboxImgContainer = document.querySelector(".lightbox__container");
        const prevButton = document.querySelector(".lightbox__prev");
        const nextButton = document.querySelector(".lightbox__next");
        const closeButton = document.querySelector(".lightbox__close");
        let indexMedia = 0;

        // this.mediasPhotographer.forEach(mediaPhotographer => {
        //     if (mediaPhotographer.id === idMedia) {
        // if ("video" in mediaPhotographer) {
        if (type === "video") {
            lightboxImgContainer.innerHTML = `<video controls="">
                <source src="assets/${this.namePhotographer}/${idMedia}" type="video/mp4">
                </video>`;
        } else {
            lightboxImgContainer.innerHTML = `<img src="assets/${this.namePhotographer}/${idMedia}" alt="${titleMedia}">`;
        }

        const titleMediaP = document.createElement('p');
        titleMediaP.innerText = titleMedia;

        lightboxImgContainer.appendChild(titleMediaP);

        // indexMedia = this.mediasPhotographer.findIndex(element => element === mediaPhotographer);
        // console.log(`index n° ${indexMedia} :`, this.mediasPhotographer[indexMedia]);
        //     }
        // })

        prevButton.addEventListener("click", function() {
            console.log("clicked prev");
            indexMedia--;
            // console.log(`index n° ${indexMedia} :`, mediasPhotographer[indexMedia]);
            if (indexMedia < 0) {
                indexMedia = this.mediasPhotographer.length - 1;
            }
            console.log(`index n° ${indexMedia} :`, this.mediasPhotographer[indexMedia]);

            this.getLightboxImg(this.mediasPhotographer[indexMedia].id);
        })

        nextButton.addEventListener("click", function() {
            console.log("clicked next");
            indexMedia++;
            if (indexMedia >= this.mediasPhotographer.length) {
                indexMedia = 0;
            }
            console.log(`index n° ${indexMedia} :`, this.mediasPhotographer[indexMedia]);

            this.getLightboxImg(this.mediasPhotographer[indexMedia].id);
        })

        closeButton.addEventListener("click", function() {
            indexMedia = 0;
            this.closeButton();
        })
    }

    focusInLightbox(event) {
        event.preventDefault();
        let indexFocusLightbox = this.focusablesLightboxArray.findIndex(element => element === this.activLightbox.querySelector(':focus'));

        if (event.shiftKey === true) {
            indexFocusLightbox--;
        } else {
            indexFocusLightbox++;
        }

        if (indexFocusLightbox >= this.focusablesLightboxArray.length) {
            indexFocusLightbox = 0;
        }

        if (indexFocusLightbox < 0) {
            indexFocusLightbox = this.focusablesLightboxArray.length - 1;
        }

        this.focusablesLightboxArray[indexFocusLightbox].focus();
    }

    // this.lightbox.addEventListener("keydown", function(event) {
    //     if (event.key === "Escape" || event.key === "Esc") {
    //         closeLightbox();
    //     }

    //     if (event.key === "Tab" && activLightbox !== null) {
    //         focusInLightbox(event);
    //     }
    // })
}