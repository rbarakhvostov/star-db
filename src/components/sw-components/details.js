import React from 'react';
import ItemDetails from '../item-details';
import Record from '../record';
import { withDetails, withSwapiService, compose } from '../hoc-helpers';

const withChildRecords = (records) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        { records }
      </Wrapped>
    );
  }
}

const personRecords = [
  <Record field='gender' label='Gender:' key='gender'/>,
  <Record field='eyeColor' label='Eye Color:' key='eyeColor' />,
  <Record field='birthYear' label='Birth Year:' key='birthYear' />,
];

const planetRecords = [
  <Record field='population' label='Population:' key='population' />,
  <Record field='diameter' label='Diameter:' key='diameter' />,
  <Record field='rotationPeriod' label='Rotation period:' key='rotationPeriod' />,
];

const starshipRecords = [
  <Record field='model' label='Model:' key='model' />,
  <Record field='length' label='Length:' key='length' />,
  <Record field='cargoCapacity' label='Cargo:' key='cargoCapacity' />,
  <Record field='passengers' label='Passengers:' key='passengers' />,
  <Record field='manufacturer' label='Manufacturer:' key='manufacturer' />,
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

const PersonDetails = compose(
                        withSwapiService(mapPersonMethodsToProps),
                        withDetails,
                        withChildRecords(personRecords),
                        )(ItemDetails);

const PlanetDetails = compose(
                        withSwapiService(mapPlanetMethodsToProps),
                        withDetails,
                        withChildRecords(planetRecords),
                        )(ItemDetails);

const StarshipDetails = compose(
                          withSwapiService(mapStarshipMethodsToProps),
                          withDetails,
                          withChildRecords(starshipRecords),
                          )(ItemDetails);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}
