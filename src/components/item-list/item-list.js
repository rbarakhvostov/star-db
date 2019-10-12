import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();
  state = {
    peopleList: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.peopleListLoaded();
  }
  onPeopleListLoaded = (peopleList) => {
    this.setState({
      peopleList,
      loading: false, 
    });
  }
  onError = () => {
    this.setState({
      error: true,
      loading: false,  
    });
  }
  peopleListLoaded = () => {
    this.swapiService
      .getAllPeople()
      .then(this.onPeopleListLoaded)
      .catch(this.onError);
  }
  render() {
    console.log('ITEMLIST')
    const { onItemSelected } = this.props;
    const { peopleList, error, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const data = !(loading || error) 
                  ? <PersonListView
                      peopleList={peopleList}
                      onItemSelected={onItemSelected}/>
                  : null;
    return (
      <>
        { spinner }
        { errorIndicator }
        { data }
      </>
    );
  }
}

const PersonListView = ({ peopleList, onItemSelected }) => {
  console.log('person list view')
  const itemList = peopleList.map((item) => {
    return (
      <li className="list-group-item"
          key={item.id}
          onClick={() => onItemSelected(item)}>
        { item.name }
      </li>
    )
  })
  return (
    <ul className="item-list list-group">
      { itemList }
    </ul>
  )
}