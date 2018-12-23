import React from 'react';

const bar = props => {
  const className = [
    'app__element',
    'info-total-bar',
    `figure_type_${props.typeName}`,
  ].join(' ');

  return (
    <div
      className={className}
      style={{
        width: `${props.width}px`,
        opacity: 0.5,
      }}
      key={props.typeName}
    >
    </div>
  );
};

const Info = props => {
  const memo = {
    positive: {
      weight: 0,
    },
    negative: {
      weight: 0,
    },
  };
  const totalWeight = props.figures.reduce((memo, figure) => memo + figure.weight, 0);
  const types = props.figures.reduce((memo, figure) => {
    const type = memo[figure.type];
    type.weight += figure.weight;
    return memo;
  }, memo);
  const elements = Object.entries(types)
    .map(([typeName, type]) => {
      const width = (type.weight / totalWeight) * props.size;
      const typeProps = {
       width,
       typeName,
      };
      return typeProps;
    })
    .map(bar)
  ;
  return elements;
};

export default Info;
