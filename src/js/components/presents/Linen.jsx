import React, { useRef, useState, useEffect } from 'react';
import Figure from './Linen/Figure';
import { areTotalWeightsDifferent } from '../../helpers';
import { pickBy, compose } from '../../helpers';

const typeMap = new Map()
  .set(true,  'negative')
  .set(false, 'positive')
;

const handleMouse = (el, action, index) => e => {
  const rect = el.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const typeCondition = e.ctrlKey || e.shiftKey || e.button === 2;
  const type = typeMap.get(typeCondition);
  action({
    x,
    y,
    type,
    index,
  });
};

const hasOnMouse = Component => props => {
  const ref = useRef(null);
  const onMouse = handleMouse.bind(null, ref);
  const children = React.Children.map(props.children, child => React.cloneElement(
    child,
    {
      ...child.props,
      onMouse,
    }
  ));
  return (
    <Component
      {...props}
      children={children}
      onMouse={onMouse}
      ref={ref}
    />
  );
};

const LinenWrapper = React.forwardRef((props, ref) => {
  return (
    <div
      className="linen app__element"
      style={{
        width: props.size,
        height: props.size,
      }}
      ref={ref}
      onMouseDown={e => {
        const current = e.target === ref.current;
        current && handleMouse(ref, props.onFigureAdd)(e);
      }}
      onMouseMove={props.onMouse(props.onFigureLastResize)}
      onMouseUp={props.onMouse(props.onFigureLastUpdate)}
    >
      {props.children}
    </div>
  );
});

const areEqual = (prevProps, props) => {
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
};

const MemoizedLinenWrapper = compose(
  hasOnMouse,
  Component => React.memo(Component, areEqual),
)(LinenWrapper);

const Figures = props => {
  const callbacks = pickBy(props, prop => typeof prop === 'function');
  return props.figures.map(({ id, size, type, x, y }, index) => (
    <Figure
      {...{
        x,
        y,
        size,
        type,
        index,
        ...callbacks,
      }}
      key={id}
    />
  ));
};

const MemoizedFigures = React.memo(Figures, (prevProps, props) => {
  if (prevProps.move !== props.move) {
    return false;
  }
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
    const props = {
      ...this.props,
      ...this.state,
    };
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
