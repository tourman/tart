import React from 'react';

const Item = props => {
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
      <span className="item__number item__child">{props.index}</span>
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

export default Item;
