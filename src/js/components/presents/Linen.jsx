import React, { useRef } from 'react';
import Figure from './Linen/Figure';
import { areTotalWeightsDifferent } from '../../helpers';

const typeMap = new Map()
  .set(true,  'negative')
  .set(false, 'positive')
;

const handleMouse = (el, action) => e => {
  const rect = el.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const typeCondition = e.ctrlKey || e.shiftKey || e.button === 2;
  const type = typeMap.get(typeCondition);
  action({
    x,
    y,
    type,
  });
};

const Linen = props => {
  const el = useRef(null);
  const onMouse = handleMouse.bind(null, el);
  return (
    <div
      className="linen app__element"
      style={{
        width: props.size,
        height: props.size,
      }}
      ref={el}
      onMouseDown={onMouse(props.onFigureAdd)}
      onMouseMove={onMouse(props.onFigureLastResize)}
      onMouseUp={onMouse(props.onFigureLastUpdate)}
    >
      {props.figures.map(({ id, size, type, x, y }, index) => (
        <Figure
          {...{
            x,
            y,
            size,
            type,
            index,
          }}
          key={id}
        />
      ))}
    </div>
  );
};

export default React.memo(Linen, (prevProps, props) => {
  if (prevProps === props) {
    return true;
  }
  if (prevProps.figures.length !== props.figures.length) {
    return false;
  }
  const differentWeights = areTotalWeightsDifferent(prevProps, props);
  if (differentWeights) {
    return false;
  }
  const propsToCompare = [
    'size',
    'onFigureAdd',
    'onFigureLastResize',
    'onFigureLastUpdate',
  ];
  for (const prop of propsToCompare) {
    if (prevProps[prop] !== props[prop]) {
      return false;
    }
  }
  return true;
});
