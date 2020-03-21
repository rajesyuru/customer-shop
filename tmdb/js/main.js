const url = 'https://api.themoviedb.org/3/movie/popular?api_key=b243dc06bac1b60355d79c1938f4da27&language=en-US&page=1&region=US';

const elContent = document.getElementById('content');

function getCard(movie) {

    const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    let div = document.createElement('div');
    div.classList.add('col');
    div.classList.add('mb-4');

    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('h-100');
    card.classList.add('shadow-sm');
    card.classList.add('position-relative');

    let img = document.createElement('img');
    img.src = image;
    img.alt = movie.title;
    img.classList.add('card-img-top');

    card.append(img);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.classList.add('text-center');
    cardBody.innerHTML = `<h5 class="card-title">${movie.title}</h5>`;
    cardBody.innerHTML += `<p>${movie.overview.split(' ').filter((word, index) => index <= 10).join(' ')}...</p>`;

    card.append(cardBody);

    div.append(card);

    return div;
}

fetch(url) 
    .then(response => {
        return response.json();
    })
    .then(data => {
        const movies = data.results;

        movies.forEach(movie => {
            elContent.append(getCard(movie));
        });
    });