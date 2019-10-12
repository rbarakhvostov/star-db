import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

export default class App extends Component {
  state = {
    personDetails: { id: '1',
      name :'Luke Skywalker',
      gender :'male',
      birthYear :'19BBY',
      eyeColor : 'blue'
    },
  }
  handleItemSelected = (personDetails) => {
    this.setState({
      personDetails,
    })
  }
  render () {
    console.log('APP THIS', this);
    const { personDetails } = this.state;
    return (
      <div>
        <Header />
        <RandomPlanet />
  
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.handleItemSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personDetails={personDetails} />
          </div>
        </div>
      </div>
    );
  }
};
