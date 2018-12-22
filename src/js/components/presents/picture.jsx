import React from 'react';
import { mapValues } from 'lodash';

export default props => (
  props.circles.map((circle, index) => {
    const numberProps = {};
    numberProps.left = circle.x - circle.radius;
    numberProps.top = circle.y - circle.radius;
    numberProps.width = 2 * circle.radius;
    numberProps.height = 2 * circle.radius;
    numberProps.borderRadius = props.size;

    const stringProps = mapValues(numberProps, number => `${number}px`);

    const style = {
      backgroundColor: circle.color,
      opacity: 0.5,
      position: 'absolute',
      ...stringProps,
    };

    return (
      <div
        style={style}
        key={index}
      >
      </div>
    );
  })
);
