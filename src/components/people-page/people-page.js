import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import Record from '../record';
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
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage}>

        <Record field='gender' label='Gender' />
        <Record field='eyeColor' label='Eye Color' />
        <Record field='birthYear' label='Birth Year' />

      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    )
  }
}
