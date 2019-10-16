import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';
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
      <PersonDetails personId={selectedPerson} />
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    )
  }
}

const Row = ({ left, right }) => {
  return (
    <div className='row mb2'> 
      <div className='col-md-6'>
        { left }
      </div>
      <div className='col-md-6'>
        { right }
      </div>
    </div>
  );
}
