import React from 'react';

let ref;
const mouse = name => e => dispatcher.dispatch({
  name,
  payload: {
    x: e.clientX - ref.getBoundingClientRect().left,
    y: e.clientY - ref.getBoundingClientRect().top,
  },
});

export default props => (
  <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      margin: '20px',
      width: `${props.size}px`,
      height: `${props.size}px`,
      background: '#f0f0f0'
    }}
    ref={el => ref = el}
    onMouseDown={mouse('add')}
    onMouseUp={mouse('updateLast')}
  >
    {props.children}
  </div>
);
