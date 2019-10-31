import React, { Component } from 'react';
import { PlanetList, PlanetDetails } from '../sw-components';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boundary';

export default class PlanetsPage extends Component {

  swapiService = new SwapiService();
  
  state = {
    selectedPerson: null,
  }

  onItemSelected = (selectedPerson) => {
    this.setState({
      selectedPerson,
    });
  }

  render() {
    const { selectedPerson } = this.state;
    
    const planetList = (
      <PlanetList onItemSelected={this.onItemSelected} />
    );
    
    const planetDetails = (
      <PlanetDetails itemId={selectedPerson} />
    );

    return (
      <ErrorBoundary>
        <Row left={planetList} right={planetDetails} />
      </ErrorBoundary>
    )
  }
}
