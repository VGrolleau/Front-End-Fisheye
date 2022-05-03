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
        console.log("Video media");
        const cardMedia = document.createElement('article');
        cardMedia.classList.add('card-media');
        cardMedia.id = this.id;

        const video = document.createElement('video');
        video.setAttribute("controls", "");

        const sourceVideo = document.createElement('source');
        sourceVideo.setAttribute("src", 'assets/' + this.namePhotographer + '/' + this.video);
        sourceVideo.setAttribute("type", "video/mp4");

        video.appendChild(sourceVideo);

        const titleLikesDiv = document.createElement('div');
        titleLikesDiv.setAttribute("aria-label", "Likes and title bloc");

        const pTitle = document.createElement('p');
        pTitle.textContent = this.title;

        const likesCount = document.createElement('p');
        likesCount.innerHTML += this.likes + " <i class=\"fa-solid fa-heart\"></i>";
        likesCount.setAttribute("aria-label", "Likes");

        titleLikesDiv.appendChild(pTitle);
        titleLikesDiv.appendChild(likesCount);

        cardMedia.appendChild(video);
        cardMedia.appendChild(titleLikesDiv);

        return cardMedia;
    }
}