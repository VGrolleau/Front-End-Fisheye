class Photo {
    constructor(data, namePhotographer) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.likes = data.likes;
        this.price = data.price;
        this.date = data.date;
        this.namePhotographer = namePhotographer;
        this.liked = false;
    }

    getMediaCardDOM() {
        const cardMedia = document.createElement('article');
        cardMedia.classList.add('card-media');
        cardMedia.id = `card-${this.id}`;

        const aImg = document.createElement('a');
        aImg.setAttribute("href", "");
        aImg.classList.add("a-img");
        aImg.addEventListener("click", () => { displayLightbox(this) });

        const img = document.createElement('img');
        img.setAttribute("src", 'assets/' + this.namePhotographer + '/' + this.image);
        img.setAttribute("alt", this.title);

        aImg.appendChild(img);

        const titleLikesDiv = document.createElement('aside');
        titleLikesDiv.classList.add('title-likes-div');
        titleLikesDiv.setAttribute("aria-label", "Likes and title bloc");

        const pTitle = document.createElement('p');
        pTitle.textContent = this.title;

        const likesCount = document.createElement('p');
        likesCount.classList.add("like-count");
        likesCount.innerHTML += `<span>${this.likes}</span> <i class="fa-solid fa-heart"></i>`;
        likesCount.setAttribute("aria-label", "Likes");
        likesCount.addEventListener("click", () => { this.updateLikes() });

        titleLikesDiv.appendChild(pTitle);
        titleLikesDiv.appendChild(likesCount);

        cardMedia.appendChild(aImg);
        cardMedia.appendChild(titleLikesDiv);

        return cardMedia;
    }

    updateLikes() {
        const spanCurrentMedia = document.querySelector(`#card-${this.id} .like-count span`);
        const likeSpan = document.querySelector(".like-span");

        if (!this.liked) {
            this.likes += 1;
            spanCurrentMedia.innerText = this.likes;
            likeSpan.textContent = Number(likeSpan.textContent) + 1;
            this.liked = true;
        } else {
            this.likes -= 1;
            spanCurrentMedia.innerText = this.likes;
            likeSpan.textContent = Number(likeSpan.textContent) - 1;
            this.liked = false;
        }
    }

    getMediaLightboxCardDom() {
        return `<img src="assets/${this.namePhotographer}/${this.image}" alt="${this.title}">`;
    }
}