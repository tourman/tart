import React from 'react';

export default props => (
  props.circles.map((circle, index) => (
    <div
      style={{
        background: 'red',
        opacity: 0.5,
        borderRadius: `${props.size}px`,
        position: 'absolute',
        left: `${circle.x}px`,
        top: `${circle.y}px`,
        width: `${circle.size}px`,
        height: `${circle.size}px`,
      }}
      key={index}
    ></div>
  ))
);
