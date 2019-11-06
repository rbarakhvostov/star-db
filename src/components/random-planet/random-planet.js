import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import RandomPlanetView from './random-planet-view';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
    upDateInterval: 5000,
  }
 
  static propTypes = {
    upDateInterval: PropTypes.number,
  }
  
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  }

  componentDidMount() {
    const { upDateInterval } = this.props;
    this.upDatePlanet();
    this.interval = setInterval(this.upDatePlanet, upDateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({ 
      planet,
      loading: false,
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  }

  upDatePlanet = () => {
    const id = Math.round(Math.random() * 15) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;
    const data = !(loading || error); 
    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const content = data ? <RandomPlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { spinner }
        { errorIndicator }
        { content }
      </div>
    );
  }
}
