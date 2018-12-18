import React from 'react';

export default props => (
  <div style={{
    overflow: 'hidden',
    position: 'relative',
    margin: '20px',
    width: `${props.size}px`,
    height: `${props.size}px`,
    background: '#f0f0f0'
  }}>
    {props.children}
  </div>
);
