import React from 'react';
import Linen from '../presents/Linen';
import Info from '../presents/Info';

const Tart = props => {
  return (
    <>
      <Linen {...props} />
      <Info {...props} />
    </>
  );
};

export default Tart;
