class Video {
    constructor(data, namePhotographer) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
        this.likes = data.likes;
        this.price = data.price;
        this.namePhotographer = namePhotographer;
    }

    getMediaCardDOM() {
        const cardMedia = document.createElement('article');
        cardMedia.classList.add('card-media');
        cardMedia.id = this.id;
        cardMedia.innerHTML += `<i class="fa-solid fa-circle-play fa-4x play-img"></i>`;

        const video = document.createElement('video');
        video.setAttribute("onclick", `displayLightbox(${this.id})`);

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
        likesCount.setAttribute("onclick", "updateLikes()");

        titleLikesDiv.appendChild(pTitle);
        titleLikesDiv.appendChild(likesCount);

        cardMedia.appendChild(video);
        cardMedia.appendChild(titleLikesDiv);

        return cardMedia;
    }
}