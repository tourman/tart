import React from 'react';

const Bar = props => {
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
    >
    </div>
  );
};

export default Bar;
