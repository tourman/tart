import React, { useRef } from 'react';
import Figure from './Linen/Figure';
import dispatcher from '../../dispatcher';

const typeMap = new Map()
  .set(true,  'negative')
  .set(false, 'positive')
;

const handleMouse = (el, name) => e => {
  const rect = el.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const typeCondition = e.ctrlKey || e.shiftKey || e.button === 2;
  const type = typeMap.get(typeCondition);
  dispatcher.dispatch({
    name,
    payload: {
      x,
      y,
      type,
    },
  });
};

const Linen = props => {
  const el = useRef(null);
  const mouse = handleMouse.bind(null, el);

  return (
    <div
      className="linen app__element"
      style={{
        width: props.size,
        height: props.size,
      }}
      ref={el}
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
};

export default Linen;
