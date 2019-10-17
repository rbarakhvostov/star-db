import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../person-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import './people-page.css';

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
    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
          {( { name, birthYear } ) => (
            `${name} (${birthYear})`
          )}
      </ItemList>
    );

    const personDetails = (
      <ItemDetails
        itemId={selectedPerson}
        getData={this.swapiService.getPerson} />
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    )
  }
}
