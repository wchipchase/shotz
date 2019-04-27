import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';
import locationsData from '../../helpers/data/locationsData';

import './movies.scss';

let movies = [];

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilder = (moviesArray) => {
  let domString = '';
  moviesArray.forEach((movie) => {
    domString += '<div class="card movie col-3">';
    domString += `<a href=#><div class="card-header">${movie.name}</div></a>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${movie.genre}</h5>`;
    domString += `<h5 class="card-title">${movie.releaseDate}</h5>`;
    domString += `<h5 class="card-title">${movie.description}</h5>`;
    domString += `<p class="card-text">${movie.locations.length} Locations</p>`;
    domString += `<button id = "${movie.id}" class = "btn btn-primary ${movie.id}" >Click Here </button>`;
    domString += '<input type="button" value="Refresh Page" class = "btn btn-danger" onClick="location.href=location.href"></button>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const locationsDomStringBuilder = (locArray) => {
  let domString = '';
  locArray.forEach((location) => {
    domString += `<div id=${location.id} class="card location col-2">`;
    domString += `<div class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</div>`;
    domString += '<div class="card-body">';
    domString += `<img class="card-img-top" src="${location.imageUrl}" alt="${location.name}">`;
    domString += `<h5 class="card-title">${location.address}</h5>`;
    domString += `<button type="button" class="btn btn-primary" id="${location.name}">${location.name}</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const filterFunc = (movieLocations) => {
  const tempArray = [];
  movieLocations.forEach((movieLocation) => {
    locations.filter((x) => {
      const hasLocation = x.id.includes(movieLocation);
      if (x.id === movieLocation) {
        tempArray.push(x);
      }
      return hasLocation;
    });
  });
  locationsDomStringBuilder(tempArray);
};

const filterMovieEvents = (e) => {
  const buttonId = e.target.id;
  const movie1Locations = movies[0].locations;
  const movie2Locations = movies[1].locations;
  const movie3Locations = movies[2].locations;
  const movie4Locations = movies[3].locations;
  const movieOne = movies.filter(x => x.id === 'movie1');
  const movieTwo = movies.filter(x => x.id === 'movie2');
  const movieThree = movies.filter(x => x.id === 'movie3');
  const movieFour = movies.filter(x => x.id === 'movie4');
  switch (buttonId) {
    case 'movie1':
      domStringBuilder(movieOne);
      filterFunc(movie1Locations);
      document.getElementById('filters').style.display = 'none';
      break;
    case 'movie2':
      domStringBuilder(movieTwo);
      filterFunc(movie2Locations);
      document.getElementById('filters').style.display = 'none';
      break;
    case 'movie3':
      domStringBuilder(movieThree);
      filterFunc(movie3Locations);
      document.getElementById('filters').style.display = 'none';
      break;
    case 'movie4':
      domStringBuilder(movieFour);
      filterFunc(movie4Locations);
      document.getElementById('filters').style.display = 'none';
      break;
    default:
      domStringBuilder(movieOne);
  }
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder(movies);
      document.getElementById('movie1').addEventListener('click', filterMovieEvents);
      document.getElementById('movie2').addEventListener('click', filterMovieEvents);
      document.getElementById('movie3').addEventListener('click', filterMovieEvents);
      document.getElementById('movie4').addEventListener('click', filterMovieEvents);
    })
    .catch(err => console.error(err));
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locations = locationResults;
    });
};

export default { initializeMovies };
