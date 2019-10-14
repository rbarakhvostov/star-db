import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: null,
  }
  toggleRandomPlanet = () => {
    this.setState(({showRandomPlanet}) => {
      return {
        showRandomPlanet: !showRandomPlanet,
      }
    });
  }
  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  }
  render () {
    console.log('APP THIS', this);
    const { selectedPerson, showRandomPlanet } = this.state;
    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null; 
    return (
      <div>
        <Header />
        { randomPlanet }
        <button
          className='toggle-planet btn btn-warning btn-lg'
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <div className='row mb2'>
          <div className='col-md-6'>
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>
          <div className='col-md-6'>
            <PersonDetails personId={selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
};
