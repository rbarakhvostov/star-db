import React, { Component } from 'react';
import { PeopleList } from '../sw-components';
import { PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boundary';
import './people-page.css';
import Record from '../record';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();
  
  state = {
    selectedPerson: null,
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson,
    });
  }

  render() {
    const { selectedPerson } = this.state;
    const peopleList = (
      <PeopleList onItemSelected={this.onPersonSelected}>
          {( { name, birthYear } ) => (
            `${name} (${birthYear})`
          )}
      </PeopleList>
    );
    
    const personDetails = (
      <PersonDetails
        itemId={selectedPerson}>

        <Record field='gender' label='Gender' />
        <Record field='eyeColor' label='Eye Color' />
        <Record field='birthYear' label='Birth Year' />

      </PersonDetails>
    );

    return (
      <ErrorBoundary>
        <Row left={peopleList} right={personDetails} />
      </ErrorBoundary>
    )
  }
}
