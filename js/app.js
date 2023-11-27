const API_KEY = "b935ea7a-9959-48d2-a25b-0a7d9fc1f4e4";
const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";



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

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green';
    } else if (vote > 5) {
        return 'orange';
    } else {
        return 'red'
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = '';

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
        ${
            movie.rating &&
            `
            <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
            `
        }
                </div>
        `;
        movieEl.addEventListener('click', () => openModal(movie.filmId));
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = '';
    }

});

//modal

const modalEl = document.querySelector('.modal');


async function openModal(id) {
    modalEl.classList.add('modal--show');


    modalEl.innerHTML = `
<div class='modal__card'>
  <img class='modal__movie-backdrop' src='' alt=''>
  <h2>
   <span class='modal__movie-title'>Title</span>
   <span class='modal__movie-release-year'>Year</span>
  </h2>
  <ul class='modal__movie-info'>
    <div class='loader'></div>
    <li class='modal__movie-genre'>Genre</li>
    <li class='modal__movie-runtime'>Time</li>
    <li >Site: <a class='modal__movie-site'></a></li>
    <li class='modal__movie-overview'>Description</li>
  </ul>
  <button type='button' class='modal__button-close'>Close</button>
</div>     

`
    const btnClose = document.querySelector('.modal__button-close');
    btnClose.addEventListener('click', () => closeModal())
}

function closeModal() {
    modalEl.classList.remove('modal--show');
}

window.addEventListener('click', (e) => {
    if (e.target === modalEl) {
        closeModal()
    }
})

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        modalEl.classList.remove('modal--show')
    }
})