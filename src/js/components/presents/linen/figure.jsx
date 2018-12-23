import React from 'react';
import { mapValues } from 'lodash';

const Figure = props => {
  const numberProps = {};
  const radius = Math.sqrt(props.weight);
  numberProps.left = props.x - radius;
  numberProps.top = props.y - radius;
  numberProps.width = 2 * radius;
  numberProps.height = 2 * radius;

  const stringProps = mapValues(numberProps, number => `${number}px`);

  const className = [
    'linen__figure',
    `figure_type_${props.type}`,
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
