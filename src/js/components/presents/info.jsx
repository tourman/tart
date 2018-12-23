import React from 'react';
import Bar from 'presents/info/bar';

const Info = props => (
  <div>
    {Object.entries(props.typeRelativeWeights).map(([type, relativeWeight]) => {
      const width = relativeWeight * props.size;
      const barProps = {
        width,
        type,
      };
      return <Bar
        {...barProps}
        key={type}
      />;
    })}
  </div>
);

export default Info;
