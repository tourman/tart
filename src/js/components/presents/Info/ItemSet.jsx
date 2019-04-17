import React from 'react';
import Item from './ItemSet/Item';

const ItemSet = props => (
  <div style={{width: `${props.size}px`}}>
    {props.figures.map((figure, index) => (
      <Item
        key={index}
        index={index}
        {...figure}
      /> 
    ))}
  </div>
);

export default ItemSet;