import React from 'react';
import Total from './info/total';
import ItemSet from './info/item-set';

const Info = props => (
  <>
    <Total {...props} />
    <ItemSet {...props} />
  </>
);

export default Info;
