import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';
import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  // make a string
  // print to dom (movies, domstring)
  let domString = '';
  locations.forEach((location) => {
    domString += `<h3>${location.name}</h3>`;
    util.printToDom('locations', domString);
  });
};

const initializeLocations = () => {
  // makes axios call
  locationsData.getLocationsData()
    .then((resp) => {
      const LocationsResults = resp.data.locations;
      locations = LocationsResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
