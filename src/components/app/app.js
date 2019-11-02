import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService : new SwapiService(),
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService 
                        ? DummySwapiService
                        : SwapiService;

      return {
        swapiService: new Service(), 
      }
    });
  }

  toggleRandomPlanet = () => {
    this.setState(({ showRandomPlanet }) => {
      return {
        showRandomPlanet: !showRandomPlanet,
      }
    });
  }

  render () {
    const { showRandomPlanet } = this.state;
    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;
  
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className='app'>
            <Header onServiceChange={this.onServiceChange}/>
            { randomPlanet }
            <button
              className='toggle-planet btn btn-warning btn-lg'
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};
