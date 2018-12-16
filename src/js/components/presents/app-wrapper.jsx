import React from 'react';

const size = 500;

export default props => (
  <div style={{
    margin: '20px',
    width: `${size}px`,
    height: `${size}px`,
    background: '#f0f0f0'
  }}>
    {props.children}
  </div>
);
