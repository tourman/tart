import React from 'react';
import { mapValues } from 'lodash';

const Figure = props => {
  const numberProps = {};
  numberProps.left = props.x - props.radius;
  numberProps.top = props.y - props.radius;
  numberProps.width = 2 * props.radius;
  numberProps.height = 2 * props.radius;

  const stringProps = mapValues(numberProps, number => `${number}px`);

  const className = [
    'linen__figure',
    `figure_weight_${props.weight}`,
  ].join(' ');

  const style = {
    opacity: 0.5,
    ...stringProps,
  };

  return (
    <div
      className={className}
      style={style}
    >
    </div>
  );
};

export default Figure;
