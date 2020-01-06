import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  SecretPage,
  LoginPage } from '../pages';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';
import { StarshipDetails } from '../sw-components';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService : new SwapiService(),
    isLoggedIn: false,
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
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
    const { showRandomPlanet, isLoggedIn } = this.state;
    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className='app'>
              <Header onServiceChange={this.onServiceChange}/>
              { randomPlanet }
              <button
                className='toggle-planet btn btn-warning btn-md'
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
              <Switch>
                <Route path="/"
                       render={() => <h2 className='greeting'>Welcome to StarDB</h2>}
                       exact />
                <Route path='/people/:id?' component={PeoplePage} />
                <Route path='/planets' component={PlanetsPage} exact />
                <Route path='/starships' component={StarshipsPage} exact />
                <Route path='/starships/:id'
                       render={({ match }) => {
                        const { id } = match.params;
                        return <StarshipDetails itemId={id} />
                       }} />
                <Route
                  path='/login'
                  render={() => (
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin} />
                  )}
                  exact />
                <Route
                  path='/secret'
                  render={() => (
                    <SecretPage isLoggedIn={isLoggedIn} />
                  )}
                  exact />
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
