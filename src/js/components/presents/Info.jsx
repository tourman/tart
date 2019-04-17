import React from 'react';
import Total from './Info/Total';
import ItemSet from './Info/ItemSet';

const Info = props => (
  <>
    <Total {...props} />
    <ItemSet {...props} />
  </>
);

export default Info;
