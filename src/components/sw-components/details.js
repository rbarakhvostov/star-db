import React from 'react';
import ItemDetails from '../item-details';
import Record from '../record';
import { withDetails, withSwapiService } from '../hoc-helper';

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

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage,
  }
}

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage,
  }
}

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  }
}

const PersonDetails = withSwapiService(
                            withDetails(
                              withChildRecords(ItemDetails, personRecords)),
                            mapPersonMethodsToProps);

const PlanetDetails = withSwapiService(
                            withDetails(
                              withChildRecords(ItemDetails, planetRecords)),
                            mapPlanetMethodsToProps);

const StarshipDetails = withSwapiService(
                            withDetails(
                              withChildRecords(ItemDetails, starshipRecords)),
                            mapStarshipMethodsToProps);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}




