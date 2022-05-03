class Photo {
    constructor(data, namePhotographer) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.likes = data.likes;
        this.price = data.price;
        this.namePhotographer = namePhotographer;
    }

    getMediaCardDOM() {
        console.log("Image media");
        const cardMedia = document.createElement('article');
        cardMedia.classList.add('card-media');
        cardMedia.id = this.id;

        const img = document.createElement('img');
        img.setAttribute("src", 'assets/' + this.namePhotographer + '/' + this.image);
        img.setAttribute("alt", this.title);

        const titleLikesDiv = document.createElement('div');
        titleLikesDiv.setAttribute("aria-label", "Likes and title bloc");

        const pTitle = document.createElement('p');
        pTitle.textContent = this.title;

        const likesCount = document.createElement('p');
        likesCount.innerHTML += this.likes + " <i class=\"fa-solid fa-heart\"></i>";
        likesCount.setAttribute("aria-label", "Likes");

        titleLikesDiv.appendChild(pTitle);
        titleLikesDiv.appendChild(likesCount);

        cardMedia.appendChild(img);
        cardMedia.appendChild(titleLikesDiv);

        return cardMedia;
    }
}