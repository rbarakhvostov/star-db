import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './item-details.css';

export default class itemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: {},
    loading: false,
  }

  componentDidMount() {
    this.upDateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true
      });
      this.upDateItem();
    }
  }

  upDateItem() {
    const { itemId, getData } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          loading: false,
        });
    });
  }

  render() {
    const { item, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const data = !loading ? <ItemDetailsView item={item} /> : null;
    
    return (
      <div className='person-details card'>
        { data }
        { spinner }
      </div>
    );
  }
}

const ItemDetailsView = ({ item }) => {
  const {id, name, gender, birthYear, eyeColor} = item;

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
