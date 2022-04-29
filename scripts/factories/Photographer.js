function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.id = id;

        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pLocation = document.createElement('p');
        pLocation.textContent = `${city}, ${country}`;
        pLocation.classList.add('location_p');

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('tagline_p');

        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList.add('price_p');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}