import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import PeoplePage from '../people-page';
import ErrorBoundary from '../error-boundary';
import './app.css';
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
} from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    error: false,
  }

  toggleRandomPlanet = () => {
    this.setState(({ showRandomPlanet }) => {
      return {
        showRandomPlanet: !showRandomPlanet,
      }
    });
  }

  render () {
    console.log('APP THIS', this);
    const { showRandomPlanet } = this.state;
    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;
  
    return (
      <ErrorBoundary>
        <div className='app'>
          <Header />
          { randomPlanet }
          <button
            className='toggle-planet btn btn-warning btn-lg'
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <PeoplePage />
          {/* <PersonList>
              {( { name} ) => (
                `${name} `
              )}
          </PersonList>
          <PlanetList>
              {( { name} ) => (
                `${name} `
              )}
          </PlanetList>
          <PersonDetails itemId={7}/>
          <PlanetDetails itemId={2}/> */}

        </div>
      </ErrorBoundary>
    );
  }
};
