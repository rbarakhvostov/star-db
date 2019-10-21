import React from 'react';

import './item-details.css';

const ItemDetails = ({ item, image, data }) => {

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

export default ItemDetails;