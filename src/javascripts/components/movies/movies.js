import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';
import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  // make a string
  // print to dom (movies, domstring)
  let domString = '';
  movies.forEach((movie) => {
    domString += `<h3>${movie.name}</h3>`;
    util.printToDom('movies', domString);
  });
};

const initializeMovies = () => {
  // makes axios call
  moviesData.getMoviesData()
    .then((resp) => {
      const MoviesResults = resp.data.movies;
      movies = MoviesResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
  domStringBuilder();
};

export default { initializeMovies };
