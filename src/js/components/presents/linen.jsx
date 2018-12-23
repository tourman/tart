import React from 'react';
import Figure from 'presents/linen/figure';
import dispatcher from 'dispatcher';

let ref;
const mouse = name => e => dispatcher.dispatch({
  name,
  payload: {
    x: e.clientX - ref.getBoundingClientRect().left,
    y: e.clientY - ref.getBoundingClientRect().top,
    positive: !(e.ctrlKey || e.shiftKey || e.button === 2),
  },
});

const Linen = props => (
  <div
    className="linen"
    style={{
      width: `${props.size}px`,
      height: `${props.size}px`,
    }}
    ref={el => ref = el}
    onMouseDown={mouse('figure.add')}
    onMouseMove={mouse('figure.last.resize')}
    onMouseUp={mouse('figure.last.update')}
  >
    {props.figures.map((figure, key) => {
      const props = {
        key,
        ...figure,
      };
      return <Figure {...props} />;
    })}
  </div>
);

export default Linen;
