import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    error: false,
    selectedPerson: null,
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson,
    });
  }

  componentDidCatch(err, info) {
    debugger;
    this.setState({error: true});
  }

  render() {
    const { error, selectedPerson } = this.state;
    if (error) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, birthYear }) => `${name} (${birthYear})`} />
    );

    const personDetails = (
      <PersonDetails personId={selectedPerson} />
    );

    return (
      <Row left={itemList} right={personDetails} />
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