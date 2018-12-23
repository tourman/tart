import React from 'react';

let ref;
const mouse = name => e => dispatcher.dispatch({
  name,
  payload: {
    x: e.clientX - ref.getBoundingClientRect().left,
    y: e.clientY - ref.getBoundingClientRect().top,
    positive: !(e.ctrlKey || e.shiftKey || e.button === 2),
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
    onMouseDown={mouse('circle.add')}
    onMouseMove={mouse('circle.last.resize')}
    onMouseUp={mouse('circle.last.update')}
  >
    {props.children}
  </div>
);
