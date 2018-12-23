import React from 'react';
import { mapValues } from 'lodash';

const Figure = props => {
  const numberProps = {};
  const radius = props.size;
  const diameter = 2 * radius;
  numberProps.left = props.x - radius;
  numberProps.top = props.y - radius;
  numberProps.width = diameter;
  numberProps.height = diameter;
  numberProps.lineHeight = diameter;

  const stringProps = mapValues(numberProps, number => `${number}px`);

  const className = [
    'linen__figure',
    `figure_type_${props.type}`,
  ].join(' ');

  const style = {
    ...stringProps,
  };

  return (
    <div
      className={className}
      style={style}
    >
      {props.index}
    </div>
  );
};

export default Figure;
