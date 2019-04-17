import React from 'react';
import Figure from './Linen/Figure';
import dispatcher from '../../dispatcher';

let ref;
const mouse = name => e => dispatcher.dispatch({
  name,
  payload: {
    x: e.clientX - ref.getBoundingClientRect().left,
    y: e.clientY - ref.getBoundingClientRect().top,
    type: (e.ctrlKey || e.shiftKey || e.button === 2) ? 'negative' : 'positive',
  },
});

const Linen = props => (
  <div
    className="linen app__element"
    style={{
      width: `${props.size}px`,
      height: `${props.size}px`,
    }}
    ref={el => ref = el}
    onMouseDown={mouse('figure.add')}
    onMouseMove={mouse('figure.last.resize')}
    onMouseUp={mouse('figure.last.update')}
  >
    {props.figures.map((figure, index) => (
      <Figure
        {...figure}
        index={index}
        key={index}
      />
    ))}
  </div>
);

export default Linen;
