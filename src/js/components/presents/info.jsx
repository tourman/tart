import React from 'react';

const Info = props => {
  const memo = {
    total: 0,
    types: {},
  };
  const weights = props.figures.reduce((memo, figure) => {
    memo.total += figure.weight;
    memo.types[figure.type] = memo.types[figure.type] || 0;
    memo.types[figure.type] += figure.weight;
    return memo;
  }, memo);
  const elements = Object.entries(weights.types)
    .map(([type, weight]) => {
      const width = (weight / weights.total) * props.size;
      const typeProps = {
       width,
       type,
      };
      return typeProps;
    })
    .map(props => {
      const className = [
        'app__element',
        'info-total-bar',
        `figure_type_${props.type}`,
      ].join(' ');

      return (
        <div
          className={className}
          style={{
            width: `${props.width}px`,
            opacity: 0.5,
          }}
          key={props.type}
        >
        </div>
      );
    })
  ;
  return elements;
};

export default Info;
