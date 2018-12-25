import React from 'react';
import Total from 'presents/info/total';
import ItemSet from 'presents/info/item-set';

const Info = props => (
  <>
    <Total {...props} />
    <ItemSet {...props} />
  </>
);

export default Info;
