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
    .set(false, Info)
    .set(void 0, Info)
  ;
  const ThrottledInfo = props => {
    infoMap.get(true) || infoMap.set(true, throttle(Info, props.throttleDelay));
    const ThrottledInfo = infoMap.get(props.openForResizing);
    return (<ThrottledInfo {...props} />);
  };
  return ThrottledInfo;
};

export default throttleInfo(Info);
