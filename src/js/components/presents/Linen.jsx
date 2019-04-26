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

const LinenWrapper = props => {
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

const MemoizedLinenWrapper = React.memo(LinenWrapper, (prevProps, props) => {
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
  return props.figures.map(({ id, size, type, x, y }, index) => (
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

const MemoizedFigures = React.memo(Figures, (prevProps, props) => {
  if (prevProps.figures.length !== props.figures.length) {
    return false;
  }
  if (props.weightChanging) {
    return false;
  }
  const differentWeights = areTotalWeightsDifferent(prevProps, props);
  if (differentWeights) {
    return false;
  }
  return true;
});

class FiguresContainer extends React.Component {
  render() {
    const props = this.state || this.props;
    return (
      <MemoizedFigures
        {...props}
      />
    );
  }
};

const Linen = props => {
  const figuresRef = useRef(null);
  useEffect(() => {
    figuresRef.current.setState(props);
  });
  return (
    <MemoizedLinenWrapper {...props}>
      <FiguresContainer
        {...props}
        ref={figuresRef}
      />
    </MemoizedLinenWrapper>
  );
};

export default React.memo(Linen);
