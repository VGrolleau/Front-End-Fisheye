class Lightbox {
    constructor(mediasPhotographer, namePhotographer) {
        this.lightbox = document.querySelector('.lightbox');
        this.previouslyFocused = null;
        this.focusableSelectorsLightbox = 'button';
        this.focusablesLightboxArray = [];
        this.activLightbox = null;
        this.medias = mediasPhotographer;
        this.namePhotographer = namePhotographer;
        this.index = 0;
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
    }

    getLightbox(media) {
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

        // Mettre à jour this.index avec index du media dans le tableau mediasPhotographer


        this.activLightbox = this.lightbox;
        this.getLightboxImg(this.activLightbox, this.previouslyFocused, this.lightbox, media);

        // console.log(this.previouslyFocused);

    }

    closeLightbox() {
        // console.log(activLightbox, previouslyFocused, lightbox);
        // if (activLightbox === null) return;
        if (this.previouslyFocused !== null) this.previouslyFocused.focus();

        this.lightbox.setAttribute("aria-hidden", "true");
        this.lightbox.removeAttribute("aria-modal");
        this.closeButton.removeEventListener('click', () => { this.closeLightbox() });

        this.lightbox.style.display = "none";
        document.body.style.overflow = "auto";
        // activLightbox = null;
    }

    getLightboxImg(activLightbox, previouslyFocused, lightbox, media) {
        const lightboxImgContainer = document.querySelector(".lightbox__container");
        const prevButton = document.querySelector(".lightbox__prev");
        const nextButton = document.querySelector(".lightbox__next");
        // const closeButton = document.querySelector(".lightbox__close");
        let indexMedia = 0;

        // this.mediasPhotographer.forEach(mediaPhotographer => {
        //     if (mediaPhotographer.id === idMedia) {
        // if ("video" in mediaPhotographer) {
        // if (type === "video") {
        //     lightboxImgContainer.innerHTML = `<video controls="">
        //         <source src="assets/${this.namePhotographer}/${idMedia}" type="video/mp4">
        //         </video>`;
        // } else {
        //     lightboxImgContainer.innerHTML = `<img src="assets/${this.namePhotographer}/${idMedia}" alt="${titleMedia}">`;
        // }

        lightboxImgContainer.innerHTML = media.getMediaLightboxCardDom();

        const titleMediaP = document.createElement('p');
        titleMediaP.innerText = media.title;

        lightboxImgContainer.appendChild(titleMediaP);

        // indexMedia = this.mediasPhotographer.findIndex(element => element === mediaPhotographer);
        // console.log(`index n° ${indexMedia} :`, this.mediasPhotographer[indexMedia]);
        //     }
        // })

        // if (this.lightbox.style.display === "flex") {
        // prevButton.addEventListener("click", function() {
        //     console.log("clicked prev");
        //     indexMedia--;
        //     // console.log(`index n° ${indexMedia} :`, mediasPhotographer[indexMedia]);
        //     if (indexMedia < 0) {
        //         indexMedia = this.mediasPhotographer.length - 1;
        //     }
        //     console.log(`index n° ${indexMedia} :`, this.mediasPhotographer[indexMedia]);

        //     this.getLightboxImg(this.mediasPhotographer[indexMedia].id);
        // })

        // nextButton.addEventListener("click", function() {
        //     console.log("clicked next");
        //     indexMedia++;
        //     if (indexMedia >= this.mediasPhotographer.length) {
        //         indexMedia = 0;
        //     }
        //     console.log(`index n° ${indexMedia} :`, this.mediasPhotographer[indexMedia]);

        //     this.getLightboxImg(this.mediasPhotographer[indexMedia].id);
        // })

        // closeButton.addEventListener("click", function() {
        //     indexMedia = 0;
        // });
        // closeButton.addEventListener("click", this.closeLightbox(activLightbox, previouslyFocused, lightbox));
        // console.log(activLightbox, previouslyFocused, lightbox);
        // }
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