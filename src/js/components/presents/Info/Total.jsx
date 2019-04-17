import React from 'react';
import Bar from './Total/Bar';

const Total = props => (
  <>
    {Object.entries(props.typeRelativeWeights).map(([type, relativeWeight]) => {
      const width = relativeWeight * props.size;
      const percent = relativeWeight * 100;
      const barProps = {
        percent,
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
