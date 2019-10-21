import SwapiService from '../../services/swapi-service';
import ItemDetails from '../item-details';
import { withDetails } from '../hoc-helper';

const swapiService = new SwapiService();
const {
  getPerson,
  getPlanet,
  getStarship,
  getPersonImage,
  getPlanetImage,
  getStarshipImage,
} = swapiService;

const PersonDetails = withDetails(ItemDetails, getPerson, getPersonImage);
const PlanetDetails = withDetails(ItemDetails, getPlanet, getPlanetImage);
const StarshipDetails = withDetails(ItemDetails, getStarship, getStarshipImage);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}