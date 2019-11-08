import React from 'react';

import './item-details.css';

const ItemDetails = (props) => {
  const { item, image, children:records } = props;
  const { name } = item;
 
  if (!name) {
    return (
      <div className='item-details card'>
        <p className='prompt'>Select an item from the list</p>
      </div>
    );
  }

  const data = React.Children.map(records, (child) => {
    return React.cloneElement(child, { item });
  });

  return (
    <div className='item-details card'>
      <img className='item-image'
          src={ image }
          alt={ name } />
      <div className='card-body'>
        <h4>{ name }</h4>
        <ul className='list-group list-group-flush'>
          { data }
        </ul>
      </div>
    </div>
  );
}

export default ItemDetails;
