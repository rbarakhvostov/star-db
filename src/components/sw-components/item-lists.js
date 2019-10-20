import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';
import withData from '../hoc-helper';

const swapiService = new SwapiService();

const {
  getAllPeople,
  getAllPlanets,
  getAllStarships,
} = swapiService;

const PeopleList = withData(ItemList, getAllPeople);
const PlanetsList = withData(ItemList, getAllPlanets);
const StarshipsList = withData(ItemList, getAllStarships);

export {
  PeopleList,
  PlanetsList,
  StarshipsList,
}