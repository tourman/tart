import React from 'react';

const Figure = props => {
  const style = {};
  const radius = props.size;
  const diameter = 2 * radius;
  style.left = props.x - radius;
  style.top = props.y - radius;
  style.width = diameter;
  style.height = diameter;
  style.lineHeight = diameter;

  const className = [
    'linen__figure',
    'figure',
    `figure_type_${props.type}`,
  ].join(' ');

  const draggable = !props.weightChanging;
  let handlers = {};
  if (draggable) {
    handlers = {
      onDragStart: props.onMouse(props.onFigureMoveStart, props.index),
      onDragEnd: props.onMouse(props.onFigureMoveEnd, props.index),
    };
  }

  return (
    <div
      className={className}
      style={style}
      draggable={draggable}
      {...handlers}
    >
      {props.index}
    </div>
  );
};

export default React.memo(Figure);
