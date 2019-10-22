import React from 'react';
import SwapiService from '../../services/swapi-service';
import ItemDetails from '../item-details';
import Record from '../record';
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

const withChildRecords = (Wrapped, records) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        { records }
      </Wrapped>
    )
  }
}

const personRecords = [
  <Record field='gender' label='Gender' key='gender'/>,
  <Record field='eyeColor' label='Eye Color' key='eyeColor' />,
  <Record field='birthYear' label='Birth Year' key='birthYear' />
];

const planetRecords = [
  <Record field='population' label='Population' key='population' />,
  <Record field='diameter' label='Diameter' key='diameter' />
];

const starshipRecords = [
  <Record field='cargoCapacity' label='Cargo' key='cargoCapacity' />,
  <Record field='model' label='Model' key='model' />
];

const PersonDetails = withDetails(
                          withChildRecords(ItemDetails, personRecords),
                          getPerson,
                          getPersonImage);

const PlanetDetails = withDetails(
                          withChildRecords(ItemDetails, planetRecords),
                          getPlanet,
                          getPlanetImage);

const StarshipDetails = withDetails(
                          withChildRecords(ItemDetails, starshipRecords),
                          getStarship,
                          getStarshipImage);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}