import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';


export default class RandomPlanet extends Component {

  static defaultProps = {
    upDateInterval: 5000,
  }
 
  static propTypes = {
    upDateInterval: (props, propName, componentName) => {
      const value = props[propName];
      if (typeof value === 'number' && !isNaN(value)) {
        return null;
      }

      return new TypeError(`${componentName}: ${propName} must be number`);
    },
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
    const id = Math.round(Math.random() * 20) + 2;
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
    const content = data ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { spinner }
        { errorIndicator }
        { content }
      </div>
    );
  }
}

// RandomPlanet.defaultProps = {
//   upDateInterval: 1000,
// }

const PlanetView = ({ planet }) => {

  const { id, name, population,
          rotationPeriod, diameter } = planet;

  return (
    <>
      <img className="planet-image"
              src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
              alt={name} />
      <div>
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{ population }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{ rotationPeriod }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{ diameter }</span>
          </li>
        </ul>
      </div>
    </>
  )
}