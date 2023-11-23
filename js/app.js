const API_KEY = "b935ea7a-9959-48d2-a25b-0a7d9fc1f4e4";
const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";


getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const respData = await resp.json();
    showMovies(respData)
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    data.films.forEach(movie => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie_cover-inner">
                    <img
                    src="${movie.posterUrlPreview}" 
                    class="movie__cover"
                    alt="${movie.nameEn}"
                    />
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
                    <div class="movie__average movie__average--green">10</div>
                </div>
        `;
        moviesEl.appendChild(movieEl);
    });
}