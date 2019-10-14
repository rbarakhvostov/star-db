import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';

export default class PeoplePage extends Component {
  state = {
    error: false,
    selectedPerson: null,
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson,
    });
  }

  componentDidCatch(error, info) {
    debugger;
    //console.log("ERROR", error);
    //console.log("INFO", info);
    this.setState({error: true});
  }
  render() {
    const { error, selectedPerson } = this.state;
    if (error) {
      return <ErrorIndicator />
    }
    return (
      <div className='row mb2'> 
        <div className='col-md-6'>
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className='col-md-6'>
          <PersonDetails personId={selectedPerson} />
        </div>
      </div>
    )
  }

}