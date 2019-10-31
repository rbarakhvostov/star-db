import React, { Component } from 'react';
import { PersonList, PersonDetails } from '../sw-components';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boundary';

export default class PeoplePage extends Component {

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
    
    const personList = (
      <PersonList onItemSelected={this.onItemSelected} />
    );
    
    const personDetails = (
      <PersonDetails itemId={selectedPerson} />
    );

    return (
      <ErrorBoundary>
        <Row left={personList} right={personDetails} />
      </ErrorBoundary>
    )
  }
}
