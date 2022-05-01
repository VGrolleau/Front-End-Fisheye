function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.id = id;

        const divImgH2 = document.createElement('div');
        divImgH2.classList.add('img_h2_div');
        divImgH2.setAttribute("role", "link");
        divImgH2.setAttribute("aria-label", `${name} profile`);
        divImgH2.addEventListener("click", () => {
            window.location = `photographer.html?id=${id}`;
        });

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        const h2 = document.createElement('h2');
        h2.textContent = name;

        divImgH2.appendChild(img);
        divImgH2.appendChild(h2);

        const pLocation = document.createElement('p');
        pLocation.textContent = `${city}, ${country}`;
        pLocation.classList.add('location_p');

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('tagline_p');

        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList.add('price_p');

        article.appendChild(divImgH2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }

    return { name, picture, getUserCardDOM }
}