class Video {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
        this.likes = data.likes;
        this.price = data.price;
    }

    // getMediaCardDOM() {
    //     const cardMedia = document.createElement('article');
    //     cardMedia.classList.add('card-media');
    //     article.id = this.id;

    //     // divImgH2.addEventListener("click", () => {
    //     //     window.location = `photographer.html?id=${this.id}`;
    //     // });

    //     // const img = document.createElement('img');
    //     // img.setAttribute("src", this.picture);
    //     // img.setAttribute("alt", this.title);

    //     const pTitle = document.createElement('p');
    //     pTitle.textContent = this.title;

    //     const likeDiv = document.createElement('div');
    //     likeDiv.setAttribute("aria-label", "likes");

    //     cardMedia.appendChild(img);
    //     cardMedia.appendChild(pTitle);

    //     return cardMedia;
    // }
}