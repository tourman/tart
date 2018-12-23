import React from 'react';

const bar = props => (
  <div
    style={{
      float: 'left',
      clear: 'both',
      width: `${props.width}px`,
      height: '30px',
      backgroundColor: props.color,
      opacity: 0.5,
      marginBottom: '10px',
    }}
    key={props.weight}
  >
  </div>
);

export default props => {
  const memo = {
    positive: {
      color: 'green',
      square: 0,
    },
    negative: {
      color: 'red',
      square: 0,
    },
  };
  const circles = props.circles.map(circle => {
    const square = Math.pow(circle.radius, 2);
    circle = {
      weight: circle.weight,
      square,
    };
    return circle;
  });
  const totalSquare = circles.reduce((memo, circle) => memo + circle.square, 0);
  const entities = circles.reduce((memo, circle) => {
    const entity = memo[circle.weight];
    entity.square += circle.square;
    return memo;
  }, memo);
  const elements = Object.entries(entities)
    .map(([weight, entity]) => {
      const width = (entity.square / totalSquare) * props.size;
      const entityProps = {
       color: entity.color,
       width,
       weight,
      };
      return entityProps;
    })
    .map(bar)
  ;
  return elements;
};
