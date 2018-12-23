import React from 'react';

const bar = props => (
  <div
    className="app__element info-total-bar"
    style={{
      width: `${props.width}px`,
      backgroundColor: props.color,
      opacity: 0.5,
    }}
    key={props.weight}
  >
  </div>
);

const Info = props => {
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
  const figures = props.figures.map(figure => {
    const square = Math.pow(figure.radius, 2);
    figure = {
      weight: figure.weight,
      square,
    };
    return figure;
  });
  const totalSquare = figures.reduce((memo, figure) => memo + figure.square, 0);
  const entities = figures.reduce((memo, figure) => {
    const entity = memo[figure.weight];
    entity.square += figure.square;
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

export default Info;