import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
//import ItemList from '../item-list';
//import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import './app.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: null,
    error: false,
  }
  toggleRandomPlanet = () => {
    this.setState(({showRandomPlanet}) => {
      return {
        showRandomPlanet: !showRandomPlanet,
      }
    });
  }

  componentDidCatch() {
    this.setState({error: true});
  }
  render () {
    if (this.state.error) {
      return <ErrorIndicator />;
    }
    console.log('APP THIS', this);
    const { showRandomPlanet } = this.state;
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
        <PeoplePage />
      </div>
    );
  }
};
