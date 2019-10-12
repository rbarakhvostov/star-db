import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();
  state = {
    planet: {},
    loading: true,
    error: false,
  }
  componentDidMount() {
    console.log('did mount');
    this.upDatePlanet();
    this.interval = setInterval(this.upDatePlanet, 100000);
  }
  componentWillUnmount() {
    console.log('will mount')
  }
  componentDidUpdate() {
    console.log(121213214325436547658);
  }
  onPlanetLoaded = (planet) =>  {
    console.log('planet loaded')
    this.setState({ 
      planet,
      loading: false,
     });
  }
  onError = (err) => {
    console.log(err);
    this.setState({
      error: true,
      loading: false,
    });
  }
  upDatePlanet = () => {
    console.log('update');
    console.log('111111');
    const id = Math.round(Math.random() * 20) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }
  render() {
    console.log('render');
    console.log('PLANEEEEEEEEEET');
    console.log('THIS STATE', this.state)
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

const PlanetView = ({ planet }) => {
  console.log('PLANET VIEW')
  const { id, name, population,
          rotationPeriod, diameter } = planet;

  return (
    <>
      <img className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
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