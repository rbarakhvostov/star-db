import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();
  state = {
    person: {},
    loading: false,
  }
  componentDidMount() {
    this.upDatePerson();
  }
  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({loading: true});
      this.upDatePerson();
    }
  }
  upDatePerson() {
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ 
          person,
          loading: false,
        });
    });
  }

  render() {
    const { person, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const data = !loading ? <PersonDetailsView person={person} /> : null;
    
    return (
      <div className='person-details card'>
        { data }
        { spinner }
      </div>
    );
  }
}

const PersonDetailsView = ({ person }) => {
  const {id, name, gender, birthYear, eyeColor} = person;
  if (!id) {
    return <span>Select a person from a list</span>
  }
  return (
    <>
      <img className='person-image' 
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt={name} />

        <div className='card-body'>
          <h4>{ name }</h4>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='term'>Gender</span>
              <span>{ gender }</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Birth Year</span>
              <span>{ birthYear }</span>
            </li>
            <li className='list-group-item'>
              <span className='term'>Eye Color</span>
              <span>{ eyeColor }</span>
            </li>
          </ul>
        </div>
    </>
  )
}
