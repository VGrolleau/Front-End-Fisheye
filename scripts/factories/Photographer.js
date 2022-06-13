class PhotographerFactory {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
        this.picture = `assets/photographers/${this.portrait}`;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        article.id = this.id;
        article.setAttribute("tabindex", 0);
        article.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                window.location = `photographer.html?id=${this.id}`;
            }
        });

        const divImgH2 = document.createElement('div');
        divImgH2.classList.add('img_h2_div');
        divImgH2.setAttribute("role", "link");
        divImgH2.setAttribute("aria-label", `${this.name} profile`);
        divImgH2.addEventListener("click", () => {
            window.location = `photographer.html?id=${this.id}`;
        });

        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        const h2 = document.createElement('h2');
        h2.textContent = this.name;

        divImgH2.appendChild(img);
        divImgH2.appendChild(h2);

        const pLocation = document.createElement('p');
        pLocation.textContent = `${this.city}, ${this.country}`;
        pLocation.classList.add('location_p');

        const pTagline = document.createElement('p');
        pTagline.textContent = this.tagline;
        pTagline.classList.add('tagline_p');

        const pPrice = document.createElement('p');
        pPrice.textContent = `${this.price}€/jour`;
        pPrice.classList.add('price_p');

        article.appendChild(divImgH2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    getUserInfo(photographerInfo) {
        const h1 = document.createElement('h1');
        h1.textContent = this.name;

        const pLocation = document.createElement('p');
        pLocation.textContent = `${this.city}, ${this.country}`;
        pLocation.classList.add('location_p');

        const pTagline = document.createElement('p');
        pTagline.textContent = this.tagline;
        pTagline.classList.add('tagline_p');

        photographerInfo.appendChild(h1);
        photographerInfo.appendChild(pLocation);
        photographerInfo.appendChild(pTagline);
    }

    getUserImg() {
        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        return img;
    }
}