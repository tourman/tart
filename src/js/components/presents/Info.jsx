import React from 'react';
import Total from './Info/Total';
import ItemSet from './Info/ItemSet';
import { throttle } from 'lodash';

const Info = props => (
  <>
    <Total {...props} />
    <ItemSet {...props} />
  </>
);

const throttleInfo = Info => {
  const infoMap = new Map()
    .set(true, throttle(Info, 200))
    .set(false, Info)
    .set(void 0, Info)
  ;
  const ThrottledInfo = props => {
    const Info = infoMap.get(props.openForResizing);
    return (<Info {...props} />);
  };
  return ThrottledInfo;
};

export default throttleInfo(Info);
