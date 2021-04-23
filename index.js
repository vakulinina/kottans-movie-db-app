import styles from './style.css';

const popularMovies = {
  results: [
    {
      adult: false,
      backdrop_path: '/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg',
      genre_ids: [28, 878],
      id: 399566,
      original_language: 'en',
      original_title: 'Godzilla vs. Kong',
      overview:
        'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
      popularity: 4176.634,
      poster_path: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
      release_date: '2021-03-24',
      title: 'Godzilla vs. Kong',
      video: false,
      vote_average: 8.3,
      vote_count: 4799,
    },
    {
      adult: false,
      backdrop_path: '/z7HLq35df6ZpRxdMAE0qE3Ge4SJ.jpg',
      genre_ids: [28, 12, 35, 14],
      id: 615678,
      original_language: 'en',
      original_title: 'Thunder Force',
      overview:
        'In a world where supervillains are commonplace, two estranged childhood best friends reunite after one devises a treatment that gives them powers to protect their city.',
      popularity: 2351.078,
      poster_path: '/279yOM4OQREL36B3SECnRxoB4MZ.jpg',
      release_date: '2021-04-09',
      title: 'Thunder Force',
      video: false,
      vote_average: 5.8,
      vote_count: 392,
    },
    {
      adult: false,
      backdrop_path: '/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
      genre_ids: [14, 28, 12],
      id: 460465,
      original_language: 'en',
      original_title: 'Mortal Kombat',
      overview:
        "Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.",
      popularity: 2500.577,
      poster_path: '/8yhtzsbBExY8mUct2GOk4LDDuGH.jpg',
      release_date: '2021-04-07',
      title: 'Mortal Kombat',
      video: false,
      vote_average: 7.3,
      vote_count: 92,
    },
    {
      adult: false,
      backdrop_path: '/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg',
      genre_ids: [28, 12, 14, 878],
      id: 791373,
      original_language: 'en',
      original_title: "Zack Snyder's Justice League",
      overview:
        "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
      popularity: 2194.631,
      poster_path: '/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
      release_date: '2021-03-18',
      title: "Zack Snyder's Justice League",
      video: false,
      vote_average: 8.5,
      vote_count: 5075,
    },
    {
      adult: false,
      backdrop_path: '/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg',
      genre_ids: [28, 53, 80],
      id: 634528,
      original_language: 'en',
      original_title: 'The Marksman',
      overview:
        'Jim Hanson’s quiet life is suddenly disturbed by two people crossing the US/Mexico border – a woman and her young son – desperate to flee a Mexican cartel. After a shootout leaves the mother dead, Jim becomes the boy’s reluctant defender. He embraces his role as Miguel’s protector and will stop at nothing to get him to safety, as they go on the run from the relentless assassins.',
      popularity: 2136.527,
      poster_path: '/6vcDalR50RWa309vBH1NLmG2rjQ.jpg',
      release_date: '2021-01-15',
      title: 'The Marksman',
      video: false,
      vote_average: 7.1,
      vote_count: 143,
    },
    {
      adult: false,
      backdrop_path: '/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg',
      genre_ids: [878, 28, 12, 53],
      id: 412656,
      original_language: 'en',
      original_title: 'Chaos Walking',
      overview:
        'Two unlikely companions embark on a perilous adventure through the badlands of an unexplored planet as they try to escape a dangerous and disorienting reality, where all inner thoughts are seen and heard by everyone.',
      popularity: 1481.054,
      poster_path: '/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg',
      release_date: '2021-02-24',
      title: 'Chaos Walking',
      video: false,
      vote_average: 7.4,
      vote_count: 431,
    },
    {
      adult: false,
      backdrop_path: '/6zbKgwgaaCyyBXE4Sun4oWQfQmi.jpg',
      genre_ids: [28, 53, 80],
      id: 615457,
      original_language: 'en',
      original_title: 'Nobody',
      overview:
        'Hutch Mansell, a suburban dad, overlooked husband, nothing neighbor — a "nobody." When two thieves break into his home one night, Hutch\'s unknown long-simmering rage is ignited and propels him on a brutal path that will uncover dark secrets he fought to leave behind.',
      popularity: 1379.491,
      poster_path: '/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg',
      release_date: '2021-03-18',
      title: 'Nobody',
      video: false,
      vote_average: 8.6,
      vote_count: 647,
    },
    {
      adult: false,
      backdrop_path: '/7prYzufdIOy1KCTZKVWpjBFqqNr.jpg',
      genre_ids: [16, 12, 14, 10751, 28],
      id: 527774,
      original_language: 'en',
      original_title: 'Raya and the Last Dragon',
      overview:
        'Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity. Now, 500 years later, that same evil has returned and it’s up to a lone warrior, Raya, to track down the legendary last dragon to restore the fractured land and its divided people.',
      popularity: 1358.901,
      poster_path: '/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg',
      release_date: '2021-03-03',
      title: 'Raya and the Last Dragon',
      video: false,
      vote_average: 8.3,
      vote_count: 2379,
    },
    {
      adult: false,
      backdrop_path: '/zDq2pwPyt4xwSFHKUoNN2LohDWj.jpg',
      genre_ids: [27],
      id: 632357,
      original_language: 'en',
      original_title: 'The Unholy',
      overview:
        'Alice, a young hearing-impaired girl who, after a supposed visitation from the Virgin Mary, is inexplicably able to hear, speak and heal the sick. As word spreads and people from near and far flock to witness her miracles, a disgraced journalist hoping to revive his career visits the small New England town to investigate. When terrifying events begin to happen all around, he starts to question if these phenomena are the works of the Virgin Mary or something much more sinister.',
      popularity: 1156.877,
      poster_path: '/b4gYVcl8pParX8AjkN90iQrWrWO.jpg',
      release_date: '2021-03-31',
      title: 'The Unholy',
      video: false,
      vote_average: 5.5,
      vote_count: 41,
    },
    {
      adult: false,
      backdrop_path: '/9xeEGUZjgiKlI69jwIOi0hjKUIk.jpg',
      genre_ids: [16, 28, 14],
      id: 664767,
      original_language: 'en',
      original_title: "Mortal Kombat Legends: Scorpion's Revenge",
      overview:
        'After the vicious slaughter of his family by stone-cold mercenary Sub-Zero, Hanzo Hasashi is exiled to the torturous Netherrealm. There, in exchange for his servitude to the sinister Quan Chi, he’s given a chance to avenge his family – and is resurrected as Scorpion, a lost soul bent on revenge. Back on Earthrealm, Lord Raiden gathers a team of elite warriors – Shaolin monk Liu Kang, Special Forces officer Sonya Blade and action star Johnny Cage – an unlikely band of heroes with one chance to save humanity. To do this, they must defeat Shang Tsung’s horde of Outworld gladiators and reign over the Mortal Kombat tournament.',
      popularity: 1161.296,
      poster_path: '/4VlXER3FImHeFuUjBShFamhIp9M.jpg',
      release_date: '2020-04-12',
      title: "Mortal Kombat Legends: Scorpion's Revenge",
      video: false,
      vote_average: 8.4,
      vote_count: 858,
    },
  ],
};

window.currentState = {
  searchValue: null,
  selectedMovie: null,
};

window.renderApp = renderApp;

function App() {
  return `
    <div>
    ${PopularMovie()}
    ${SearchByMovie()}
    ${MoviesGrid()}
    </div>
  `;
}

function renderApp() {
  document.querySelector('#app-root').innerHTML = `${App()}`;
}

renderApp();

function PopularMovie() {
  const movie = popularMovies.results[0];
  return `
    <article class="${styles['popular-movie']}">
      <img class="${styles['popular-movie-img']}" src="http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}">
      <div class="${styles['popular-movie-description']}">
        <h2>${movie.original_title}</h2>
        <p>${movie.overview}</p>
      </div>
    </article>
  `;
}

function SearchByMovie() {
  return `
    <input
      class="${styles['search-input']}"
      type="search"
      value="${window.currentState.searchValue || ''}"
      oninput="window.currentState.searchValue = this.value; if (!this.value) renderApp()"
      onchange="renderApp()">
  `;
}

function MoviesGrid() {
  const { searchValue } = window.currentState;
  let title;
  let movies;
  if (searchValue) {
    const filteredMovies = popularMovies.results.filter(movie => {
      return movie.original_title.toLowerCase().includes(searchValue.toLowerCase());
    });
    movies = getMoviesCards(filteredMovies);
    title = 'Search Result';
  } else {
    movies = getMoviesCards(popularMovies.results);
    title = 'Popular Movies';
  }
  return `
    <div class="${styles['movies-list-wrap']}">
      <h3>${title}</h3>
      <div class="${styles['movies-list']}">${movies}</div>
    </div>
  `;
}

function getMoviesCards(moviesArray) {
  let moviesItems = '';
  moviesArray.forEach(({ original_title, poster_path }) => {
    const moviesItem = `
      <a
        class="${styles['movies-item']}"
        href="#"
        title="${original_title}">
          <img
            src="http://image.tmdb.org/t/p/w500/${poster_path}"
            alt="${original_title}"
          >
      </a>
    `;
    moviesItems += moviesItem;
  });
  return moviesItems;
}
