import React from 'react';
import Bar from 'presents/info/total/bar';

const Total = props => (
  <>
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
  </>
);

export default Total;
