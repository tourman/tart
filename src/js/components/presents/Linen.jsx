import React, { useRef, useState, useEffect } from 'react';
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

const LinenContainer = props => {
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
      {props.children}
    </div>
  );
};

const MemoizedLinenContainer = React.memo(LinenContainer, (prevProps, props) => {
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

const Figures = props => {
  const [ figures, setFigures ] = useState(props.figures);
  useEffect(() => {
    props.onChangeFigures(setFigures);
  });
  return figures.map(({ id, size, type, x, y }, index) => (
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
  ));
};

const areEqualFigures = (prevProps, props) => {
  if (prevProps.figures.length !== props.figures.length) {
    return false;
  }
  if (props.openForResizing) {
    return false;
  }
  const differentWeights = areTotalWeightsDifferent(prevProps, props);
  if (differentWeights) {
    return false;
  }
  return true;
};

const Linen = props => {
  const figuresRef = useRef({
    setFigures: () => {},
    areEqualFigures: () => false,
  });
  useEffect(() => {
    const equalFigures = figuresRef.current.areEqualFigures(props);
    equalFigures || figuresRef.current.setFigures(props.figures);
    figuresRef.current.areEqualFigures = areEqualFigures.bind(null, props);
  });
  const onChangeFigures = setFigures => figuresRef.current.setFigures = setFigures;
  return (
    <MemoizedLinenContainer {...props}>
      <Figures
        {...props}
        onChangeFigures={onChangeFigures}
      />
    </MemoizedLinenContainer>
  );
};

export default React.memo(Linen);
