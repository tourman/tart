import React, { useState } from 'react';

const ItemInteraction = props => {
  const index = props.index;
  if (!props.hover) {
    return index;
  }
  return (
    <button
      onClick={e => {
        e.preventDefault();
        props.onRemove({ index });
      }}
    >
      x
    </button>
  );
};

const ItemContent = props => {
  const barClassName = [
    'item__bar',
    'item__child',
    `figure_type_${props.type}`,
  ].join(' ');
  const width = `${props.relativeWeight * 230}px`;

  return (
    <div className="item app__element">
      <input className="item__editor item__child"
        value={props.name}
        onChange={e => {
          e.preventDefault();
          const name = e.target.value;
          const index = props.index;
          props.onChangeName({ name, index });
        }}
      />
      <span
        className="item__number item__child"
        onMouseEnter={props.onChangeHover.bind(null, true)}
        onMouseLeave={props.onChangeHover.bind(null, false)}
      >
        <ItemInteraction {...props} />
      </span>
      <div 
        className={barClassName}
        style={{
          width,
        }}
      >
      </div>
    </div>
  );
};

const Item = props => {
  const [ hover, onChangeHover ] = useState(false);
  return (
    <ItemContent
      {...props}
      hover={hover}
      onChangeHover={onChangeHover}
    />
  );
};

export default React.memo(Item);
