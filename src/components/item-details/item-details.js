import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './item-details.css';

export default class itemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: {},
    loading: false,
    image: null,
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
  
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          loading: false,
          image: getImageUrl(item),
        });
    });
  }

  render() {

    const { item, loading, image } = this.state;
    
    const data = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { item });
    });
    
    const spinner = loading ? <Spinner /> : null;
    const body = !loading 
                    ? <ItemDetailsView item={item} image={image} data={data} />
                    : null;
    
    return (
      <div className='person-details card'>
        { body }
        { spinner }
      </div>
    );
  }
}

const ItemDetailsView = ({ item, image, data }) => {

  const { id, name } = item;

  if (!id) {
    return <span>Select a person from a list</span>
  }
  
  return (
    <>
      <img className='person-image'
          src={ image }
          alt={ name } />
        <div className='card-body'>
          <h4>{ name }</h4>
          <ul className='list-group list-group-flush'>
            { data }
          </ul>
        </div>
    </>
  )
}
