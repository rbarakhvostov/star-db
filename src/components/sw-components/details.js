import React from 'react';
import ItemDetails from '../item-details';
import Record from '../record';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();
const {
  getPerson,
  getPlanet,
  getStarship,
  getPersonImage,
  getPlanetImage,
  getStarshipImage,
} = swapiService;

const PersonDetails = ({ itemId } ) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPerson}
      getImageUrl={getPersonImage}>

      <Record field='gender' label='Gender' />
      <Record field='eyeColor' label='Eye Color' />
      <Record field='birthYear' label='Birth Year' />

    </ItemDetails>
  )
}

const PlanetDetails = ({ itemId }) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPlanet}
      getImageUrl={getPlanetImage}>

      <Record field='population' label='Population' />
      <Record field='diameter' label='Diameter' />
      <Record field='rotationPeriod' label='Rotation Period' />

    </ItemDetails>
  )
}

const StarshipDetails = ({ itemId }) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getStarship}
      getImageUrl={getStarshipImage}>

      <Record field='model' label='Model' />
      <Record field='costInCredits' label='Cost in Credits' />
      <Record field='cargoCapacity' label='Cargo Capacity' />

    </ItemDetails>
  )
}

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}