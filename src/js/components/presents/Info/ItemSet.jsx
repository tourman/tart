import React from 'react';
import Item from './ItemSet/Item';
import { pickBy } from '../../../helpers';

const ItemSet = props => {
  const callbacks = pickBy(props, prop => typeof prop === 'function');
  return (
    <div style={{width: `${props.size}px`}}>
      {props.figures.map((figure, index) => (
        <Item
          key={figure.id}
          index={index}
          {...figure}
          {...callbacks}
        />
      ))}
    </div>
  );
};

export default ItemSet;
