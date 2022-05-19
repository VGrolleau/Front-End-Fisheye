class Video {
    constructor(data, namePhotographer) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
        this.likes = data.likes;
        this.price = data.price;
        this.namePhotographer = namePhotographer;
        this.liked = false;
    }

    getMediaCardDOM() {
        const cardMedia = document.createElement('article');
        cardMedia.classList.add('card-media');
        cardMedia.id = `card-${this.id}`;
        cardMedia.innerHTML += `<i class="fa-solid fa-circle-play fa-4x play-img"></i>`;

        const video = document.createElement('video');
        video.addEventListener("click", () => { displayLightbox(this.video, this.title, "video") });

        const sourceVideo = document.createElement('source');
        sourceVideo.setAttribute("src", 'assets/' + this.namePhotographer + '/' + this.video);
        sourceVideo.setAttribute("type", "video/mp4");

        video.appendChild(sourceVideo);

        const titleLikesDiv = document.createElement('div');
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

        cardMedia.appendChild(video);
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
}