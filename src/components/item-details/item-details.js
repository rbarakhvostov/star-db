import React from 'react';

import './item-details.css';

const ItemDetails = (props) => {
  const { item, image, children:records } = props;
  const { name } = item;

  if (!name) {
    return <span>Select a person from a list</span>
  }

  const data = React.Children.map(records, (child) => {
    return React.cloneElement(child, { item });
  });

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