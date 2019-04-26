import React, { useState, useEffect, useRef } from 'react';
import { mapValues } from 'lodash';

const focusItemInteractiveName = ItemInteractiveName => {
  const ItemInteractiveNameWithRef = React.forwardRef(ItemInteractiveName);
  return props => {
    const ref = useRef(null);
    const timeout = useRef(null);
    useEffect(() => {
      clearTimeout(timeout.current);
      const isBlured = document.activeElement !== ref.current;
      isBlured && props.focus && (timeout.current = setTimeout(() => {
        props.silentFocus(() => ref.current.focus());
      }, 50));
    });
    return (
      <ItemInteractiveNameWithRef
        {...props}
        ref={ref}
      />
    );
  };
};

const ItemInteractiveName = focusItemInteractiveName((props, ref) => {
  return (
    <input className="item__editor item__child"
      ref={ref}
      value={props.name}
      onChange={e => {
        e.preventDefault();
        const name = e.target.value;
        const index = props.index;
        props.onChangeName({ name, index });
      }}
    />
  );
});

const controlsHoverMap = new Map()
  .set(true, ({ onRemove, index }) => (
    <button
      onClick={e => {
        e.preventDefault();
        onRemove({ index });
      }}
    >
      x
    </button>
  ))
  .set(false, ({ index }) => index)
;

const ItemControls = props => {
  const [ hover, onChangeHover ] = useState(false);
  return (
    <span
      className="item__number item__child"
      onMouseEnter={e => {
        onChangeHover(true);
      }}
      onMouseLeave={e => {
        onChangeHover(false);
      }}
    >
      {controlsHoverMap.get(hover)(props)}
    </span>
  );
};

const ItemChart = props => {
  const barClassName = [
    'item__bar',
    'item__child',
    'figure',
    'figure_throttle',
    `figure_type_${props.type}`,
  ].join(' ');
  const width = `${props.relativeWeight * 220}px`;
  return (
    <div
      className={barClassName}
      style={{
        width,
      }}
    >
    </div>
  );
};

const ItemContainer = props => {
  return (
    <div className="item app__element">
      {props.renderInteractiveName(props)}
      {props.renderControls(props)}
      {props.renderChart(props)}
    </div>
  );
};

const renderMap = {
  renderInteractiveName: ItemInteractiveName,
  renderControls:        ItemControls,
  renderChart:           ItemChart,
};

const Item = props => {
  const renders = mapValues(renderMap, Component => props => (
    <Component {...props} />
  ));
  return (
    <ItemContainer
      {...props}
      {...renders}
    />
  );
};

export default React.memo(Item);
