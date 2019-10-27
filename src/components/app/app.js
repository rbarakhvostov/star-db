import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import PeoplePage from '../people-page';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

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
        <SwapiServiceProvider value={this.swapiService}>
          <div className='app'>
            <Header />
            { randomPlanet }
            <button
              className='toggle-planet btn btn-warning btn-lg'
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <PeoplePage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};
