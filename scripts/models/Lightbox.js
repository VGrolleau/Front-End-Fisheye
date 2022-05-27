class Lightbox {
    static open = false;

    constructor(mediasPhotographer, namePhotographer) {
        this.lightbox = document.querySelector('.lightbox');
        this.previouslyFocused = null;
        this.focusableSelectorsLightbox = 'button';
        this.focusablesLightboxArray = [];
        this.activLightbox = null;
        this.medias = mediasPhotographer;
        this.namePhotographer = namePhotographer;
        this.indexMedia = null;

        // Lightbox.open = this.openFalse;
        this.closeButton = document.querySelector(".lightbox__close");
        this.closeButton.addEventListener("click", () => { this.closeLightbox() });

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape" || event.key === "Esc") {
                this.closeLightbox();
            }
            if (event.key === "Tab" && this.activLightbox !== null) {
                this.focusInLightbox(event);
            }
        })

        if (!Lightbox.open) {
            this.prevButton = document.querySelector(".lightbox__prev");
            this.prevButton.addEventListener("click", () => { this.prevMedia() });

            this.nextButton = document.querySelector(".lightbox__next");
            this.nextButton.addEventListener("click", () => { this.nextMedia() });
        }
        Lightbox.open = true;
    }

    // static openFalse() {
    //     Lightbox.open = false
    // }

    getLightbox(media) {
        this.focusablesLightboxArray = Array.from(this.lightbox.querySelectorAll(this.focusableSelectorsLightbox));
        this.previouslyFocused = document.querySelector(':focus');
        this.focusablesLightboxArray[0].focus();
        this.lightbox.style.display = "flex";
        this.lightbox.removeAttribute("aria-hidden");
        this.lightbox.setAttribute("aria-modal", "true");
        document.body.style.overflow = "hidden";

        // Mettre à jour this.index avec index du media dans le tableau mediasPhotographer
        for (let i = 0; i < this.medias.length; i++) {
            if (this.medias[i] === media) {
                this.indexMedia = i;
            }
        }
        console.log(this.indexMedia);

        this.activLightbox = this.lightbox;
        this.getLightboxImg(media);
    }

    closeLightbox() {
        if (this.activLightbox === null) return;

        this.indexMedia = null;
        console.log('indexMedia close :', this.indexMedia);
        if (this.previouslyFocused !== null) this.previouslyFocused.focus();

        this.lightbox.setAttribute("aria-hidden", "true");
        this.lightbox.removeAttribute("aria-modal");
        this.closeButton.removeEventListener('click', () => { this.closeLightbox() });

        this.lightbox.style.display = "none";
        document.body.style.overflow = "auto";
        this.activLightbox = null;
        // Lightbox.open = false;
    }

    getLightboxImg(media) {
        const lightboxImgContainer = document.querySelector(".lightbox__container");

        lightboxImgContainer.innerHTML = media.getMediaLightboxCardDom();

        const titleMediaP = document.createElement('p');
        titleMediaP.innerText = media.title;

        lightboxImgContainer.appendChild(titleMediaP);
    }

    prevMedia() {
        console.log("clicked prev", this.indexMedia);
        this.indexMedia--;
        if (this.indexMedia < 0) {
            this.indexMedia = this.medias.length - 1;
        }
        console.log(`index n° ${this.indexMedia} :`, this.medias[this.indexMedia]);

        this.getLightboxImg(this.medias[this.indexMedia]);
    }

    nextMedia() {
        console.log("clicked next");
        this.indexMedia++;
        if (this.indexMedia >= this.medias.length) {
            this.indexMedia = 0;
        }
        console.log(`index n° ${this.indexMedia} :`, this.medias[this.indexMedia]);

        this.getLightboxImg(this.medias[this.indexMedia]);
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
}