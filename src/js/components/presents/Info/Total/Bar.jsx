import React from 'react';

const Bar = props => {
  const className = [
    'app__element',
    'info-total-bar',
    'figure',
    `figure_type_${props.type}`,
  ].join(' ');

  const percent = props.percent.toFixed(1);

  return (
    <div
      className={className}
      style={{
        width: `${props.width}px`,
      }}
    >
      <span
        className="info-total-bar__label"
      >
        {percent}%
      </span>
    </div>
  );
};

export default Bar;
